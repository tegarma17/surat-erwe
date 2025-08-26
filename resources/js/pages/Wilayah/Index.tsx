import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { DialogWilayah } from '@/components/dialog-wilayah';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    {
        title: 'Wilayah',
        href: '#',
    },
];

interface Kelurahan {
    id: number;
    nama: string;
    // Add other fields as needed
}
interface PageProps {
    flash: {
        message?: string;
    };
    kelurahan: Kelurahan[];
}

export default function WilayahIndex() {
    const { kelurahan, flash } = usePage().props as unknown as PageProps;
    const [show, setShow] = useState(!!flash.message);

    const { delete: destroy } = useForm();

    const handleHapus = (id: number) => {
        destroy(route('wilayah.delete_kelurahan', { id }));
    };
    useEffect(() => {
        if (flash.message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [flash.message]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Wilayah" />
            <div className="mx-5 my-3 grid grid-cols-2 gap-2 lg:flex lg:flex-row">
                <DialogWilayah nameButton="Tambah Dusun" />
            </div>

            {show && (
                <div className="m-4 transition-opacity duration-700 ease-in-out">
                    <Alert>
                        <CheckCircle2Icon />
                        <AlertTitle>Berhasil !!</AlertTitle>
                        <AlertDescription>{flash.message}.</AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Data Wilayah</h2>
                    <input type="text" placeholder="Search..." className="rounded-md border px-3 py-2 text-sm text-black" />
                </div>

                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Nama Dusun</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kelurahan.length > 0 ? (
                            kelurahan.map((kelurahan, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">{kelurahan.nama}</td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Link href={route('wilayah.data_rw', kelurahan.id)}>
                                            <Button variant="default">Lihat RW</Button>
                                        </Link>
                                        <ConfirmDeleteDialog nameButton="Hapus Dusun" onConfirm={() => handleHapus(kelurahan.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr></tr>
                        )}
                    </tbody>
                </table>
                {kelurahan.length === 0 ? (
                    <div className="mt-4 text-center text-sm text-gray-500 italic">Tidak ada data untuk ditampilkan.</div>
                ) : (
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>Showing {kelurahan.length} entries</span>
                        <div className="space-x-2">
                            <button className="rounded border px-2 py-1 hover:bg-gray-100">Previous</button>
                            <button className="rounded border px-2 py-1 hover:bg-gray-100">Next</button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
