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
} from './ui/alert-dialog';
export function ConfirmUpdateDialog({
    onConfirm,
    itemName,
    nameButton,
    className,
    alertTitle,
    alertDescription,
}: {
    onConfirm: () => void;
    itemName?: string;
    nameButton?: string;
    className?: string;
    alertTitle?: string;
    alertDescription?: string;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default" className={className}>
                    {nameButton}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin mau {alertTitle} Pengurus?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Data pengurus <strong>{itemName}</strong> akan {alertDescription} secara permanen. Pengurus tidak akan bisa melakukan akses
                        kembali terhadap Kepengurusan surat menyurat.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200">Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                        Ya, Setuju
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
