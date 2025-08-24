import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../components/ui/alert-dialog';
export function ConfirmDeleteDialog({ onConfirm, itemName, nameButton }: { onConfirm: () => void; itemName?: string; nameButton?: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">{nameButton}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Data <strong>{itemName}</strong> akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200">Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                        Ya, hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
