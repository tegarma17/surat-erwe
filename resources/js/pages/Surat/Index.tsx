import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { BadgeCheck, Ban, CheckCircle2Icon, Loader2Icon, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    {
        title: 'Data Surat',
        href: '#',
    },
];

interface Surat {
    id: number;
    created_at: Date;
    jenis_surat: string;
    validasi_surat?: {
        status: string;
    };

    // Add other fields as needed
}
interface PageProps {
    flash: {
        message?: string;
    };
    surat: Surat[];
}

export default function SuratIndex() {
    const { surat, flash } = usePage().props as unknown as PageProps;
    const [show, setShow] = useState(!!flash.message);
    const labelJenisSurat: Record<string, string> = {
        suket: 'Surat Keterangan',
        sudom: 'Surat Domisili',
        supen: 'Surat Pengantar',
    };
    const labelStatusSurat: Record<string, string> = {
        cek: 'Ditolak',
        proses: 'Proses',
        selesai: 'Selesai',
    };
    const { processing, delete: destroy } = useForm();

    const handleHapus = (id: number) => {
        destroy(route('surat.hapus', { id }));
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
                <Link href={route('surat.create')}>
                    <Button className="bg-empat text-white hover:bg-lima">Buat Surat</Button>
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
                    <h2 className="text-xl font-semibold text-gray-800">Data Surat yang dibuat</h2>
                    <input type="text" placeholder="Search..." className="rounded-md border px-3 py-2 text-sm text-black" />
                </div>

                {surat.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Tanggal dibuat</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Jenis</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Status Surat</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surat.map((surat, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">{new Date(surat.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{labelJenisSurat[surat.jenis_surat]}</td>
                                    <td className="px-4 py-2">
                                        {surat.validasi_surat?.status === 'cek' ? (
                                            <Badge variant="secondary" className="bg-red-500 text-white">
                                                <Ban />
                                                {labelStatusSurat[surat.validasi_surat.status]}
                                            </Badge>
                                        ) : surat.validasi_surat?.status === 'proses' ? (
                                            <Badge variant="secondary" className="bg-yellow-500 text-white">
                                                <Timer />
                                                {labelStatusSurat[surat.validasi_surat.status]}
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-green-500 text-white">
                                                <BadgeCheck />
                                                {labelStatusSurat[surat.validasi_surat?.status || '']}
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="flex gap-2 px-4 py-2">
                                        {surat.validasi_surat?.status === 'cek' ? (
                                            <>
                                                <Link href={route('surat.ubah', surat.id)}>
                                                    <Button variant="default">Edit</Button>
                                                </Link>
                                                <ConfirmDeleteDialog onConfirm={() => handleHapus(surat.id)} nameButton="Batalkan" />
                                            </>
                                        ) : surat.validasi_surat?.status === 'selesai' ? (
                                            <a href={route('template_surat.download', surat.id)} target="_blank" rel="noopener noreferrer">
                                                <Button variant="default">Download Surat</Button>
                                            </a>
                                        ) : (
                                            <Link href={route('surat.download', surat.id)}>
                                                <Button size="sm" disabled>
                                                    <Loader2Icon className="animate-spin" />
                                                    Sedang diproses
                                                </Button>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Showing {surat.length} entries</span>
                    <div className="space-x-2">
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Previous</button>
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Next</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
