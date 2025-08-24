import { Link } from '@inertiajs/react';

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import logo from '../../../public/logo.png';
export default function ProfileDropdown() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 overflow-hidden rounded-full">
                    <img src={logo} alt="Profile" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom" align="end" className="z-50 w-64 rounded border border-gray-100 bg-white p-2 shadow-md">
                <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">Tegar Maulana</p>
                    <p className="text-xs text-gray-500">tegarmaulana@maulana</p>
                </div>
                <DropdownMenuSeparator className="my-2 h-px bg-gray-200" />

                <DropdownMenuItem asChild>
                    <Link href="/profile/edit" className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Edit profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/account/settings" className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Account settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/support" className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Support
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2 h-px bg-gray-200" />

                <DropdownMenuItem asChild>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="block w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-100"
                    >
                        Sign out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
