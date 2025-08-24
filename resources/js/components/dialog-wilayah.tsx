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

export function DialogWilayah({ nameButton }: { nameButton: string }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">{nameButton}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{nameButton}</DialogTitle>
                        <DialogDescription>Masukkan nama kelurahan yang ingin ditambahkan.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nama Kelurahan</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
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
