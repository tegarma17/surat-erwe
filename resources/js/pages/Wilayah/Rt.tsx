import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { DialogWilayahRt } from '@/components/dialog-data-wilayah-rt';
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

type Kelurahan = {
    id: number;
    nama: string;
};
interface Rw {
    id: number;
    kelurahan_id: number;
    nomer: string;
}
interface Rt {
    id: number;
    rw_id: number;
    nomer: string;
}
interface PageProps {
    flash: {
        message?: string;
    };
    kelurahan: Kelurahan;
    rw: Rw;
    rt: Rt[];
}

export default function WilayahRtIndex() {
    const { rw, rt, flash } = usePage().props as unknown as PageProps;
    const [show, setShow] = useState(!!flash.message);
    const namaKelurahanList = rw.nomer;

    const { processing, delete: destroy } = useForm();

    const handleHapus = (id: number) => {
        destroy(route('hapus.data_rw', { id }));
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
            <div className="mx-5 w-1/2">
                <DialogWilayahRt rwId={rw.id} />
            </div>
            <div className="mx-5">
                <Link href={route('wilayah.index')}>
                    <Button className="bg-amber-400">Kembali</Button>
                </Link>
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
                    <h2 className="text-xl font-semibold text-gray-800">Data Wilayah RW {namaKelurahanList}</h2>
                    <input type="text" placeholder="Search..." className="rounded-md border px-3 py-2 text-sm text-black" />
                </div>

                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Nama RT</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rt.length > 0 ? (
                            rt.map((rw, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">RT {rw.nomer}</td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <ConfirmDeleteDialog nameButton="Hapus RT" onConfirm={() => handleHapus(rw.id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr></tr>
                        )}
                    </tbody>
                </table>
                {rt.length === 0 ? (
                    <div className="mt-4 text-center text-sm text-gray-500 italic">Tidak ada data untuk ditampilkan.</div>
                ) : (
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>Showing {rt.length} entries</span>
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
