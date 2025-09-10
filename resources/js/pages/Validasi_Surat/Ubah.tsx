import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        title: 'Validasi Surat',
        href: '/berita',
    },
    {
        title: 'Detail Validasi Surat',
        href: '#',
    },
];
interface ValidasiSurat {
    id: number;
    status_validasi: string;
    catatan: string;
    surat?: {
        alasan_manual: number;
        alasan_pengajuan: string;
        alasan: string;
        status: string;
        jenis_surat?: {
            nama_surat: string;
        };
        user_detail?: {
            nama: string;
            tmpt_lahir: string;
            tgl_lahir: Date;
            nik: string;
            alamat: string;
            no_hp: string;
            jk: string;
        };
    };
}
interface Props {
    validasiSurat: ValidasiSurat;
    flash: {
        message?: string;
    };
}
export default function SuratUbah() {
    const labelJenisKelamin: Record<string, string> = {
        l: 'Laki - Laki',
        p: 'Perempuan',
    };

    const { validasiSurat, flash } = usePage().props as unknown as Props;
    const [show, setShow] = useState(!!flash.message);

    const { data, setData, put, processing } = useForm({
        status_validasi: validasiSurat.status_validasi,
        catatan: validasiSurat.catatan,
    });
    const handleSimpan = (e: React.FormEvent) => {
        console.log(data);
        e.preventDefault();
        put(route('validasi_surat.update', validasiSurat.id));
    };
    useEffect(() => {
        if (flash.message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [flash.message, setShow]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Surat" />
            <div className="mx-5 my-5 text-black">
                <Link href={route('validasi.index')}>
                    <Button className="bg-orange-400">Kembali</Button>
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
            <div className="mx-5 rounded bg-white p-3 text-black shadow">
                <h2 className="mb-4 text-center text-lg font-bold">Detail Pemohon Surat </h2>

                <div className="mx-5 flex flex-col gap-6 shadow-md md:flex-row">
                    <div className="w-full rounded bg-white p-4 shadow">
                        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">📄 Informasi Pemohon Surat</h2>
                        <div className="space-y-2 text-sm">
                            <p></p>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Nama</div>
                                <div className="">
                                    : {'   '}
                                    {validasiSurat.surat?.user_detail?.nama || ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Tempat, Tanggal Lahir</div>
                                <div className="">
                                    : {'   '}
                                    {validasiSurat.surat?.user_detail?.alamat},{' '}
                                    {validasiSurat.surat?.user_detail?.tgl_lahir
                                        ? new Date(validasiSurat.surat?.user_detail?.tgl_lahir).toLocaleDateString('id-ID', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : 'Tanggal lahir tidak tersedia'}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">NIK</div>
                                <div className="">
                                    : {'   '}
                                    {validasiSurat.surat?.user_detail?.nik}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Alamat</div>
                                <div className="">
                                    : {'   '}
                                    {validasiSurat.surat?.user_detail?.alamat}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Jenis Kelamin</div>
                                <div className="">
                                    : {'   '}
                                    {labelJenisKelamin[validasiSurat.surat?.user_detail?.jk ?? '']}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Nomer Hp</div>
                                <div className="">
                                    : {'   '}
                                    {validasiSurat.surat?.user_detail?.no_hp}
                                </div>
                            </div>
                            <hr />
                            <hr />
                            <h2 className="mb-4 border-b pb-2 text-lg font-semibold">📄 Informasi Surat</h2>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Jenis Surat</div>
                                <div className="">
                                    : {'   '}
                                    {validasiSurat.surat?.jenis_surat?.nama_surat || ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Alasan</div>
                                <div className="">
                                    : {'   '}
                                    {validasiSurat.surat?.alasan || ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <strong>Lampiran</strong>{' '}
                                <a
                                    href={route('surat.download', validasiSurat.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    : Unduh Lampiran
                                </a>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <strong>Download Surat</strong>{' '}
                                <a className="text-black" target="_blank" rel="noreferrer">
                                    : Download Belum Tersedia
                                </a>
                            </div>
                            <form encType="multipart/form-data" className="space-y-4" onSubmit={handleSimpan}>
                                <div className="grid grid-cols-3 items-center gap-3">
                                    <strong className="">Status Surat</strong>
                                    <div className="w-full">
                                        <Select value={data.status_validasi} onValueChange={(val) => setData('status_validasi', val)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih Status Surat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cek">Cek</SelectItem>
                                                <SelectItem value="selesai">Setuju</SelectItem>
                                                <SelectItem value="proses">Proses</SelectItem>
                                                <SelectItem value="ditolak">Ditolak</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {data.status_validasi === 'ditolak' && (
                                    <>
                                        <div className="grid grid-cols-3 items-center gap-3">
                                            <Label htmlFor="catatan"></Label>
                                            <Input
                                                type="catatan"
                                                id="catatan"
                                                placeholder="Alasan ditolak"
                                                value={data.catatan}
                                                onChange={(e) => setData('catatan', e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                                <Button type="submit" disabled={processing} variant="default" size="lg">
                                    Simpan
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
