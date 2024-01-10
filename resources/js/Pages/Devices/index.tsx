import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { FormEventHandler, useRef, useState } from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Devices({ auth, devices }: PageProps) {
    const [showImportDevicesModal, setImportDevicesModal] = useState(false);
    const [showManageImportsModal, setManageImportsModal] = useState(false);
    const fileInput = useRef<HTMLInputElement>();

    const { data, setData, post, processing, reset, errors } = useForm({
        file: null,
    });

    const importDevices: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("import.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setImportDevicesModal(false);
            },
            onError: () => fileInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Device Management
                </h2>
            }
        >
            <Head title="Devices" />

            <div className="pt-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                Devices
                            </div>
                            <div className="p-6">
                                <PrimaryButton
                                    onClick={() => setImportDevicesModal(true)}
                                >
                                    Upload new Devices
                                </PrimaryButton>{" "}
                                {devices && devices.length > 0 ? (
                                    <SecondaryButton
                                        onClick={() =>
                                            setManageImportsModal(true)
                                        }
                                    >
                                        Manage Devices
                                    </SecondaryButton>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3 p-6">
                            {devices && devices.length > 0 ? (
                                devices.map((device: any) => (
                                    <div>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {JSON.stringify(device)}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-900 dark:text-gray-100">
                                    You don't have any devices. <br />
                                    Please upload a CSV or use our API to create
                                    some new ones.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showImportDevicesModal}
                onClose={() => setImportDevicesModal(false)}
            >
                <form onSubmit={importDevices} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Upload new devices
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        To upload new devices, please select a .csv file from
                        your computer below. And then press submit.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="file"
                            value="file upload for adding new Devices. Requires a CSV file format only."
                            className="sr-only"
                        />

                        <TextInput
                            id="file"
                            type="file"
                            name="file"
                            ref={fileInput}
                            onChange={(e) => setData("file", e.target.files[0])}
                            className="mt-1 block w-3/4"
                            isFocused
                        />

                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton
                            onClick={() => setImportDevicesModal(false)}
                            disabled={processing}
                        >
                            Submit
                        </PrimaryButton>

                        <SecondaryButton className="ms-3" disabled={processing}>
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>

            <Modal
                show={showManageImportsModal}
                onClose={() => setManageImportsModal(false)}
            >
                <form onSubmit={importDevices} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Manage previous device imports.
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        To remove a previously imported data set, please click
                        remove next to the data set.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="file"
                            value="file upload for adding new Devices. Requires a CSV file format only."
                            className="sr-only"
                        />

                        <TextInput
                            id="file"
                            type="file"
                            name="file"
                            ref={fileInput}
                            onChange={(e) => setData("file", e.target.files[0])}
                            className="mt-1 block w-3/4"
                            isFocused
                        />

                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton
                            onClick={() => setImportDevicesModal(false)}
                            disabled={processing}
                        >
                            Submit
                        </PrimaryButton>

                        <SecondaryButton className="ms-3" disabled={processing}>
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
