import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { MapPin, Newspaper, SquarePen, StickyNote, User, UserCog, Users } from 'lucide-react';

import AppLogo from './app-logo';

const mainNavItemsMaster: NavItem[] = [
    { title: 'Data User', href: '/user-account', icon: UserCog },
    { title: 'Data Wilayah', href: '/set-wilayah', icon: MapPin },
    { title: 'Data Warga', href: '/warga', icon: Users },
    { title: 'Data Pengurus', href: '/pengurus', icon: User },
];
const mainNavItemsBerita: NavItem[] = [{ title: 'Data Berita', href: '/berita', icon: Newspaper }];
const mainNavItemsSurat: NavItem[] = [
    { title: 'Data Surat', href: '/data-surat', icon: StickyNote },
    { title: 'Validasi Surat', href: '/validasi-data-surat', icon: SquarePen },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItemsMaster} title="Data Master" />
                <NavMain items={mainNavItemsBerita} title="Data Berita" />
                <NavMain items={mainNavItemsSurat} title="Data Surat" />
            </SidebarContent>
        </Sidebar>
    );
}
