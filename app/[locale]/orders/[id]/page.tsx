'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/user/Header';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { getOrder } from '@/lib/firebase/firestore';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { ROUTES, ORDER_STATUS } from '@/lib/constants';
import { useAsyncData } from '@/hooks/useAsyncData';

const ORDER_STATUS_KEY: Record<string, string> = {
  [ORDER_STATUS.PENDING]: 'statusPending',
  [ORDER_STATUS.PROCESSING]: 'statusProcessing',
  [ORDER_STATUS.SHIPPED]: 'statusShipped',
  [ORDER_STATUS.DELIVERED]: 'statusDelivered',
  [ORDER_STATUS.CANCELLED]: 'statusCancelled',
};

const STATUS_CLASS: Record<string, string> = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  [ORDER_STATUS.PROCESSING]: 'bg-blue-50 text-blue-600 border-blue-100',
  [ORDER_STATUS.SHIPPED]: 'bg-purple-50 text-purple-600 border-purple-100',
  [ORDER_STATUS.DELIVERED]: 'bg-neutral-100 text-neutral-500 border-neutral-200',
  [ORDER_STATUS.CANCELLED]: 'bg-red-50 text-red-600 border-red-100',
};

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const t = useTranslations('OrderDetail');
  const tOrders = useTranslations('Orders');
  const { user, loading: authLoading } = useRequireAuth();

  const {
    data: order,
    loading: orderLoading,
    execute: fetchOrder,
  } = useAsyncData(async (orderId: string) => {
    const data = await getOrder(orderId);
    if (data && data.userId !== user?.uid) throw new Error('Unauthorized');
    return data;
  });

  useEffect(() => {
    if (id && user) fetchOrder(id);
  }, [id, user, fetchOrder]);

  const loading = authLoading || orderLoading;

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
        <Header />
        <main className="container mx-auto px-6 py-24">
          <EmptyState
            title={t('notFoundTitle')}
            description={t('notFoundDescription')}
            actionText={t('notFoundAction')}
            actionHref={ROUTES.ORDERS}
          />
        </main>
      </div>
    );
  }

  const statusKey = ORDER_STATUS_KEY[order.status] ?? 'statusPending';
  const statusText = tOrders(statusKey);
  const statusClassName = STATUS_CLASS[order.status] ?? 'bg-neutral-100';

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />

      <main className="container mx-auto px-6 md:px-10 pt-28 pb-20">
        <div className="mb-12 reveal">
          <Link
            href={ROUTES.ORDERS}
            className="text-foreground/30 hover:text-foreground transition-colors text-sm tracking-mega uppercase font-bold"
          >
            ← {t('backToOrders')}
          </Link>
        </div>

        <div className="reveal reveal-delay-1 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 border-b border-black/5 pb-16">
            <div className="space-y-6">
              <h1 className="font-serif text-5xl md:text-7xl tracking-widest uppercase italic leading-none">
                {t('title')}
              </h1>
              <div className="flex flex-col gap-2 mt-6">
                <p className="text-sm text-foreground/30 tracking-mega uppercase font-mono">
                  {t('sequence')}: {id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-sm text-foreground/20 tracking-mega uppercase">
                  {t('documentedAt')} {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <span className={`px-8 py-3 border text-sm tracking-mega uppercase font-black ${statusClassName}`}>
                {statusText}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-sm text-foreground/40 tracking-mega uppercase font-bold border-b border-black/5 pb-6">
                {t('itemsHeading')}
              </h2>
              <div className="space-y-12">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.productId}-${index}`}
                    className="flex gap-10 pb-12 border-b border-black/5 last:border-0 group"
                  >
                    <div className="relative w-24 h-32 shrink-0 bg-neutral-50 overflow-hidden border border-black/5">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover opacity-90 transition-all group-hover:opacity-100 group-hover:scale-105"
                        sizes="100px"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-4">
                      <h3 className="font-serif text-2xl tracking-wide text-foreground italic">{item.productName}</h3>
                      <p className="text-sm text-foreground/30 tracking-widest uppercase">
                        <span className="text-foreground/20">{t('itemQtyPrice')}</span> {item.quantity} · {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-right flex items-center">
                      <p className="font-bold text-lg text-foreground tracking-tighter">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-10 bg-neutral-50/50 p-8 border border-black/5">
                <h2 className="text-sm text-foreground/40 tracking-mega uppercase font-bold border-b border-black/10 pb-4">
                  {t('recipient')} / {t('contact')}
                </h2>
                <div className="space-y-6 text-sm text-foreground/60 tracking-widest leading-relaxed uppercase">
                  <p>
                    <span className="text-foreground/20 mr-4">{t('recipient')}:</span>{' '}
                    {order.shippingAddress.name}
                  </p>
                  <p>
                    <span className="text-foreground/20 mr-4">{t('contact')}:</span>{' '}
                    {order.shippingAddress.phone}
                  </p>
                  <p>
                    <span className="text-foreground/20 mr-4">{t('address')}:</span>{' '}
                    {order.shippingAddress.address || '—'}
                  </p>
                  {order.shippingAddress.city || order.shippingAddress.postalCode ? (
                    <p>
                      {order.shippingAddress.city} {order.shippingAddress.postalCode}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="pt-8 space-y-6 px-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm tracking-mega uppercase text-foreground/40 font-bold">{t('total')}</span>
                  <span className="text-4xl font-black tracking-tighter text-foreground">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
