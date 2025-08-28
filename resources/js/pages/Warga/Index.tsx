import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { DialogStatusWarga } from '@/components/dialog-status-warga';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    {
        title: 'Warga',
        href: '#',
    },
];

interface Pagination<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}
interface Warga {
    id: number;
    nik: string;
    nama: string;
    alamat: string;
    is_aktif: string;
    // Add other fields as needed
}
interface PageProps {
    flash: {
        message?: string;
    };
    warga: Pagination<Warga>;
}

export default function WargaIndex() {
    const { warga, flash } = usePage().props as unknown as PageProps;
    const [show, setShow] = useState(!!flash.message);
    const [fadeOut, setFadeOut] = useState(false);

    const { delete: destroy } = useForm();

    const handleHapus = (id: number) => {
        destroy(route('warga.hapus', { id }));
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
            <Head title="Data Warga" />
            <div className="mx-5 my-3 flex">
                <Link href={route('warga.create')}>
                    <Button className="bg-empat text-white hover:bg-lima">Tambah Warga Baru</Button>
                </Link>
            </div>

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
                    <h2 className="text-xl font-semibold text-gray-800">Data Warga</h2>
                    <input type="text" placeholder="Search..." className="rounded-md border px-3 py-2 text-sm text-black" />
                </div>

                {warga.data.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Nama Warga</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Alamat</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warga.data.map((warga, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">{warga.nama}</td>
                                    <td className="px-4 py-2">{warga.alamat}</td>
                                    <td className="px-4 py-2 capitalize">{warga.is_aktif}</td>
                                    <td className="flex flex-col gap-2 px-4 py-2 lg:flex-row">
                                        <Link href={route('warga.ubah', warga.id)}>
                                            <Button className="bg-tiga text-white hover:bg-dua">Edit</Button>
                                        </Link>
                                        <DialogStatusWarga nameButton="Edit Status Warga" warga={warga} />
                                        <ConfirmDeleteDialog itemName={warga.nama} onConfirm={() => handleHapus(warga.id)} nameButton="Hapus" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Showing {warga.data.length} entries</span>
                    <div className="mt-4 flex gap-2">
                        {warga.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                className={`rounded border px-2 py-1 ${link.active ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
