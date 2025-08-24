import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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

export default function BeritaTambah() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        kategori: '',
        wilayah: '',
        slug: '',
        isi_berita: '',
        foto: null as File | null,
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('berita.tambah'));
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
                        <Label>Judul</Label>
                        <Input value={data.judul} onChange={(e) => setData('judul', e.target.value)} />
                    </div>
                    <div className="grid w-full gap-3">
                        <Label>Kategori</Label>
                        <Select value={data.kategori} onValueChange={(val) => setData('kategori', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Kategori Berita" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Kategori</SelectLabel>
                                    <SelectItem value="event">Event</SelectItem>
                                    <SelectItem value="kegiatan">Kegiatan</SelectItem>
                                    <SelectItem value="pengumuman">Pengumuman</SelectItem>
                                    <SelectItem value="peristiwa">Peristiwa</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
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

                    <div className="grid w-full gap-3">
                        <Label>Isi Berita</Label>
                        <Textarea
                            placeholder="Type your message here."
                            className="h-40"
                            value={data.isi_berita}
                            onChange={(e) => setData('isi_berita', e.target.value)}
                        />
                    </div>

                    <div className="grid w-full gap-3">
                        <Label>Foto</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData('foto', file);
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
