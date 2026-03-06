/**
 * Application-wide constants.
 *
 * All magic strings, paths, and configuration values should be defined here.
 * Import from this file instead of hardcoding values in components.
 */

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  PROFILE: '/profile',
  SERVICES: {
    SEWING: '/services/sewing',
    PRINT3D: '/services/3d',
  },
  ADMIN: {
    ROOT: '/admin',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    CATEGORIES: '/admin/categories',
    USERS: '/admin/users',
  },
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
} as const;

// ---------------------------------------------------------------------------
// User roles
// ---------------------------------------------------------------------------
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// ---------------------------------------------------------------------------
// Order statuses
// ---------------------------------------------------------------------------
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

// ---------------------------------------------------------------------------
// Product statuses
// ---------------------------------------------------------------------------
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

// ---------------------------------------------------------------------------
// Firestore collection names
// ---------------------------------------------------------------------------
export const COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  USERS: 'users',
} as const;

// ---------------------------------------------------------------------------
// Local-storage keys
// ---------------------------------------------------------------------------
export const STORAGE_KEYS = {
  CART: 'luisa_cart',
} as const;

// ---------------------------------------------------------------------------
// Home section images (三大板块配图，可替换为自有图片 URL)
// ---------------------------------------------------------------------------
export const HOME_SECTION_IMAGES = {
  PRODUCTS:
    'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800',
  SEWING:
    'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800',
  PRINT3D:
    'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
} as const;

// ---------------------------------------------------------------------------
// Contact info
// ---------------------------------------------------------------------------
export const CONTACT = {
  WECHAT: 'luisa_store_official',
  WHATSAPP: 'https://wa.me/+8613800000000',
} as const;

// ---------------------------------------------------------------------------
// Site URL for SEO (openGraph, canonical). Set NEXT_PUBLIC_SITE_URL in .env
// ---------------------------------------------------------------------------
export const SITE_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
  'https://luisa-moda.example.com';
