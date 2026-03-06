'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/user/Header';
import PageHeader from '@/components/ui/PageHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { getOrders } from '@/lib/firebase/firestore';
import { formatPrice, formatDate } from '@/lib/utils';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES, ORDER_STATUS } from '@/lib/constants';
import { Order } from '@/types';

const STATUS_KEYS: Record<string, string> = {
  [ORDER_STATUS.PENDING]: 'statusPending',
  [ORDER_STATUS.PROCESSING]: 'statusProcessing',
  [ORDER_STATUS.SHIPPED]: 'statusShipped',
  [ORDER_STATUS.DELIVERED]: 'statusDelivered',
  [ORDER_STATUS.CANCELLED]: 'statusCancelled',
};

export default function OrdersPage() {
  const t = useTranslations('Orders');
  const { user, loading: authLoading } = useRequireAuth();

  const {
    data: orders,
    loading: ordersLoading,
    execute: fetchOrders,
  } = useAsyncData(async () => {
    if (!user) return [];
    return getOrders(user.uid);
  });

  useEffect(() => {
    if (user) fetchOrders();
  }, [user, fetchOrders]);

  const getStatusDisplay = (status: Order['status']) => {
    const statusKey = STATUS_KEYS[status] ?? 'statusPending';
    const config: Record<string, string> = {
      [ORDER_STATUS.PENDING]: 'text-yellow-600',
      [ORDER_STATUS.PROCESSING]: 'text-blue-600',
      [ORDER_STATUS.SHIPPED]: 'text-purple-600',
      [ORDER_STATUS.DELIVERED]: 'text-neutral-400',
      [ORDER_STATUS.CANCELLED]: 'text-red-400',
    };
    return {
      text: t(statusKey),
      className: config[status] ?? 'text-foreground',
    };
  };

  const loading = authLoading || ordersLoading;

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />
      <main className="container mx-auto px-6 md:px-10 pt-28 pb-20">
        <PageHeader step={t('pageStep')} title={t('pageTitle')} />

        {!orders || orders.length === 0 ? (
          <EmptyState
            title={t('emptyTitle')}
            description={t('emptyDescription')}
            actionText={t('emptyAction')}
            actionHref={ROUTES.HOME}
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 reveal reveal-delay-1">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={{ pathname: '/orders/[id]', params: { id: order.id } }}
                className="group block bg-neutral-50/30 border border-black/5 hover:border-black/10 p-8 md:p-12 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <span
                        className={`text-sm tracking-mega font-black uppercase ${getStatusDisplay(order.status).className}`}
                      >
                        {getStatusDisplay(order.status).text}
                      </span>
                      <span className="text-foreground/20 text-sm tracking-mega uppercase font-mono">
                        {order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                    <p className="font-serif text-3xl md:text-5xl tracking-widest uppercase italic text-foreground group-hover:opacity-70 transition-opacity">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-4">
                    <p className="text-sm text-foreground/30 tracking-mega uppercase font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                    <div className="h-px w-12 bg-black/10 group-hover:w-24 transition-all duration-500" />
                    <span className="text-sm text-foreground/40 tracking-ultra uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('viewDetails')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
