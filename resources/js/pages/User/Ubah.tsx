import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
        title: 'Data Warga',
        href: '/warga',
    },
    {
        title: 'Edit Data Warga',
        href: '#',
    },
];
interface Warga {
    id: number;
    nik: number;
    nama: string;
    alamat: string;
    jk: string;
    tmpt_lahir: string;
    tgl_lahir: string;
    agama: string;
    sts_pernikahan: string;
    pekerjaan: string;
    no_hp: number;

    // Add other fields as needed
}

interface Props {
    warga: Warga;
    email: string;
}
export default function WargaUbah({ warga, email }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nik: warga.nik,
        nama: warga.nama,
        alamat: warga.alamat,
        jk: warga.jk,
        tmpt_lahir: warga.tmpt_lahir,
        tgl_lahir: warga.tgl_lahir,
        agama: warga.agama,
        sts_pernikahan: warga.sts_pernikahan,
        pekerjaan: warga.pekerjaan,
        no_hp: warga.no_hp,
        email: email,
        foto: null as File | null,
    });

    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('warga.update', warga.id));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Data Warga" />
            <div className="mx-5 my-5 text-black">
                <h2 className="mb-4 text-xl font-semibold">Edit Data Warga</h2>
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
                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="nik">NIK</Label>
                            <Input
                                type="text"
                                id="nik"
                                placeholder="NIK"
                                maxLength={20}
                                value={data.nik}
                                onChange={(e) => setData('nik', Number(e.target.value))}
                            />
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="text"
                                id="email"
                                placeholder="email@email.com"
                                value={data.email}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="nama">Nama</Label>
                            <Input
                                type="text"
                                id="nama"
                                placeholder="Nama Lengkap"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                            />
                        </div>
                        <div className="grid w-full gap-3">
                            <Label>Jenis Kelamin</Label>
                            <Select value={data.jk} onValueChange={(val) => setData('jk', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Jenis Kelamin</SelectLabel>
                                        <SelectItem value="l">Laki - Laki</SelectItem>
                                        <SelectItem value="p">Perempuan</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="tmpt_lahir">Tempat Lahir</Label>
                            <Input
                                type="text"
                                id="tmpt_lahir"
                                placeholder="Tempat Lahir"
                                pattern="[A-Za-z]+"
                                value={data.tmpt_lahir}
                                onChange={(e) => setData('tmpt_lahir', e.target.value)}
                            />
                        </div>
                        <div className="grid w-full gap-3">
                            <Label htmlFor="tgl_lahir">Tanggal Lahir</Label>
                            <Input
                                type="date"
                                id="tgl_lahir"
                                placeholder="Tanggal Lahir"
                                value={data.tgl_lahir}
                                onChange={(e) => setData('tgl_lahir', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid w-full gap-3">
                        <Label>Alamat</Label>
                        <Input
                            type="text"
                            id="alamat"
                            placeholder="Alamat Lengkap"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                        />
                    </div>

                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="no_hp">Nomer Hp</Label>
                            <Input
                                type="tel"
                                id="no_hp"
                                placeholder="Nomer Hp yang bisa dihubungi"
                                pattern="^08[0-9]{8,11}$"
                                value={data.no_hp}
                                onChange={(e) => setData('no_hp', Number(e.target.value))}
                            />
                        </div>
                        <div className="grid w-full gap-3">
                            <Label htmlFor="tgl_lahir">Pekerjaan</Label>
                            <Select value={data.pekerjaan} onValueChange={(val) => setData('pekerjaan', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Pekerjaan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pekerjaan</SelectLabel>
                                        <SelectItem value="pns">Pegawa Negeri Sipil</SelectItem>
                                        <SelectItem value="wirausaha">Wirausaha</SelectItem>
                                        <SelectItem value="aparat">Polisi / TNI / Aparatur Negara</SelectItem>
                                        <SelectItem value="guru">Guru</SelectItem>
                                        <SelectItem value="swasta">Pegawa Swasta</SelectItem>
                                        <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                                        <SelectItem value="tidak">Tidak Bekerja</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="agama">Agamap</Label>
                            <Select value={data.agama} onValueChange={(val) => setData('agama', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Agama" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Agama</SelectLabel>
                                        <SelectItem value="islam">Islam</SelectItem>
                                        <SelectItem value="kristen">Kristen</SelectItem>
                                        <SelectItem value="katolik">Katholik</SelectItem>
                                        <SelectItem value="hindu">Hindu</SelectItem>
                                        <SelectItem value="buddha">Buddha</SelectItem>
                                        <SelectItem value="konghucu">Konghuchu</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full gap-3">
                            <Label htmlFor="sts_pernikahan">Status Pernikahan</Label>
                            <Select value={data.sts_pernikahan} onValueChange={(val) => setData('sts_pernikahan', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Status Pernikahan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status Pernikahan</SelectLabel>
                                        <SelectItem value="belum">Belum Menikah</SelectItem>
                                        <SelectItem value="sudah">Sudah Menikah</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
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

                    <Button type="submit" disabled={processing} variant="default" size="lg">
                        Simpan
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
