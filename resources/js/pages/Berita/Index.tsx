import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
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
        title: 'Berita',
        href: '#',
    },
];

interface Berita {
    id: number;
    judul: string;
    kategori: string;
    created_at: Date;
    // Add other fields as needed
}
interface PageProps {
    flash: {
        message?: string;
    };
    berita: Berita[];
}

export default function BeritaIndex() {
    const { berita, flash } = usePage().props as unknown as PageProps;
    const [show, setShow] = useState(!!flash.message);

    const { delete: destroy } = useForm();

    const handleHapus = (id: number) => {
        destroy(route('berita.hapus', { id }));
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
            <Head title="Berita" />
            <div className="mx-5 my-3 flex">
                <Link href={route('berita.create')}>
                    <Button className="bg-empat text-white hover:bg-lima">Tambah Berita</Button>
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
                    <h2 className="text-xl font-semibold text-gray-800">Data Berita Warga</h2>
                    <input type="text" placeholder="Search..." className="rounded-md border px-3 py-2 text-sm text-black" />
                </div>

                {berita.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Judul Berita</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Kategori</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Tanggal Kejadian</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {berita.map((berita, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">{berita.judul}</td>
                                    <td className="px-4 py-2">{berita.kategori}</td>
                                    <td className="px-4 py-2">{new Date(berita.created_at).toLocaleDateString()}</td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Link href={route('berita.ubah', berita.id)}>
                                            <Button variant="default">Edit</Button>
                                        </Link>
                                        <ConfirmDeleteDialog itemName={berita.judul} onConfirm={() => handleHapus(berita.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Showing {berita.length} entries</span>
                    <div className="space-x-2">
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Previous</button>
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Next</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
