import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BadgeCheck, Ban, CheckCircle2Icon, Timer } from 'lucide-react';
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

interface ValidasiSurat {
    id: number;
    status_validasi: string;
    surat?: {
        created_at: Date;
        user_detail?: {
            nama: string;
        };
        jenis_surat?: {
            nama_surat: string;
        };
    };

    // Add other fields as needed
}
interface PageProps {
    flash: {
        message?: string;
    };
    validasiSurat: ValidasiSurat[];
}

export default function SuratIndex() {
    const { validasiSurat, flash } = usePage().props as unknown as PageProps;
    console.log(validasiSurat);
    const [show, setShow] = useState(!!flash.message);

    const labelStatusSurat: Record<string, string> = {
        cek: 'Ditolak',
        proses: 'Proses',
        selesai: 'Selesai',
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

                {validasiSurat.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Nama Pemohon</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Jenis Surat</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Tanggal Pembuatan Surat</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Status Surat</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {validasiSurat.map((validasi, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">{validasi?.surat?.user_detail?.nama || ''}</td>
                                    <td className="px-4 py-2">{validasi?.surat?.jenis_surat?.nama_surat || ''}</td>
                                    <td className="px-4 py-2">{new Date(validasi?.surat?.created_at).toLocaleDateString('id-ID') || ''}</td>
                                    <td className="px-4 py-2">
                                        {validasi.status_validasi === 'cek' ? (
                                            <Badge variant="secondary" className="bg-red-500 text-white">
                                                <Ban />
                                                {labelStatusSurat[validasi.status_validasi]}
                                            </Badge>
                                        ) : validasi.status_validasi === 'proses' ? (
                                            <Badge variant="secondary" className="bg-yellow-500 text-white">
                                                <Timer />
                                                {labelStatusSurat[validasi.status_validasi]}
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-green-500 text-white">
                                                <BadgeCheck />
                                                {labelStatusSurat[validasi.status_validasi || '']}
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Link href={route('validasi_surat.ubah', validasi.id)}>
                                            <Button variant="default">Lihat Selengkapnya</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Showing {validasiSurat.length} entries</span>
                    <div className="space-x-2">
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Previous</button>
                        <button className="rounded border px-2 py-1 hover:bg-gray-100">Next</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
