import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from './ui/input';
interface RWRow {
    nomer: string | '';
}
interface props {
    kelurahanId: number;
}
export function DialogWilayahRw({ kelurahanId }: props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm<{
        kelurahan_id: number;
        rows: RWRow[];
    }>({
        kelurahan_id: kelurahanId,
        rows: [{ nomer: '' }],
    });

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="mb-4 w-1/2">
                + Tambah RW
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Tambah RW</DialogTitle>
                        <DialogDescription>Masukkan nomer RW berdasarkan kelurahan</DialogDescription>
                    </DialogHeader>

                    {data.rows.map((row, index) => (
                        <div key={index} className="mb-2 flex items-center gap-2">
                            <Input
                                type="text"
                                placeholder={`RW ${index + 1}`}
                                value={row.nomer}
                                onChange={(e) => {
                                    const updated = [...data.rows];
                                    updated[index].nomer = e.target.value;
                                    setData('rows', updated);
                                }}
                            />
                            {errors[`rows.${index}.nomer`] && <p className="text-sm text-red-500">{errors[`rows.${index}.nomer`]}</p>}
                        </div>
                    ))}

                    <Button variant="outline" onClick={() => setData('rows', [...data.rows, { nomer: '' }])}>
                        + Tambah Baris
                    </Button>

                    <DialogFooter className="mt-4">
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() =>
                                post(route('simpanWilayah.data_rw'), {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        setData('rows', [{ nomer: '' }]);
                                        setIsOpen(false);
                                    },
                                })
                            }
                            disabled={processing}
                        >
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
