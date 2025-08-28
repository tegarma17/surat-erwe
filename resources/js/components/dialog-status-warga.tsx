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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Warga {
    id: number;
    is_aktif: string;
}

export function DialogStatusWarga({ nameButton, warga }: { nameButton: string; warga: Warga }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const { data, setData, put, processing } = useForm<Warga>({
        id: warga.id,
        is_aktif: warga.is_aktif,
    });

    const handleSimpan = () => {
        put(route('wargaStatus.update', data.id), {
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
                    <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Select value={data.is_aktif} onValueChange={(val) => setData('is_aktif', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Edit Status Jabatan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="pindah">Pindah</SelectItem>
                                        <SelectItem value="meninggal">Meninggal</SelectItem>
                                        <SelectItem value="tetap">Tetap</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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
