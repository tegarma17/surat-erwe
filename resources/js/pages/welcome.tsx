import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';
import { PiLampPendantLight } from 'react-icons/pi';
import security from '../../../public/digital.png';
import easy from '../../../public/easy.png';
import keunggulan from '../../../public/keunggulan.png';
import logo from '../../../public/logo.png';
import paper from '../../../public/paper.png';
import profile from '../../../public/profile.jpg';
import time from '../../../public/time.png';

export default function Welcome() {
    const { props } = usePage();
    const listBerita: { foto: string; judul: string; isi_berita: string; slug: string }[] =
        (props.beritas as { foto: string; judul: string; isi_berita: string; slug: string }[]) || [];
    const navigation = [
        { name: 'Home', href: '#', current: false },
        { name: 'Layanan', href: '#', current: false },
        { name: 'Tata Cara', href: '#', current: false },
        { name: 'Keunggulan', href: '#', current: false },
        { name: 'Kepengurusan', href: '#', current: false },
        { name: 'Berita', href: '#', current: false },
        { name: 'Login / Register', href: '/login', current: true },
    ];
    const items = [
        { jabatan: 'Ketua RW 08', nama: 'Abigail', foto: profile },
        { jabatan: 'Wakil Ketua RW 08', nama: 'Archie Padilla', foto: profile },
        { jabatan: 'Bendahara', nama: 'Sarah Morse', foto: profile },
        { jabatan: 'Anggota', nama: 'Ava Berg', foto: profile },
        { jabatan: 'Anggota', nama: 'Alasdair Boyd', foto: profile },
        { jabatan: 'Anggota', nama: 'Lottie Mcintyre', foto: profile },
        { jabatan: 'Anggota', nama: 'Bilal Chan', foto: profile },
        { jabatan: 'Anggota', nama: 'Mina Guerra', foto: profile },
        { jabatan: 'Anggota', nama: 'Maeve French', foto: profile },
        { jabatan: 'Anggota', nama: 'Amira Alvarez', foto: profile },
        { jabatan: 'Anggota', nama: 'Keira Gibbons', foto: profile },
    ];
    const [index, setIndex] = useState(0);
    const itemsPerPage = 4;
    const nextItems = () => {
        if (index + itemsPerPage < items.length) {
            setIndex(index + itemsPerPage);
        }
    };
    const prevItems = () => {
        if (index - itemsPerPage >= 0) {
            setIndex(index - itemsPerPage);
        }
    };
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ');
    }
    // const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="eRWe">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Disclosure
                as="nav"
                className="relative bg-tiga after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
            >
                <div className="mx-auto w-full bg-empat px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                            <div className="flex shrink-0 items-center">
                                <img alt="Your Company" src={logo} className="h-8 w-auto" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="ml-auto flex justify-center space-x-4 md:justify-end">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-empat text-white' : 'text-black hover:bg-empat hover:text-white',
                                                'rounded-md px-3 py-2 font-dua text-sm font-bold text-satu',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>

            {/* Hero section */}
            <section
                className="relative h-[80vh] items-center justify-center bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
            >
                <div className="absolute inset-0 z-0 bg-dua/40" />

                {/* Konten */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1 }}
                        className="mb-4 font-satu text-4xl font-extrabold sm:text-5xl"
                    >
                        Selamat Datang di{' '}
                        <motion.p
                            initial={{ opacity: 0, y: -100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1 }}
                            className="text-tiga"
                        >
                            eRWe
                        </motion.p>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1 }}
                        className="mb-6 max-w-xl font-tiga text-base lg:text-xl"
                    >
                        Melayani pembuatan e-Surat diharapkan dapat mempermudah dalam pembuatan surat menyurat di lingkungan RW
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.1 }}
                        className="rounded-md bg-button-primary px-6 py-3 transition hover:bg-blue-700"
                    >
                        Buat Surat
                    </motion.button>
                </div>
            </section>

            <section className="bg-white p-5"></section>
            {/* Visi MIsi */}
            <section className="bg-white">
                <div className="flex h-[33rem] flex-col items-center justify-center gap-3 px-4 text-center font-satu text-lg shadow-lg lg:flex-row">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.1 }}
                        className="flex h-3/4 flex-col items-center justify-center rounded-md bg-lima shadow-lg"
                    >
                        <PiLampPendantLight className="my-5 text-center text-4xl text-empat" />
                        <h1 className="font-satu text-2xl font-bold">Visi</h1>
                        <p className="p-3 text-sm">
                            Penggunaan sistem digital dalam pembuatan surat RW dapat mempercepat proses, mengurangi kesalahan, dan membuat arsip lebih
                            mudah diakses.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.1 }}
                        className="my-5 flex h-3/4 flex-col items-center justify-center rounded-md bg-lima shadow-lg"
                    >
                        <MdMenuBook className="my-5 text-center text-4xl text-empat" />
                        <h1 className="font-satu text-2xl font-bold">Misi</h1>
                        <div className="p-3">
                            <p className="my-2 text-sm">
                                1 Meningkatkan Efisiensi dan Aksesibilitas Proses pembuatan dan distribusi surat harus mudah dilakukan oleh warga,
                                baik secara manual maupun digital.
                            </p>
                            <p className="text-sm">
                                2 Mendorong Digitalisasi dalam Administrasi RW Menggunakan sistem berbasis web atau aplikasi untuk mempermudah
                                pengarsipan, validasi, dan pembuatan surat secara otomatis.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Keunggulan */}
            <section className="">
                <div>
                    <h1 className="bg-tiga p-5 text-center font-satu text-2xl font-extrabold shadow-md">Service Us</h1>
                </div>
                <div className="flex flex-col items-center justify-evenly gap-3 bg-tiga p-4 md:flex-row lg:flex-row">
                    {/* <!-- Card 1 --> */}
                    <div className="h-[18rem] w-64 overflow-hidden rounded-lg bg-white shadow-md">
                        <img className="mx-auto mt-3 h-fit w-1/2" src={easy} alt="Image 1" />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">Kemudahan Akses</h3>
                            <p className="mt-2 text-sm text-gray-600">Memudahkan Pengurusan dimana saja dan mudah</p>
                        </div>
                    </div>
                    {/* <!-- Card 2 --> */}
                    <div className="h-[18rem] w-64 overflow-hidden rounded-lg bg-white shadow-md">
                        <img className="mx-auto my-3 w-1/2" src={time} alt="Image 2" />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">Efisiensi Waktu</h3>
                            <p className="mt-2 text-sm text-gray-600">Memudahkan Pengurusan Surat dikala sibuk atau sedang tidak ada ditempat</p>
                        </div>
                    </div>
                    {/* <!-- Card 3 --> */}
                    <div className="h-[18rem] w-64 overflow-hidden rounded-lg bg-white shadow-md">
                        <img className="mx-auto my-3 w-1/2" src={security} alt="Image 3" />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">Era Digitalisasi</h3>
                            <p className="mt-2 text-sm text-gray-600">Mulai Menuju Era serba digital</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* layanan */}
            <section className="bg-white">
                <div>
                    <h1 className="p-5 text-center font-satu text-2xl font-extrabold text-empat">Melayani </h1>
                </div>
                <div className="flex flex-col items-center justify-evenly gap-6 p-4 md:flex-row lg:flex-row">
                    {/* <!-- Card 1 --> */}
                    <div className="h-[18rem] w-64 overflow-hidden rounded-lg bg-gray-100 shadow-md">
                        <img className="mx-auto my-3 h-fit w-1/2" src={paper} alt="Image 1" />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">Surat Keterangan</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                {' '}
                                Surat Keterangan digunakan untuk bukti atau pernyataan tertentu yang diperlukan untuk keperluan administrasi
                            </p>
                        </div>
                    </div>
                    {/* <!-- Card 2 --> */}
                    <div className="h-[18rem] w-64 overflow-hidden rounded-lg bg-gray-100 shadow-md">
                        <img className="mx-auto my-3 w-1/2" src={paper} alt="Image 2" />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">Surat Pengantar</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Surat Pengantar digunakan memperkenalkan atau mengantarkan berkas kepada instansi atau pihak terkait sebagai syarat
                                administrasi tertentu.
                            </p>
                        </div>
                    </div>
                    {/* <!-- Card 3 --> */}
                    <div className="h-[18rem] w-64 overflow-hidden rounded-lg bg-gray-100 shadow-md">
                        <img className="mx-auto my-3 w-1/2" src={paper} alt="Image 3" />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">Surat Domisili</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                {' '}
                                Surat Domisili digunakan sebagai bukti resmi alamat tempat tinggal yang diperlukan untuk berbagai keperluan
                                administrasi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white p-5"></section>

            {/* Tata Cara */}
            <section>
                <div className="mt-5 bg-empat">
                    <h2 className="-mt-5 py-5 text-center font-dua text-2xl font-bold text-white">Tata Cara Pendaftaran</h2>
                    <div className="mx-auto flex w-full flex-col items-center justify-evenly p-4 md:flex-row lg:flex-row">
                        <figure>
                            <motion.img
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.1 }}
                                src={keunggulan}
                                alt="Shoes"
                                className="drop-shadow-2xl"
                            />
                        </figure>
                        <div className="space-y-8 border-l-8 border-satu pl-12">
                            {/* <!-- Langkah 1 --> */}
                            <div className="relative">
                                <div className="absolute top-1 -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-satu font-bold text-white">
                                    1
                                </div>
                                <h3 className="font-dua text-2xl font-bold text-white">Isi Formulir</h3>
                                <p className="mt-1 text-sm text-gray-400">Masukkan data diri lengkap pada formulir pendaftaran.</p>
                            </div>
                            {/* <!-- Langkah 2 --> */}
                            <div className="relative">
                                <div className="absolute top-1 -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-satu font-bold text-white">
                                    2
                                </div>
                                <h3 className="font-dua text-2xl font-bold text-white">Unggah Dokumen</h3>
                                <p className="mt-1 text-sm text-gray-400">Upload KTP, foto, dan dokumen pendukung lainnya.</p>
                            </div>

                            {/* <!-- Langkah 3 --> */}
                            <div className="relative">
                                <div className="absolute top-1 -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-satu font-bold text-white">
                                    3
                                </div>
                                <h3 className="font-dua text-2xl font-bold text-white">Verifikasi</h3>
                                <p className="mt-1 text-sm text-gray-400">Tunggu proses verifikasi oleh admin (1–2 hari kerja).</p>
                            </div>

                            {/* <!-- Langkah 4 --> */}
                            <div className="relative">
                                <div className="absolute top-1 -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-satu font-bold text-white">
                                    4
                                </div>
                                <h3 className="font-dua text-2xl font-bold text-white">Selesai</h3>
                                <p className="mt-1 text-sm text-gray-400">Akun aktif dan kamu bisa mulai menggunakan layanan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white p-5"></section>

            {/* Kepengurusan */}
            <section>
                {' '}
                <div className="bg-tiga shadow-lg lg:h-[35rem]">
                    <h1 className="p-5 text-center font-dua text-3xl font-bold text-white">Susunan Kepengurusan</h1>
                    <div className="flex flex-row items-center justify-center gap-5">
                        <button
                            onClick={prevItems}
                            className="hidden rounded-md bg-button-primary px-4 py-2 transition hover:bg-blue-700 disabled:opacity-50 lg:block"
                            disabled={index === 0}
                        >
                            Sebelumnya
                        </button>
                        <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:mx-5 md:grid-cols-3 lg:grid-cols-4">
                            {items.slice(index, index + itemsPerPage).map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: -100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.1 }}
                                    key={i}
                                    className="h-[22rem] w-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg"
                                >
                                    <img src={item.foto} alt="Shoes" className="rounded-xl" />

                                    <div className="p-4 text-center">
                                        <h2 className="text-lg font-semibold text-gray-800">{item.jabatan}</h2>
                                        <p className="mt-2 text-sm text-gray-600">{item.nama}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            onClick={nextItems}
                            className="hidden rounded-md bg-button-primary px-4 py-2 transition hover:bg-blue-700 disabled:opacity-50 lg:block"
                            disabled={index + itemsPerPage >= items.length}
                        >
                            Selanjutnya
                        </button>
                    </div>
                    <div className="mx-1 flex flex-row justify-between p-3">
                        <button
                            onClick={prevItems}
                            className="rounded-md bg-button-primary px-4 py-2 transition hover:bg-blue-700 disabled:opacity-50 lg:hidden"
                            disabled={index === 0}
                        >
                            Sebelumnya
                        </button>
                        <button
                            onClick={nextItems}
                            className="rounded-md bg-button-primary px-4 py-2 transition hover:bg-blue-700 disabled:opacity-50 lg:hidden"
                            disabled={index + itemsPerPage >= items.length}
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </section>

            <section className="bg-white p-5"></section>

            <section>
                <div className="mx-auto bg-white text-black lg:h-[35rem]">
                    <h1 className="text-center font-dua text-3xl font-bold">Berita Terkini</h1>
                    <div className="flex flex-row items-center justify-center gap-5 px-4">
                        <button
                            onClick={prevItems}
                            className="hidden rounded-md bg-button-primary px-6 py-3 transition hover:bg-blue-700 disabled:opacity-50 lg:block"
                            disabled={index === 0}
                        >
                            Sebelumnya
                        </button>
                        <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:mx-5 md:grid-cols-3 lg:grid-cols-4">
                            {listBerita
                                .slice(index, index + itemsPerPage)
                                .map((item: { foto: string; judul: string; isi_berita: string; slug: string }, i: number) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: -100 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1.1 }}
                                        key={i}
                                        className="mx-auto flex min-h-[300px] flex-col justify-between rounded-lg bg-white p-4 shadow"
                                    >
                                        <img src={item.foto} alt={item.foto} className="h-48 w-full rounded-md object-cover" />

                                        <div className="flex flex-col gap-3 p-4 text-center">
                                            <h2 className="text-base font-semibold text-gray-800">{item.judul}</h2>
                                            <p className="mt-2 line-clamp-1 text-sm text-gray-600">{item.isi_berita}</p>

                                            <Link
                                                href={`/berita/${item.slug}`}
                                                className="rounded-md bg-button-primary px-6 py-3 transition hover:bg-blue-700"
                                            >
                                                Selengkapnya
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                        <button
                            onClick={nextItems}
                            className="hidden rounded-md bg-button-primary px-6 py-3 transition hover:bg-blue-700 disabled:opacity-50 lg:block"
                            disabled={index + itemsPerPage >= listBerita.length}
                        >
                            Selanjutnya
                        </button>
                    </div>
                    <div className="mx-1 flex flex-row justify-between">
                        <button
                            onClick={prevItems}
                            className="btn btn-primary my-3 rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50 lg:hidden"
                            disabled={index === 0}
                        >
                            Sebelumnya
                        </button>
                        <button
                            onClick={nextItems}
                            className="btn btn-primary my-3 rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50 lg:hidden"
                            disabled={index + itemsPerPage >= listBerita.length}
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <div className="text-neutral-content bg-tiga p-10">
                    <div className="flex flex-row items-center justify-between gap-10 py-5">
                        <div className="flex w-1/2 flex-col">
                            <img src={logo} alt="" className="w-32" />
                            <p>
                                ERWE 08
                                <br />
                                e-Surat Menyurat RW 08
                            </p>
                            <ul>
                                <li>Home</li>
                                <li>Layanan</li>
                                <li>Tata Cara</li>
                                <li>Keunggulan</li>
                                <li>Ketua</li>
                            </ul>
                            <div className="my-5 flex flex-col">
                                <h1>Social Media</h1>
                                <div className="mt-3 flex flex-row gap-4">
                                    <FaFacebook />
                                    <FaInstagram />
                                    <FaYoutube />
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <h1 className="mb-5 font-satu text-3xl font-bold">Kontak Kami</h1>
                            <div className="flex flex-col gap-4">
                                <input type="text" placeholder="Email" className="input w-full rounded-sm bg-white p-2 text-black" />
                                <input type="text" placeholder="Masalah " className="input w-full rounded-sm bg-white p-2 text-black" />
                                <textarea
                                    className="textarea textarea-bordered w-full rounded-sm bg-white p-2 text-black"
                                    placeholder="Tulis komentar..."
                                ></textarea>
                                <button className="rounded-md bg-button-primary px-6 py-3 transition hover:bg-blue-700 disabled:opacity-50">
                                    Kirim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
