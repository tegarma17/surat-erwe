import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React, { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    {
        title: 'Warga',
        href: '/warga',
    },
    {
        title: 'Tambah Warga Baru',
        href: '#',
    },
];
type Rt = {
    id: number;
    rw_id: number;
    nomer: string;
};
type Rw = {
    id: number;
    kelurahan_id: number;
    nomer: string;
    rts: Rt[];
};
type Kelurahan = {
    id: number;
    nama: string;
    rws: Rw[];
};
interface Props {
    kelurahans: Kelurahan[];
}

export default function WargaTambah({ kelurahans }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        nama: '',
        jk: '',
        tmpt_lahir: '',
        tgl_lahir: '',
        alamat: '',
        no_hp: '',
        pekerjaan: '',
        agama: '',
        sts_warga: '',
        sts_pernikahan: '',
        alamat_ktp: '',
        sts_tinggal: '',
        sts_domisili: '',
        tgl_masuk: '',
        email: '',
        rt_id: '',
        foto: null as File | null,
    });
    const [kelurahanId, setKelurahanId] = useState('');
    const [rwId, setRwId] = useState('');
    const kelurahan = kelurahans.find((k) => k.id === parseInt(kelurahanId));
    const rws = kelurahan?.rws || [];
    const rw = rws.find((r) => r.id === parseInt(rwId));
    const rts = rw?.rts || [];
    const isTinggal = data.sts_tinggal;
    const isWarga = data.sts_warga;
    const isDomisil = data.sts_domisili;
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('warga.tambah'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Warga Baru" />
            <div className="mx-5 my-5 text-black">
                <h2 className="mb-4 text-xl font-semibold">Tambah Data Warga Baru</h2>
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
                                onChange={(e) => setData('nik', e.target.value)}
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
                    <div className={`grid gap-3 transition-all duration-300 ${isWarga === 'lama' ? 'grid-cols-2' : 'grid-cols-1'} w-full`}>
                        <div className="grid w-full gap-3">
                            <Label>Status Warga</Label>
                            <Select
                                value={data.sts_warga}
                                onValueChange={(val) => {
                                    setData('sts_warga', val);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Warga Baru / Warga Lama" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="baru">Warga Baru</SelectItem>
                                        <SelectItem value="lama">Warga Lama</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {isWarga === 'lama' && (
                            <div className="grid w-full gap-3">
                                <Label>Tanggal Pindah</Label>
                                <Input
                                    type="date"
                                    id="tgl_masuk"
                                    placeholder="Tanggal Pindah"
                                    value={data.tgl_masuk}
                                    onChange={(e) => setData('tgl_masuk', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className={`grid gap-3 transition-all duration-300 ${isTinggal === 'tetap' ? 'grid-cols-2' : 'grid-cols-1'} w-full`}>
                        <div className="grid w-full gap-3">
                            <Label>Status Tinggal</Label>
                            <Select
                                value={data.sts_tinggal}
                                onValueChange={(val) => {
                                    setData('sts_tinggal', val);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Tetap / Kontrak" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="tetap">Penduduk Tetap</SelectItem>
                                        <SelectItem value="kontrak">Warga Kontrak</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {isTinggal === 'tetap' && (
                            <div className="grid w-full gap-3">
                                <Label>Status Domsili</Label>
                                <Select
                                    value={data.sts_domisili}
                                    onValueChange={(val) => {
                                        setData('sts_domisili', val);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Belum / Sudah Pindah" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="belum">Belum Pindah KTP</SelectItem>
                                            <SelectItem value="sudah">Sudah Pindah KTP</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    {(isDomisil === 'belum' || isTinggal === 'kontrak') && (
                        <div className="grid w-full gap-3">
                            <Label>Alamat Sesuai KTP</Label>
                            <Input
                                type="text"
                                id="alamat"
                                placeholder="Masukan Alamat Lengkap Sesuai KTP"
                                value={data.alamat_ktp}
                                onChange={(e) => setData('alamat_ktp', e.target.value)}
                            />
                        </div>
                    )}
                    <div className="grid w-full gap-3">
                        <Label>{isDomisil === 'belum' || isTinggal === 'kontrak' ? 'Alamat Sekarang' : 'Alamat'}</Label>
                        <Input
                            type="text"
                            id="alamat"
                            placeholder="Masukan Alamat Lengkap Sesuai Tempat Tinggal Saat ini"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                        />
                    </div>
                    <div className="grid w-full grid-cols-3 gap-3">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="nik">Desa</Label>
                            <Select
                                value={kelurahanId}
                                onValueChange={(value) => {
                                    setKelurahanId(value);
                                    setData('rt_id', '');
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Desa" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {kelurahans.map((kel) => (
                                            <SelectItem key={kel.id} value={String(kel.id)}>
                                                {kel.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="email">RW</Label>
                            <Select
                                value={rwId}
                                disabled={!kelurahanId}
                                onValueChange={(value) => {
                                    setRwId(value);
                                    setData('rt_id', '');
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih RW" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {rws.map((rw) => (
                                            <SelectItem key={rw.id} value={String(rw.id)}>
                                                RW {rw.nomer}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="email">RT</Label>
                            <Select value={data.rt_id} onValueChange={(val) => setData('rt_id', val)} disabled={!rwId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih RT" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {rts.map((rt) => (
                                            <SelectItem key={rt.id} value={String(rt.id)}>
                                                RT {rt.nomer}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
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
                                onChange={(e) => setData('no_hp', e.target.value)}
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
                                        <SelectItem value="aparat">Polisi / TNI / Aparatur Negara</SelectItem>
                                        <SelectItem value="swasta">Pegawai Swasta</SelectItem>
                                        <SelectItem value="wirausaha">Wirausaha</SelectItem>
                                        <SelectItem value="petani">Petani</SelectItem>
                                        <SelectItem value="melayan">Nelayan</SelectItem>
                                        <SelectItem value="mahasiswa">Mahasiswa / Pelajar</SelectItem>
                                        <SelectItem value="freelance">Freelance</SelectItem>
                                        <SelectItem value="guru">Guru</SelectItem>
                                        <SelectItem value="nakes">Tenaga Kesehatan / Dokter / Bidan / Perawat</SelectItem>
                                        <SelectItem value="irt">Ibu Rumah Tangga</SelectItem>
                                        <SelectItem value="pensiun">Pensiun</SelectItem>
                                        <SelectItem value="tidak">Tidak Bekerja</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-3">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="agama">Agama</Label>
                            <Select value={data.agama} onValueChange={(val) => setData('agama', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Agama" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Agama</SelectLabel>
                                        <SelectItem value="islam">Islam</SelectItem>
                                        <SelectItem value="kristen">Kristen</SelectItem>
                                        <SelectItem value="protestan">Protestan</SelectItem>
                                        <SelectItem value="katholik">Katholik</SelectItem>
                                        <SelectItem value="hindu">Hindu</SelectItem>
                                        <SelectItem value="buddha">Buddha</SelectItem>
                                        <SelectItem value="konghuchu">Konghuchu</SelectItem>
                                        <SelectItem value="tidak">Lainnya</SelectItem>
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
                                        <SelectItem value="cerai_hidup">Cerai Hidup</SelectItem>
                                        <SelectItem value="cerai_mati">Cerai Mati</SelectItem>
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
