'use client';

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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

export default function OrdersPage() {
  const { user, loading: authLoading } = useRequireAuth();
  
  const { 
    data: orders, 
    loading: ordersLoading, 
    execute: fetchOrders 
  } = useAsyncData(async () => {
    if (!user) return [];
    return getOrders(user.uid);
  });

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  const getStatusDisplay = (status: Order['status']) => {
    const config = {
      [ORDER_STATUS.PENDING]: { text: 'PENDING', className: 'text-yellow-600' },
      [ORDER_STATUS.PROCESSING]: { text: 'PROCESSING', className: 'text-blue-600' },
      [ORDER_STATUS.SHIPPED]: { text: 'SHIPPED', className: 'text-purple-600' },
      [ORDER_STATUS.DELIVERED]: { text: 'DELIVERED', className: 'text-neutral-400' },
      [ORDER_STATUS.CANCELLED]: { text: 'CANCELLED', className: 'text-red-400' },
    };
    return config[status] || { text: status.toUpperCase(), className: 'text-foreground' };
  };

  const loading = authLoading || ordersLoading;

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />
      <main className="container mx-auto px-8 md:px-12 pt-40 pb-32">
        <PageHeader 
          step="Member Section"
          title="History"
        />

        {!orders || orders.length === 0 ? (
          <EmptyState 
            title="NO COMMISSIONED PIECES"
            description="Your acquisition history is currently void. Explore our collection to begin your narrative."
            actionText="Browse Collection"
            actionHref={ROUTES.HOME}
          />
        ) : (
          <div className="grid grid-cols-1 gap-12 reveal reveal-delay-1">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`${ROUTES.ORDERS}/${order.id}`}
                className="group block bg-neutral-50/30 border border-black/[0.03] hover:border-black/10 p-10 md:p-16 transition-all duration-700"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                       <span className={`text-[9px] tracking-mega font-black uppercase ${getStatusDisplay(order.status).className}`}>
                        {getStatusDisplay(order.status).text}
                      </span>
                      <span className="text-foreground/10 text-[9px] tracking-mega uppercase font-mono">
                        {order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <p className="font-serif text-3xl md:text-5xl tracking-widest uppercase italic text-foreground group-hover:opacity-40 transition-opacity">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-4">
                    <p className="text-[10px] text-foreground/20 tracking-mega uppercase font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                    <div className="h-px w-12 bg-black/10 group-hover:w-24 transition-all duration-700" />
                    <span className="text-[9px] text-foreground/40 tracking-ultra uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
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
