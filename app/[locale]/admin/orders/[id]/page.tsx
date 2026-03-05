'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, Descriptions, Tag, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import NextImage from 'next/image';
import { getOrder } from '@/lib/firebase/firestore';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES, ORDER_STATUS } from '@/lib/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: order, loading } = useAsyncData(async () => {
    if (!id) return null;
    return getOrder(id);
  }, { immediate: true });

  const getStatusDisplay = (status: string) => {
    const config = {
      [ORDER_STATUS.PENDING]: { text: 'PENDING', color: 'orange' },
      [ORDER_STATUS.PROCESSING]: { text: 'PROCESSING', color: 'blue' },
      [ORDER_STATUS.SHIPPED]: { text: 'SHIPPED', color: 'purple' },
      [ORDER_STATUS.DELIVERED]: { text: 'DELIVERED', color: 'green' },
      [ORDER_STATUS.CANCELLED]: { text: 'CANCELLED', color: 'default' },
    };
    return config[status as keyof typeof config] || { text: status.toUpperCase(), color: 'default' };
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (!order) return <div className="p-12 text-white/20 uppercase tracking-widest text-xs">Reservation sequence not found</div>;

  const status = getStatusDisplay(order.status);

  return (
    <div className="animate-reveal max-w-5xl">
      <div className="mb-12">
        <button 
          onClick={() => router.back()}
          className="text-white/40 hover:text-white flex items-center gap-2 text-[10px] tracking-mega uppercase font-bold p-0 transition-colors"
        >
          <LeftOutlined /> Back to Registry
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-mega uppercase mb-4">Entry Manifest</h1>
          <p className="text-white/40 text-[10px] tracking-mega uppercase font-mono">Sequence: {id.toUpperCase()}</p>
        </div>
        <Tag color={status.color} className="h-fit px-6 py-1 tracking-widest uppercase text-[10px] font-black m-0 border-none bg-white/5 text-white">
          {status.text}
        </Tag>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <Card bordered={false} className="bg-white/2 border border-white/5" title={<span className="text-[10px] tracking-mega uppercase text-white/30 font-bold">Client Assessment</span>}>
            <Descriptions column={2} className="admin-descriptions">
              <Descriptions.Item label="Identity">{order.userEmail || 'Guest'}</Descriptions.Item>
              <Descriptions.Item label="Timestamp">{formatDate(order.createdAt)}</Descriptions.Item>
              <Descriptions.Item label="Method">{order.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="Valuation">
                <span className="text-lg font-black tracking-tighter">{formatPrice(order.totalAmount)}</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card bordered={false} className="bg-white/2 border border-white/5" title={<span className="text-[10px] tracking-mega uppercase text-white/30 font-bold">Commissioned Items</span>}>
            <div className="space-y-8">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-8 pb-8 border-b border-white/5 last:border-0 last:pb-0 group">
                  <div className="relative w-24 h-32 bg-black border border-white/10 overflow-hidden">
                    <NextImage 
                      src={item.productImage} 
                      alt={item.productName} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    <h3 className="font-serif italic text-xl tracking-wide">{item.productName}</h3>
                    <p className="text-[10px] text-white/30 tracking-widest uppercase">
                      Quantity: {item.quantity} · Rate: {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg tracking-tighter">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card bordered={false} className="bg-white/2 border border-white/5" title={<span className="text-[10px] tracking-mega uppercase text-white/30 font-bold">Fulfillment Destination</span>}>
            <div className="px-6 py-4 space-y-4">
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Recipient</p>
                <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{order.shippingAddress.name}</p>
              </div>
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Protocol / Phone</p>
                <p className="text-white/80 text-xs font-mono">{order.shippingAddress.phone}</p>
              </div>
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Location</p>
                <p className="text-white/80 text-xs leading-relaxed uppercase tracking-wider">{order.shippingAddress.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Registry / City</p>
                <p className="text-white/80 text-xs uppercase tracking-wider">{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
