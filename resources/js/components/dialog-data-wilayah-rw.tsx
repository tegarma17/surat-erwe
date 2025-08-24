import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Input } from './ui/input';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
interface Wilayah {
    nama: string;
}
export function DialogWilayahRw() {
    const [rows, setRows] = useState<Wilayah[]>([{ nama: '' }]);

    const tambahBaris = () => {
        setRows([...rows, { nama: '' }]);
    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">Tambah Wilayah RW</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Wilayah RW</DialogTitle>
                        <DialogDescription>Masukkan nama rw berdasarkan kelurahan yang ingin ditambahkan.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email">Pilih Kelurahan</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Kelurahan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Kelurahan</SelectLabel>
                                        <SelectItem value="event">Event</SelectItem>
                                        <SelectItem value="kegiatan">Kegiatan</SelectItem>
                                        <SelectItem value="pengumuman">Pengumuman</SelectItem>
                                        <SelectItem value="peristiwa">Peristiwa</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">RW </Label>
                            <button type="button" onClick={tambahBaris} className="rounded bg-blue-600 px-4 py-2 text-white">
                                + Tambah Baris
                            </button>
                            {rows.map((row, index) => (
                                <Input
                                    key={index}
                                    type="text"
                                    value={row.nama}
                                    onChange={(e) => {
                                        const updated = [...rows];
                                        updated[index].nama = e.target.value;
                                        setRows(updated);
                                    }}
                                    placeholder={`Nama Wilayah ${index + 1}`}
                                    className="input mb-2"
                                />
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
