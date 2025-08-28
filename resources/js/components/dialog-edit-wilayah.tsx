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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Kelurahan {
    id: number;
    nama: string;
}

export function DialogEditWilayah({ nameButton, kelurahan }: { nameButton: string; kelurahan: Kelurahan }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const { data, setData, put, processing } = useForm<Kelurahan>({
        id: kelurahan.id,
        nama: kelurahan.nama,
    });

    const handleSimpan = () => {
        put(route('updateKelurahan.save', data.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default" onClick={openModal}>
                        {nameButton}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{nameButton}</DialogTitle>
                        <DialogDescription>Ubah nama kelurahan yang ingin dirubah.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nama Kelurahan</Label>
                            <Input value={data.nama} onChange={(e) => setData('nama', e.target.value)} name="nama" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing} onClick={handleSimpan}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
