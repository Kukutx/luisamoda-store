'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/user/Header';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { getOrder } from '@/lib/firebase/firestore';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { ROUTES, ORDER_STATUS } from '@/lib/constants';
import { useAsyncData } from '@/hooks/useAsyncData';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user, loading: authLoading } = useRequireAuth();

  const { 
    data: order, 
    loading: orderLoading, 
    execute: fetchOrder 
  } = useAsyncData(async (orderId: string) => {
    const data = await getOrder(orderId);
    if (data && data.userId !== user?.uid) {
      throw new Error('Unauthorized');
    }
    return data;
  });

  useEffect(() => {
    if (id && user) {
      fetchOrder(id);
    }
  }, [id, user, fetchOrder]);

  const getStatusDisplay = (status: Order['status']) => {
    const config = {
      [ORDER_STATUS.PENDING]: { text: 'PENDING', className: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
      [ORDER_STATUS.PROCESSING]: { text: 'PROCESSING', className: 'bg-blue-50 text-blue-600 border-blue-100' },
      [ORDER_STATUS.SHIPPED]: { text: 'SHIPPED', className: 'bg-purple-50 text-purple-600 border-purple-100' },
      [ORDER_STATUS.DELIVERED]: { text: 'DELIVERED', className: 'bg-neutral-100 text-neutral-500 border-neutral-200' },
      [ORDER_STATUS.CANCELLED]: { text: 'CANCELLED', className: 'bg-red-50 text-red-600 border-red-100' },
    };
    return config[status] || { text: status.toUpperCase(), className: 'bg-neutral-100' };
  };

  const loading = authLoading || orderLoading;

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-8 py-48">
          <EmptyState 
            title="ENTRY NOT FOUND"
            description="The requested order sequence does not exist or you do not have permission to view it."
            actionText="Back to Registry"
            actionHref={ROUTES.ORDERS}
          />
        </main>
      </div>
    );
  }

  const status = getStatusDisplay(order.status);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />

      <main className="container mx-auto px-8 md:px-12 pt-40 pb-32">
        <div className="mb-12 reveal">
          <button
            onClick={() => router.push(ROUTES.ORDERS)}
            className="text-foreground/30 hover:text-foreground transition-colors text-sm tracking-mega uppercase font-bold"
          >
            ← Back to History
          </button>
        </div>

        <div className="reveal reveal-delay-1 space-y-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 border-b border-black/5 pb-16">
            <div className="space-y-6">
              <h1 className="font-serif text-5xl md:text-7xl tracking-widest uppercase italic leading-none">Entry Record</h1>
              <div className="flex flex-col gap-2 mt-6">
                <p className="text-sm text-foreground/30 tracking-mega uppercase font-mono">SEQUENCE: {id.toUpperCase()}</p>
                <p className="text-sm text-foreground/20 tracking-mega uppercase">Documented on {formatDate(order.createdAt)}</p>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
               <span className={`px-8 py-3 border text-sm tracking-mega uppercase font-black ${status.className}`}>
                {status.text}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Pieces Information */}
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-sm text-foreground/40 tracking-mega uppercase font-bold border-b border-black/3 pb-6">Commissioned Pieces</h2>
              <div className="space-y-12">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-10 pb-12 border-b border-black/2 last:border-0 group">
                    <div className="relative w-24 h-32 shrink-0 bg-neutral-50 overflow-hidden border border-black/3">
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
                        Qty: {item.quantity} · Rate: {formatPrice(item.price)}
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

            {/* Total */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-10 bg-neutral-50/50 p-8 border border-black/3">
                <h2 className="text-sm text-foreground/40 tracking-mega uppercase font-bold border-b border-black/10 pb-4">Manifest Info</h2>
                <div className="space-y-6 text-sm text-foreground/60 tracking-widest leading-relaxed uppercase">
                  <p><span className="text-foreground/20 mr-4">RECIPIENT:</span> {order.shippingAddress.name}</p>
                  <p><span className="text-foreground/20 mr-4">PROTOCOL:</span> {order.shippingAddress.phone}</p>
                  <p><span className="text-foreground/20 mr-4">LOCATION:</span> {order.shippingAddress.address || 'N/A'}</p>
                  <p><span className="text-foreground/20 mr-4">REGISTRY:</span> {order.shippingAddress.city || 'N/A'} {order.shippingAddress.postalCode}</p>
                </div>
              </div>

              <div className="pt-8 space-y-6 px-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm tracking-mega uppercase text-foreground/40 font-bold">Total Valuation</span>
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
