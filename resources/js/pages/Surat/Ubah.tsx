import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
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
        title: 'Surat',
        href: '/berita',
    },
    {
        title: 'Update Surat',
        href: '#',
    },
];
interface Surat {
    id: number;
    j_surat: string;
    alasan: string;
    tingkatan: string;
    wilayah: string;
}
interface Props {
    surat: Surat;
}
export default function SuratUbah({ surat }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        j_surat: surat.j_surat,
        alasan: surat.alasan,
        tingkatan: surat.tingkatan,
        wilayah: surat.wilayah,
        lampiran: null as File | null,
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('surat.update', surat.id));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Surat" />
            <div className="mx-5 my-5 text-black">
                <h2 className="mb-4 text-xl font-semibold">Update Surat</h2>
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
                        <Label>Jenis Surat</Label>
                        <Select value={data.j_surat} onValueChange={(val) => setData('j_surat', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Kategori Berita" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Kategori</SelectLabel>
                                    <SelectItem value="suket">Surat Keterangan</SelectItem>
                                    <SelectItem value="supen">Surat Pengantar</SelectItem>
                                    <SelectItem value="sudom">Surat Domisili</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full gap-3">
                        <Label>Kategori</Label>
                        <Select value={data.tingkatan} onValueChange={(val) => setData('tingkatan', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Kategori Berita" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tingkatan</SelectLabel>
                                    <SelectItem value="rt">RT</SelectItem>
                                    <SelectItem value="rw">RT - RW</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {data.tingkatan === 'rt' && (
                        <div className="grid w-full gap-3">
                            <Label>Wilayah</Label>
                            <Select value={data.wilayah} onValueChange={(val) => setData('wilayah', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Wilayah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Wilayah</SelectLabel>
                                        <SelectItem value="51">RT 51</SelectItem>
                                        <SelectItem value="52">RT 52</SelectItem>
                                        <SelectItem value="53">RT 53</SelectItem>
                                        <SelectItem value="54">RT 54</SelectItem>
                                        <SelectItem value="55">RT 55</SelectItem>
                                        <SelectItem value="56">RT 56</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {data.tingkatan === 'rw' && (
                        <div className="grid w-full gap-3">
                            <Label>Wilayah</Label>
                            <Select value={data.wilayah} onValueChange={(val) => setData('wilayah', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Wilayah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Wilayah</SelectLabel>
                                        <SelectItem value="08">RW 08</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid w-full gap-3">
                        <Label>Alasan</Label>
                        <Input value={data.alasan} onChange={(e) => setData('alasan', e.target.value)} />
                    </div>

                    <div className="grid w-full gap-3">
                        <Label>Lampiran</Label>
                        <Input
                            accept=".zip, .rar"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData('lampiran', file);
                            }}
                        />
                    </div>

                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Simpan
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
