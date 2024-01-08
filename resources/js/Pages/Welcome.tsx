import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center text-white h-24 w-full">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 120 20"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_1317_33286)">
                                <path
                                    d="M6.795 0C3.045 0 0 3.21202 0 7.16772V20H2.265C2.265 17.9747 3.48 16.1709 5.295 15.4905C5.52 15.4114 5.955 15.3323 6.42 15.2532C8.745 14.8576 13.59 14.019 13.59 7.16772C13.59 3.21202 10.545 0 6.795 0ZM6.045 12.8956C5.445 13.0063 4.935 13.0854 4.515 13.2437C3.66 13.5601 2.895 14.0506 2.25 14.6519V7.16772C2.25 4.54114 4.275 2.38924 6.78 2.38924C9.27 2.38924 11.31 4.52532 11.31 7.16772C11.325 11.9778 8.4 12.4842 6.045 12.8956ZM76.98 17.6108V20C73.23 20 70.185 16.788 70.185 12.8323V0H72.45V12.8323C72.45 15.4747 74.49 17.6108 76.98 17.6108ZM86.325 17.6108V20C82.575 20 79.53 16.788 79.53 12.8323V0H81.795V12.8323C81.795 15.4747 83.82 17.6108 86.325 17.6108ZM116.955 9.85759C118.785 11.1392 120 13.3386 120 15.8228V20H117.735V15.8228C117.735 13.1962 115.71 11.0443 113.205 11.0443C110.715 11.0443 108.675 13.1804 108.675 15.8228V20H106.41V15.8228C106.41 13.3386 107.625 11.1392 109.455 9.85759C107.625 8.57595 106.41 6.37658 106.41 3.89241V0H108.675V3.87658C108.675 6.50316 110.7 8.65506 113.205 8.65506C115.695 8.65506 117.735 6.51899 117.735 3.87658V0H120V3.87658C120 6.37658 118.785 8.56013 116.955 9.85759ZM59.43 0C55.68 0 52.635 3.21202 52.635 7.16772V20H54.9C54.9 17.3734 56.925 15.2215 59.43 15.2215C61.92 15.2215 63.96 17.3576 63.96 20H66.225V7.16772C66.225 3.21202 63.18 0 59.43 0ZM63.96 14.6677C62.76 13.5285 61.17 12.8323 59.43 12.8323C57.69 12.8323 56.1 13.5285 54.9 14.6677V7.16772C54.9 4.54114 56.925 2.38924 59.43 2.38924C61.92 2.38924 63.96 4.52532 63.96 7.16772V14.6677ZM95.655 0C91.905 0 88.86 3.21202 88.86 7.16772V20H91.125C91.125 17.3734 93.15 15.2215 95.655 15.2215C98.145 15.2215 100.185 17.3576 100.185 20H102.45V7.16772C102.45 3.21202 99.405 0 95.655 0ZM100.185 14.6677C98.985 13.5285 97.395 12.8323 95.655 12.8323C93.915 12.8323 92.325 13.5285 91.125 14.6677V7.16772C91.125 4.54114 93.15 2.38924 95.655 2.38924C98.145 2.38924 100.185 4.52532 100.185 7.16772V14.6677ZM24.345 0C20.595 0 17.55 3.21202 17.55 7.16772V20H19.815C19.815 17.3734 21.84 15.2215 24.345 15.2215C26.835 15.2215 28.875 17.3576 28.875 20H31.14V7.16772C31.125 3.21202 28.08 0 24.345 0ZM28.875 14.6677C27.675 13.5285 26.085 12.8323 24.345 12.8323C22.605 12.8323 21.015 13.5285 19.815 14.6677V7.16772C19.815 4.54114 21.84 2.38924 24.345 2.38924C26.835 2.38924 28.875 4.52532 28.875 7.16772V14.6677ZM48.675 7.16772C48.675 3.21202 45.63 0 41.88 0C38.13 0 35.085 3.21202 35.085 7.16772V20H37.35C37.35 17.3734 39.375 15.2215 41.88 15.2215C44.37 15.2215 46.41 17.3576 46.41 20H48.675C48.675 17.4051 47.37 15.1266 45.405 13.8766C47.16 12.8006 48.675 10.8703 48.675 7.16772ZM41.055 12.8797C39.795 13.1329 38.76 13.4019 37.35 14.6519V7.16772C37.35 4.54114 39.375 2.38924 41.88 2.38924C44.37 2.38924 46.41 4.52532 46.41 7.16772C46.41 11.4557 43.995 12.3101 41.055 12.8797Z"
                                    fill="currentColor"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_1317_33286">
                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="currentColor"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div className="flex justify-center w-full">
                        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                            Device management (technical test)
                        </h2>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
