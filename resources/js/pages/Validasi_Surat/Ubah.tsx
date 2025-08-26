import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
interface Surat {
    id: number;
    jenis_surat: string;
    alasan: string;
    tingkatan: string;
    wilayah: string;
    user_detail?: {
        nama: string;
        tmpt_lahir: string;
        tgl_lahir: Date;
        nik: string;
        alamat: string;
        no_hp: string;
        jk: string;
    };
    validasi_surat?: {
        id: number;
        status: string;
    };
}
interface Props {
    surat: Surat;
}
export default function SuratUbah() {
    const labelJenisKelamin: Record<string, string> = {
        l: 'Laki - Laki',
        p: 'Perempuan',
    };
    const labelJenisSurat: Record<string, string> = {
        suket: 'Surat Keterangan',
        sudom: 'Surat Domisili',
        supen: 'Surat Pengantar',
    };
    const { surat } = usePage().props as unknown as Props;
    const { data, setData, put } = useForm({
        status: surat.validasi_surat?.status,
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('validasi_surat.update', surat.validasi_surat?.id));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Surat" />
            <div className="mx-5 my-5 text-black">
                <Link href={route('validasi.index')}>
                    <Button className="bg-orange-400">Kembali</Button>
                </Link>
            </div>
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
                                    {surat.user_detail?.nama}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Tempat, Tanggal Lahir</div>
                                <div className="">
                                    : {'   '}
                                    {surat.user_detail?.alamat},{' '}
                                    {surat.user_detail?.tgl_lahir
                                        ? new Date(surat.user_detail.tgl_lahir).toLocaleDateString('id-ID', {
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
                                    {surat.user_detail?.nik}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Alamat</div>
                                <div className="">
                                    : {'   '}
                                    {surat.user_detail?.alamat}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Jenis Kelamin</div>
                                <div className="">
                                    : {'   '}
                                    {labelJenisKelamin[surat.user_detail?.jk ?? '']}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Nomer Hp</div>
                                <div className="">
                                    : {'   '}
                                    {surat.user_detail?.no_hp}
                                </div>
                            </div>
                            <hr />
                            <hr />
                            <h2 className="mb-4 border-b pb-2 text-lg font-semibold">📄 Informasi Surat</h2>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Jenis Surat</div>
                                <div className="">
                                    : {'   '}
                                    {labelJenisSurat[surat.jenis_surat]}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="font-semibold">Alasan</div>
                                <div className="">
                                    : {'   '}
                                    {surat.alasan}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <strong>Lampiran</strong>{' '}
                                <a
                                    href={route('surat.download', surat.id)}
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
                                        <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih Status Surat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="selesai">Setuju</SelectItem>
                                                <SelectItem value="proses">Proses</SelectItem>
                                                <SelectItem value="cek">Ditolak</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button variant="default">Simpan</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
