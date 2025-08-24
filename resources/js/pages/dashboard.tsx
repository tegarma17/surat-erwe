import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BoxIcon, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
interface User {
    id: number;
    name: string;
    email: string;
    role?: string; // kalau kamu pakai role
}

export default function Dashboard() {
    const { user } = usePage<{ user: User }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Selamat Datang, {user.name}</h1>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md md:p-6 dark:border-gray-300 dark:bg-white/[0.03]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-empat">
                            <Users className="size-6 text-gray-800 dark:text-white/90" />
                        </div>

                        <div className="mt-5 flex items-end justify-between">
                            <div>
                                <span className="text-sm text-gray-500 dark:text-empat">Jumlah Warga</span>
                                <h4 className="text-title-sm dark:empat/90 mt-2 font-bold text-gray-800">3,782</h4>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md md:p-6 dark:border-gray-300 dark:bg-white/[0.03]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-empat">
                            <BoxIcon className="size-6 text-gray-800 dark:text-white/90" />
                        </div>

                        <div className="mt-5 flex items-end justify-between">
                            <div>
                                <span className="text-sm text-gray-500 dark:text-empat">Jumlah Pembuatan Surat</span>
                                <h4 className="text-title-sm dark:empat/90 mt-2 font-bold text-gray-800">3,782</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20" />
                </div>
            </div>
        </AppLayout>
    );
}
