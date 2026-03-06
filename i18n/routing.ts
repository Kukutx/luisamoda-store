import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['zh', 'en', 'it'],
  defaultLocale: 'zh',
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/register': '/register',
    '/cart': {
      zh: '/cart',
      en: '/cart',
      it: '/carrello',
    },
    '/checkout': '/checkout',
    '/orders': '/orders',
    '/orders/[id]': '/orders/[id]',
    '/profile': '/profile',
    '/services/sewing': '/services/sewing',
    '/services/3d': '/services/3d',
    '/admin': '/admin',
    '/admin/products': '/admin/products',
    '/admin/orders': '/admin/orders',
    '/admin/orders/[id]': '/admin/orders/[id]',
    '/admin/categories': '/admin/categories',
    '/admin/users': '/admin/users',
    '/products/[id]': '/products/[id]',
  },
});

/** Locale type derived from routing config */
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
