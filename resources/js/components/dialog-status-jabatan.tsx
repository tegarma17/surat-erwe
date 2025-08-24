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
import { useState } from 'react';

type Props = {
    value: string;
    onChange: (val: string) => void;
    onClick: () => void;
    onClose: () => void;
};

export function DialogStatusJabatan({ value, onChange, onClick, onClose }: Props) {
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        // Kirim status yang dipilih
        console.log('Status baru:', value); // ✅ Ini akan cetak "aktif" atau "nonaktif"
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={onClick} variant="outline">
                    Ubah Status
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Ubah Status</DialogTitle>
                    <DialogDescription>Menonaktifkan Status Jabatan </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Select value={value} onValueChange={onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Edit Status Jabatan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="aktif">Aktif</SelectItem>
                                    <SelectItem value="nonaktif">NonAktif</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSave}>
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
