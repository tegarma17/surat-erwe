import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { ConfirmUpdateDialog } from '@/components/confirm-update-status-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle2Icon, CircleAlert, CircleCheck } from 'lucide-react';

import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    {
        title: 'Data Pengurus',
        href: '#',
    },
];

interface Pengurus {
    id: number;
    is_aktif: string;
    jabatan: string;
    tingkatan: string;
    alamat: string;
    warga?: {
        nama: string;
        alamat: string;
        rt?: {
            id: number;
            rw_id: number;
            nomer: number;
            rw?: {
                id: number;
                nomer: number;
            };
        };
    };
    // Add other fields as needed
}
interface Props {
    flash: {
        message?: string;
    };
    pengurus: Pengurus[];
}

export default function PengurusIndex({ pengurus, flash }: Props) {
    const [show, setShow] = useState(!!flash.message);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const jabatanLabel: Record<string, string> = {
        ket: 'Ketua',
        W_ket: 'Wakil Ketua',
        ben: 'Bendahara',
        sekre: 'Sekertaris',
        seksi: 'Seksi',
        sek_keamanan: 'Seksi Keamanan',
        sek_keagam: 'Seksi Keagamaan',
        sek_sos: 'Seksi Kesejahteraan',
        sek_pemba: 'Seksi Pembangunan',
        sek_pemuda_olahara: 'Seksi Pemuda',
        sek_humas: 'Seksi Humas',
        sek_kebersihan: 'Seksi Kebersihan',
        sek_pendikbud: 'Seksi Pendidikan',
        ssek_kes: 'Seksi keseahatan',
    };
    const { processing, delete: destroy, put: update } = useForm();
    const selecetedPengurus = pengurus.find((p) => p.id === selectedId);
    const { data, setData, post, errors, reset } = useForm({
        is_aktif: selecetedPengurus?.is_aktif ?? '', // status jabatan pengurus
        // ...field lain
    });
    useEffect(() => {
        if (selecetedPengurus) {
            setData({
                is_aktif: selecetedPengurus.is_aktif,
            });
        }
    }, [selecetedPengurus]);

    console.log(data.is_aktif);
    const handleHapus = (id: number) => {
        destroy(route('berita.hapus', { id }));
    };

    const handleUpdateStatus = (id: number) => {
        update(route('statusUpdate.update', { id }));
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
            <Head title="Data Pengurus" />
            <div className="mx-5 my-3 flex">
                <Link href={route('pengurus.create')}>
                    <Button className="bg-empat text-white hover:bg-lima">Tambah Pengurus</Button>
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
                    <h2 className="text-xl font-semibold text-gray-800">Data Pengurus </h2>
                    <input type="text" placeholder="Search..." className="rounded-md border px-3 py-2 text-sm text-black" />
                </div>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Nama</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Jabatan</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Alamat</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Status Jabatan</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pengurus.length > 0 ? (
                            pengurus.map((pengurus, i) => (
                                <tr key={i} className="text-gray-800 transition odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="px-4 py-2">{pengurus.warga?.nama}</td>
                                    <td className="px-4 py-2">
                                        {jabatanLabel[pengurus.jabatan]} {pengurus.tingkatan.toUpperCase()}{' '}
                                        {pengurus.tingkatan === 'rw' ? pengurus.warga?.rt?.rw?.nomer : pengurus.warga?.rt?.nomer}
                                    </td>
                                    <td className="px-4 py-2">{pengurus.warga?.alamat}</td>
                                    <td className="px-4 py-2">
                                        <Badge
                                            variant="secondary"
                                            className={
                                                pengurus.is_aktif === 'aktif'
                                                    ? 'bg-green-600 text-white dark:bg-blue-600'
                                                    : 'bg-red-600 text-white dark:bg-blue-600'
                                            }
                                        >
                                            {pengurus.is_aktif === 'aktif' ? (
                                                <CircleCheck size={64} strokeWidth={3} />
                                            ) : (
                                                <CircleAlert size={64} strokeWidth={3} />
                                            )}
                                            {pengurus.is_aktif.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <ConfirmUpdateDialog
                                            alertTitle={pengurus.is_aktif === 'aktif' ? ' menonaktifkan ' : ' menakftifkan '}
                                            alertDescription={pengurus.is_aktif === 'aktif' ? ' dinonaktifkan ' : ' dinakftifkan '}
                                            itemName={pengurus.warga?.nama}
                                            className={pengurus.is_aktif === 'aktif' ? 'bg-red-400' : 'bg-green-600'}
                                            onConfirm={() => handleUpdateStatus(pengurus.id)}
                                            nameButton={pengurus.is_aktif === 'aktif' ? 'Nonaktifkan Kepengurusan' : 'Aktifkan Kepengurusan'}
                                        />

                                        <ConfirmDeleteDialog onConfirm={() => handleHapus(pengurus.id)} nameButton="Hapus" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr></tr>
                        )}
                    </tbody>
                </table>

                {pengurus.length === 0 ? (
                    <div className="mt-4 text-center text-sm text-gray-500 italic">Tidak ada data untuk ditampilkan.</div>
                ) : (
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>Showing {pengurus.length} entries</span>
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
