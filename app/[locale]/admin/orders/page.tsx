'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import {
  Table,
  Button,
  Select,
  Tag,
  message,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { getOrders, updateOrder } from '@/lib/firebase/firestore';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES, ORDER_STATUS } from '@/lib/constants';

const STATUS_OPTIONS = [
  { value: ORDER_STATUS.PENDING,    label: 'PENDING' },
  { value: ORDER_STATUS.PROCESSING, label: 'PROCESSING' },
  { value: ORDER_STATUS.SHIPPED,    label: 'SHIPPED' },
  { value: ORDER_STATUS.DELIVERED,  label: 'DELIVERED' },
  { value: ORDER_STATUS.CANCELLED,  label: 'CANCELLED' },
];

export default function AdminOrdersPage() {
  const router = useRouter();

  const { 
    data: orders, 
    loading, 
    execute: loadOrders 
  } = useAsyncData(getOrders, { immediate: true });

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrder(orderId, { status });
      message.success('Status updated successfully');
      loadOrders();
    } catch {
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'SEQUENCE',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <span className="font-mono text-[10px] text-white/40">{id.slice(0, 8).toUpperCase()}</span>,
    },
    {
      title: 'CLIENT',
      dataIndex: 'userEmail',
      key: 'userEmail',
      render: (email: string) => <span className="text-[11px] font-medium text-white/60 tracking-wide">{email || '—'}</span>,
    },
    {
      title: 'PIECES',
      key: 'items',
      render: (_: unknown, record: Order) => (
        <div className="flex flex-col gap-1">
          {record.items.map((item) => (
            <span key={item.productId} className="text-[10px] text-white/30 uppercase tracking-widest leading-tight">
              {item.productName} <span className="text-white/10 italic">× {item.quantity}</span>
            </span>
          ))}
        </div>
      )
    },
    {
      title: 'VALUATION',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (v: number) => <span className="font-mono font-bold text-white tracking-tighter">{formatPrice(v)}</span>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: Order['status'], record: Order) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(record.id, val)}
          className="admin-select-status"
          style={{ width: 140 }}
          options={STATUS_OPTIONS}
          variant="borderless"
        />
      ),
    },
    {
      title: 'DOCUMENTED',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (d: Order['createdAt']) => <span className="text-[10px] text-white/20 uppercase tracking-widest">{formatDate(d)}</span>,
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_: unknown, record: Order) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => router.push({ pathname: '/admin/orders/[id]', params: { id: record.id } })}
          className="text-white/40 hover:text-white"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-reveal">
      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-mega uppercase mb-2">预 定 管 理</h1>
        <p className="text-white/40 text-[10px] tracking-mega uppercase font-light">管理所有客户预定，跟进联系状态</p>
      </div>

      <Table
        columns={columns}
        dataSource={orders || []}
        rowKey="id"
        loading={loading}
        pagination={{ 
          pageSize: 15,
          className: 'admin-pagination'
        }}
        rowClassName={(record) => record.status === ORDER_STATUS.PENDING ? 'bg-white/[0.03]' : ''}
        className="admin-table"
      />
    </div>
  );
}
