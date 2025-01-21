import { type LucideIcon } from 'lucide-react';

export type SidebarNavItem = {
    title: string;
    icon?: LucideIcon;
    variant: 'default' | 'ghost';
    items?: { title: string; href: string }[];
};
