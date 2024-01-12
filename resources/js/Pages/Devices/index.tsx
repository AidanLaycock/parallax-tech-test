import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { FormEventHandler, useRef, useState } from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";

type Device = {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    device_type: string;
    manufacturer: string;
    model: string;
    install_date: Date;
    note: string;
    eui: string;
    serial_number: string;
    created_at: Date;
    updated_at: Date;
    import_id: number;
};

type Import = {
    id: number;
    filename: string;
    started_at: Date;
    completed_at: Date;
};

interface DevicesPageProps extends PageProps {
    devices: Device[];
    imports: Import[];
}

export default function Devices({ auth, devices, imports }: DevicesPageProps) {
    const [deviceTableData, setDeviceTableData] = useState(() => [...devices]);
    const [importsTableData, setImportsTableData] = useState(() => [
        ...imports,
    ]);

    const [showImportDevicesModal, setImportDevicesModal] = useState(false);
    const [showManageImportsModal, setManageImportsModal] = useState(false);
    const fileInput = useRef<HTMLInputElement>();

    const formData: { file: File | null } = {
        file: null,
    };

    const { setData, post, processing, reset, errors } = useForm(formData);

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

    const deviceTableColumnHelper = createColumnHelper<Device>();

    const deviceTableColumns = [
        deviceTableColumnHelper.accessor("id", {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        deviceTableColumnHelper.accessor((row) => row.name, {
            id: "name",
            cell: (info) => info.getValue(),
            header: () => <span>Name</span>,
            footer: (info) => info.column.id,
        }),
    ];

    const devicesTable = useReactTable({
        data: deviceTableData,
        columns: deviceTableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const importsTableColumnHelper = createColumnHelper<Import>();

    const importsTableColumns = [
        importsTableColumnHelper.accessor("id", {
            cell: (info) => info.getValue(),
        }),
        importsTableColumnHelper.accessor("filename", {
            cell: (info) => info.getValue(),
            header: () => <span>File Name</span>,
        }),
        importsTableColumnHelper.accessor("id", {
            cell: (info) => (
                <span>
                    <Link
                        onClick={() => setManageImportsModal(false)}
                        href={route("import.destroy", {
                            id: info.row.original.id,
                        })}
                        method="delete"
                    >
                        Delete
                    </Link>
                </span>
            ),
            header: () => <span>Delete</span>,
        }),
    ];

    const importsTable = useReactTable({
        data: importsTableData,
        columns: importsTableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

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
                                        className="ml-3"
                                        onClick={() =>
                                            setManageImportsModal(true)
                                        }
                                    >
                                        Manage Imports
                                    </SecondaryButton>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3 p-6">
                            {deviceTableData && deviceTableData.length > 0 ? (
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light dark:text-white">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    {devicesTable
                                                        .getHeaderGroups()
                                                        .map((headerGroup) => (
                                                            <tr
                                                                key={
                                                                    headerGroup.id
                                                                }
                                                            >
                                                                {headerGroup.headers.map(
                                                                    (
                                                                        header
                                                                    ) => (
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-4"
                                                                            key={
                                                                                header.id
                                                                            }
                                                                        >
                                                                            {header.isPlaceholder
                                                                                ? null
                                                                                : flexRender(
                                                                                      header
                                                                                          .column
                                                                                          .columnDef
                                                                                          .header,
                                                                                      header.getContext()
                                                                                  )}
                                                                        </th>
                                                                    )
                                                                )}
                                                            </tr>
                                                        ))}
                                                </thead>
                                                <tbody>
                                                    {devicesTable
                                                        .getRowModel()
                                                        .rows.map((row) => (
                                                            <tr
                                                                key={row.id}
                                                                className="border-b dark:border-neutral-500"
                                                            >
                                                                {row
                                                                    .getVisibleCells()
                                                                    .map(
                                                                        (
                                                                            cell
                                                                        ) => (
                                                                            <td
                                                                                className="whitespace-nowrap px-6 py-4"
                                                                                key={
                                                                                    cell.id
                                                                                }
                                                                            >
                                                                                {flexRender(
                                                                                    cell
                                                                                        .column
                                                                                        .columnDef
                                                                                        .cell,
                                                                                    cell.getContext()
                                                                                )}
                                                                            </td>
                                                                        )
                                                                    )}
                                                            </tr>
                                                        ))}
                                                </tbody>
                                                <tfoot>
                                                    {devicesTable
                                                        .getFooterGroups()
                                                        .map((footerGroup) => (
                                                            <tr
                                                                key={
                                                                    footerGroup.id
                                                                }
                                                            >
                                                                {footerGroup.headers.map(
                                                                    (
                                                                        header
                                                                    ) => (
                                                                        <th
                                                                            key={
                                                                                header.id
                                                                            }
                                                                        >
                                                                            {header.isPlaceholder
                                                                                ? null
                                                                                : flexRender(
                                                                                      header
                                                                                          .column
                                                                                          .columnDef
                                                                                          .footer,
                                                                                      header.getContext()
                                                                                  )}
                                                                        </th>
                                                                    )
                                                                )}
                                                            </tr>
                                                        ))}
                                                </tfoot>
                                            </table>

                                            <div className="h-2" />
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="border rounded p-1 dark:text-white"
                                                    onClick={() =>
                                                        devicesTable.setPageIndex(
                                                            0
                                                        )
                                                    }
                                                    disabled={
                                                        !devicesTable.getCanPreviousPage()
                                                    }
                                                >
                                                    {"<<"}
                                                </button>
                                                <button
                                                    className="border rounded p-1 dark:text-white"
                                                    onClick={() =>
                                                        devicesTable.previousPage()
                                                    }
                                                    disabled={
                                                        !devicesTable.getCanPreviousPage()
                                                    }
                                                >
                                                    {"<"}
                                                </button>
                                                <button
                                                    className="border rounded p-1 dark:text-white"
                                                    onClick={() =>
                                                        devicesTable.nextPage()
                                                    }
                                                    disabled={
                                                        !devicesTable.getCanNextPage()
                                                    }
                                                >
                                                    {">"}
                                                </button>
                                                <button
                                                    className="border rounded p-1 dark:text-white"
                                                    onClick={() =>
                                                        devicesTable.setPageIndex(
                                                            devicesTable.getPageCount() -
                                                                1
                                                        )
                                                    }
                                                    disabled={
                                                        !devicesTable.getCanNextPage()
                                                    }
                                                >
                                                    {">>"}
                                                </button>
                                                <span className="flex items-center gap-1 dark:text-white">
                                                    <div>Page</div>
                                                    <strong>
                                                        {devicesTable.getState()
                                                            .pagination
                                                            .pageIndex + 1}{" "}
                                                        of{" "}
                                                        {devicesTable.getPageCount()}
                                                    </strong>
                                                </span>
                                                <span className="flex items-center gap-1 dark:text-white">
                                                    | Go to page:
                                                    <input
                                                        type="number"
                                                        defaultValue={
                                                            devicesTable.getState()
                                                                .pagination
                                                                .pageIndex + 1
                                                        }
                                                        onChange={(e) => {
                                                            const page = e
                                                                .target.value
                                                                ? Number(
                                                                      e.target
                                                                          .value
                                                                  ) - 1
                                                                : 0;
                                                            devicesTable.setPageIndex(
                                                                page
                                                            );
                                                        }}
                                                        className="border p-1 rounded w-16 text-black"
                                                    />
                                                </span>
                                                <select
                                                    value={
                                                        devicesTable.getState()
                                                            .pagination.pageSize
                                                    }
                                                    onChange={(e) => {
                                                        devicesTable.setPageSize(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        );
                                                    }}
                                                >
                                                    {[10, 20, 30, 40, 50].map(
                                                        (pageSize) => (
                                                            <option
                                                                key={pageSize}
                                                                value={pageSize}
                                                            >
                                                                Show {pageSize}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                            onChange={(e) =>
                                setData("file", e.target.files?.[0] || null)
                            }
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

                        <SecondaryButton
                            onClick={() => setImportDevicesModal(false)}
                            className="ms-3"
                            disabled={processing}
                        >
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>

            <Modal
                show={showManageImportsModal}
                onClose={() => setManageImportsModal(false)}
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Manage previous device imports.
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        To remove a previously imported data set, please click
                        remove next to the data set.
                    </p>

                    <div className="mt-6">
                        {importsTableData && importsTableData.length > 0 ? (
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light dark:text-white">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                {importsTable
                                                    .getHeaderGroups()
                                                    .map((headerGroup) => (
                                                        <tr
                                                            key={headerGroup.id}
                                                        >
                                                            {headerGroup.headers.map(
                                                                (header) => (
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-4"
                                                                        key={
                                                                            header.id
                                                                        }
                                                                    >
                                                                        {header.isPlaceholder
                                                                            ? null
                                                                            : flexRender(
                                                                                  header
                                                                                      .column
                                                                                      .columnDef
                                                                                      .header,
                                                                                  header.getContext()
                                                                              )}
                                                                    </th>
                                                                )
                                                            )}
                                                        </tr>
                                                    ))}
                                            </thead>
                                            <tbody>
                                                {importsTable
                                                    .getRowModel()
                                                    .rows.map((row) => (
                                                        <tr
                                                            key={row.id}
                                                            className="border-b dark:border-neutral-500"
                                                        >
                                                            {row
                                                                .getVisibleCells()
                                                                .map((cell) => (
                                                                    <td
                                                                        className="whitespace-nowrap px-6 py-4"
                                                                        key={
                                                                            cell.id
                                                                        }
                                                                    >
                                                                        {flexRender(
                                                                            cell
                                                                                .column
                                                                                .columnDef
                                                                                .cell,
                                                                            cell.getContext()
                                                                        )}
                                                                    </td>
                                                                ))}
                                                        </tr>
                                                    ))}
                                            </tbody>
                                            <tfoot>
                                                {importsTable
                                                    .getFooterGroups()
                                                    .map((footerGroup) => (
                                                        <tr
                                                            key={footerGroup.id}
                                                        >
                                                            {footerGroup.headers.map(
                                                                (header) => (
                                                                    <th
                                                                        key={
                                                                            header.id
                                                                        }
                                                                    >
                                                                        {header.isPlaceholder
                                                                            ? null
                                                                            : flexRender(
                                                                                  header
                                                                                      .column
                                                                                      .columnDef
                                                                                      .footer,
                                                                                  header.getContext()
                                                                              )}
                                                                    </th>
                                                                )
                                                            )}
                                                        </tr>
                                                    ))}
                                            </tfoot>
                                        </table>

                                        <div className="h-2" />
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="border rounded p-1 dark:text-white"
                                                onClick={() =>
                                                    importsTable.setPageIndex(0)
                                                }
                                                disabled={
                                                    !importsTable.getCanPreviousPage()
                                                }
                                            >
                                                {"<<"}
                                            </button>
                                            <button
                                                className="border rounded p-1 dark:text-white"
                                                onClick={() =>
                                                    importsTable.previousPage()
                                                }
                                                disabled={
                                                    !importsTable.getCanPreviousPage()
                                                }
                                            >
                                                {"<"}
                                            </button>
                                            <button
                                                className="border rounded p-1 dark:text-white"
                                                onClick={() =>
                                                    importsTable.nextPage()
                                                }
                                                disabled={
                                                    !importsTable.getCanNextPage()
                                                }
                                            >
                                                {">"}
                                            </button>
                                            <button
                                                className="border rounded p-1 dark:text-white"
                                                onClick={() =>
                                                    importsTable.setPageIndex(
                                                        importsTable.getPageCount() -
                                                            1
                                                    )
                                                }
                                                disabled={
                                                    !importsTable.getCanNextPage()
                                                }
                                            >
                                                {">>"}
                                            </button>
                                            <span className="flex items-center gap-1 dark:text-white">
                                                <div>Page</div>
                                                <strong>
                                                    {importsTable.getState()
                                                        .pagination.pageIndex +
                                                        1}{" "}
                                                    of{" "}
                                                    {importsTable.getPageCount()}
                                                </strong>
                                            </span>
                                            <span className="flex items-center gap-1 dark:text-white">
                                                | Go to page:
                                                <input
                                                    type="number"
                                                    defaultValue={
                                                        importsTable.getState()
                                                            .pagination
                                                            .pageIndex + 1
                                                    }
                                                    onChange={(e) => {
                                                        const page = e.target
                                                            .value
                                                            ? Number(
                                                                  e.target.value
                                                              ) - 1
                                                            : 0;
                                                        importsTable.setPageIndex(
                                                            page
                                                        );
                                                    }}
                                                    className="border p-1 rounded w-16 text-black"
                                                />
                                            </span>
                                            <select
                                                value={
                                                    importsTable.getState()
                                                        .pagination.pageSize
                                                }
                                                onChange={(e) => {
                                                    importsTable.setPageSize(
                                                        Number(e.target.value)
                                                    );
                                                }}
                                            >
                                                {[10, 20, 30, 40, 50].map(
                                                    (pageSize) => (
                                                        <option
                                                            key={pageSize}
                                                            value={pageSize}
                                                        >
                                                            Show {pageSize}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-900 dark:text-gray-100">
                                You don't have any devices. <br />
                                Please upload a CSV or use our API to create
                                some new ones.
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton
                            onClick={() => setManageImportsModal(false)}
                            disabled={processing}
                        >
                            Submit
                        </PrimaryButton>

                        <SecondaryButton
                            onClick={() => setManageImportsModal(false)}
                            className="ms-3"
                            disabled={processing}
                        >
                            Close
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
