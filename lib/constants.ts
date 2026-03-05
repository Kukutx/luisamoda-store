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
  PROFILE: '/profile',
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
// Contact info
// ---------------------------------------------------------------------------
export const CONTACT = {
  WECHAT: 'luisa_store_official',
  WHATSAPP: 'https://wa.me/+8613800000000',
} as const;
