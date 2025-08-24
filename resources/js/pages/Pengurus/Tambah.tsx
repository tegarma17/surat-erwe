import { ExampleCombobox } from '@/components/example-combobox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    {
        title: 'Berita',
        href: '/berita',
    },
    {
        title: 'Tambah Berita Baru',
        href: '#',
    },
];

export default function PengurusTambah() {
    const { data, setData, post, processing, errors } = useForm({
        warga_id: '',
        jabatan: '',
        tingkatan: '',
        posisi: '',
    });

    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('pengurus.tambah'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Berita Baru" />
            <div className="mx-5 my-5 text-black">
                <h2 className="mb-4 text-xl font-semibold">Tambah Berita</h2>
            </div>
            <div className="mx-5 rounded bg-white p-3 text-black shadow">
                <form encType="multipart/form-data" className="space-y-4" onSubmit={handleSimpan}>
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert />
                            <AlertTitle>Gagal!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="grid w-full gap-3">
                        <Label>Pilih Warga</Label>
                        <ExampleCombobox onChange={(val) => setData('warga_id', val)} />
                    </div>
                    <div className="grid w-full gap-3">
                        <Label>Jabatan</Label>
                        <Select value={data.jabatan} onValueChange={(val) => setData('jabatan', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Jabatan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>-- Pilih Jabatan --</SelectLabel>
                                    <SelectItem value="ket">Ketua</SelectItem>
                                    <SelectItem value="W_ket">Wakil Ketua</SelectItem>
                                    <SelectItem value="bend">Bendahara</SelectItem>
                                    <SelectItem value="sekre">Sekertaris</SelectItem>
                                    <SelectItem value="seksi">Seksi</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full gap-3">
                        <Label>Tingkatan</Label>
                        <Select value={data.tingkatan} onValueChange={(val) => setData('tingkatan', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Wilayah" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tingkatan</SelectLabel>
                                    <SelectItem value="rt">RT</SelectItem>
                                    <SelectItem value="rw">RW</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {data.jabatan === 'seksi' && (
                        <div className="grid w-full gap-3">
                            <Label>Posisi</Label>
                            <Select value={data.tingkatan} onValueChange={(val) => setData('tingkatan', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Wilayah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tingkatan</SelectLabel>
                                        <SelectItem value="sek_keamanan">Seksi Keamanan</SelectItem>
                                        <SelectItem value="sek_keagam">Seksi Keagamaan</SelectItem>
                                        <SelectItem value="sek_sos"> Seksi Kesejahteraan</SelectItem>
                                        <SelectItem value="sek_pemba">Seksi Pembangunan</SelectItem>
                                        <SelectItem value="sek_pemuda_olahara"> Seksi Pemuda</SelectItem>
                                        <SelectItem value="sek_humas">Seksi Humas</SelectItem>
                                        <SelectItem value="sek_kebersihan"> Seksi Kebersihan</SelectItem>
                                        <SelectItem value="sek_pendikbud">Seksi Pendidikan</SelectItem>
                                        <SelectItem value="sek_kes">Seksi Kesehatan</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Simpan
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
