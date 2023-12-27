import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler, useRef, useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Dashboard({ auth }: PageProps) {
    const [generateNewAPIKey, setGenerateNewAPIKey] = useState(false);
    const tokenInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        token_name: '',
    });

    const generateToken: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('api-token.generate', {
            token_name: data.token_name
        } ), {
            preserveScroll: true,
            onSuccess: () => {
                reset(); setGenerateNewAPIKey(false);
            },
            onError: () => tokenInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="pt-12 pb-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">API Tokens</div>
                        <div className="flex flex-col space-y-3 p-6">
                        {auth.user.tokens && auth.user.tokens.length > 0 ? auth.user.tokens.map(token => {
                            return (
                                <div>
                                    <p className="text-gray-900 dark:text-gray-100">{token.name}</p>
                                </div>
                            )
                        }) : (<p className="text-gray-900 dark:text-gray-100">You don't have any tokens.</p>)}
                        </div>
                        
                        <div className="p-6"><PrimaryButton onClick={() =>setGenerateNewAPIKey(true)}>Generate new API Key</PrimaryButton>                        </div>
                    </div>
                </div>
            </div>


<Modal show={generateNewAPIKey} onClose={() => setGenerateNewAPIKey(false)}>
    <form onSubmit={generateToken} className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Generate a new API Key
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            To generate a new API key, add a new Key name below and then press create.
            <br/>
            Please note, that once created you will only be able to see your token once.
        </p>

        <div className="mt-6">
            <InputLabel htmlFor="password" value="Password" className="sr-only" />

            <TextInput
                id="token_name"
                type="text"
                name="token_name"
                ref={tokenInput}
                value={data.token_name}
                onChange={(e) => setData('token_name', e.target.value)}
                className="mt-1 block w-3/4"
                isFocused
                placeholder="Key name"
            />

            <InputError message={errors.token_name} className="mt-2" />
        </div>

        <div className="mt-6 flex justify-end">
            <PrimaryButton onClick={() => setGenerateNewAPIKey(false)} disabled={processing}>Create</PrimaryButton>

            <SecondaryButton className="ms-3" disabled={processing}> 
                Close
            </SecondaryButton>
        </div>
    </form>
</Modal>

        </AuthenticatedLayout>
    );
}
