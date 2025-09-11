import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
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
        title: 'Buat Surat Baru',
        href: '#',
    },
];

interface JenisSurat {
    id: number;
    nama_surat: string;
    alasan: string;
}
interface PageProps {
    jenisSurat: JenisSurat[];
}

export default function SuratTambah() {
    const { jenisSurat } = usePage().props as unknown as PageProps;

    const { data, setData, post, processing, errors } = useForm({
        warga_id: '',
        jenis_surat_id: '',
        alasan: '',
        alasan_manual: false,
        validasi_rw: true,
        lampiran: null as File | null,
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('surat.tambah'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Berita Baru" />
            <div className="mx-5 my-5 text-black">
                <h2 className="mb-4 text-xl font-semibold">Buat Surat</h2>
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
                        <Select value={data.jenis_surat_id} onValueChange={(val) => setData('jenis_surat_id', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Kategori Berita" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Kategori</SelectLabel>
                                    {jenisSurat.map((js) => (
                                        <SelectItem key={js.id} value={String(js.id)}>
                                            {js.nama_surat}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {data.alasan_manual && (
                        <>
                            <div className="grid w-full gap-3">
                                <Label>Alasan</Label>
                                <Input value={data.alasan} onChange={(e) => setData('alasan', e.target.value)} />
                            </div>
                        </>
                    )}

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
                    <div className="grid w-full gap-3">
                        <div className="flex items-start gap-3">
                            <Checkbox id="terms-2" checked={data.alasan_manual} onCheckedChange={(val) => setData('alasan_manual', Boolean(val))} />
                            <div className="grid gap-2">
                                <Label htmlFor="terms-2">Buat Alasan Sendiri</Label>
                                <p className="text-sm text-muted-foreground">
                                    Optional, Jika tidak di centang maka alasan akan membuat alasan by sistem
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="terms-2"
                                checked={data.validasi_rw}
                                onCheckedChange={(val) => setData('validasi_rw', Boolean(val))}
                                defaultChecked
                            />
                            <div className="grid gap-2">
                                <Label htmlFor="terms-2">Butuh Tanda Tangan RW</Label>
                                <p className="text-sm text-muted-foreground">
                                    Ketika di centang maka validasi harus sampai di cek oleh Ketua RW setempat
                                </p>
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Simpan
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
