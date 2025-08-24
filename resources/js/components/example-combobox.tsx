import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';

interface userDetail {
    id: number;
    nama: string;
    // Add other fields as needed
}
interface PageProps {
    userDetail: userDetail[];
}
export function ExampleCombobox({onChange} : {onChange?: (value: string) => void}) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const { userDetail } = usePage().props as unknown as PageProps;
    console.log(value);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                    {value ? userDetail.find((item) => item.id.toString() === value)?.nama : 'Pilih Warga ...'}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command className="w-full">
                    <CommandInput placeholder="Cari Nama Warga" />
                    <CommandList>
                        <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {userDetail.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.nama}
                                    onSelect={() => {
                                        setValue(item.id.toString());
                                        setOpen(false);
                                        if (onChange) {
                                            onChange(item.id.toString());
                                        }
                                    }}
                                >
                                    <CheckIcon className={cn('mr-2 h-4 w-4', value === item.id.toString() ? 'opacity-100' : 'opacity-0')} />
                                    {item.nama}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
