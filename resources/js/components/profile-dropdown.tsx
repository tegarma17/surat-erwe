import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, usePage } from '@inertiajs/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import logo from '../../../public/logo.png';

interface SharedData {
    auth: {
        user: {
            email: string;
            user_detail: {
                nama: string;
                foto: string;
            };
        };
    };
    [key: string]: unknown;
}

export default function ProfileDropdown() {
    const { auth } = usePage<SharedData>().props;

    // const { state } = useSidebar();
    // const isMobile = useIsMobile();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 overflow-hidden rounded-full">
                    <img src={auth.user.user_detail?.foto ?? logo} alt="Profile" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom" align="end" className="z-50 w-64 rounded border border-gray-100 bg-white p-2 shadow-md">
                <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{auth.user.user_detail?.nama ?? 'Guest'}</p>
                    <p className="text-xs text-gray-500">{auth.user.email}</p>
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
