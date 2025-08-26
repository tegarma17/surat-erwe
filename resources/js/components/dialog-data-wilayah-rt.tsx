import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from './ui/input';

interface RTRow {
    nomer: string | '';
}
interface props {
    rwId: number;
}
export function DialogWilayahRt({ rwId }: props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm<{
        rw_id: number;
        rows: RTRow[];
    }>({
        rw_id: rwId,
        rows: [{ nomer: '' }],
    });
    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="mb-4 w-1/2">
                + Tambah RT
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Tambah RT</DialogTitle>
                        <DialogDescription>Masukkan nomer RT berdasarkan kelurahan</DialogDescription>
                    </DialogHeader>

                    {data.rows.map((row, index) => (
                        <div key={index} className="mb-2 flex items-center gap-2">
                            <Input
                                type="text"
                                placeholder={`RT ${index + 1}`}
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
                                post(route('simpanWilayah.data_rt'), {
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
