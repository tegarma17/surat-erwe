import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    {
        title: 'User',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    // Add other fields as needed
}
interface PageProps {
    flash: {
        message?: string;
    };
    user: User[];
}

export default function UserIndex() {
    const { user, flash } = usePage().props as unknown as PageProps;
    const [show, setShow] = useState(!!flash.message);
    const [fadeOut, setFadeOut] = useState(false);

    const roleLabels: Record<number, string> = {
        1: 'Admin',
        2: 'Media',
        3: 'Warga',
        // Tambahkan sesuai kebutuhan
    };
    useEffect(() => {
        if (flash.message) {
            setShow(true);
            const timer = setTimeout(() => {
                setFadeOut(true);
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.message]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data User Account" />

            {show && (
                <div className={`m-4 transition-opacity duration-700 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                    <Alert>
                        <CheckCircle2Icon />
                        <AlertTitle>Berhasil !!</AlertTitle>
                        <AlertDescription>{flash.message}.</AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Data User Account</h2>
                    <input type="text" placeholder="Search..." className="rounded-md border px-3 py-2 text-sm text-black" />
                </div>

                {user.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Email</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((user, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{roleLabels[user.role_id]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Showing {user.length} entries</span>
                    <div className="space-x-2">
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Previous</button>
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Next</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
