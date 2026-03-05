'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, USER_ROLES } from '@/lib/constants';

/**
 * A hook to enforce authentication on a page.
 * 
 * @param adminOnly Whether the page is restricted to admin users
 * @returns The authentication state from context
 */
export function useRequireAuth(adminOnly = false) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (adminOnly && userData && userData.role !== USER_ROLES.ADMIN) {
      router.push(ROUTES.HOME);
    }
  }, [user, userData, loading, router, adminOnly]);

  return { user, userData, loading };
}
