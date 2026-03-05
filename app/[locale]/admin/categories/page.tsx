'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getCategories, deleteCategory } from '@/lib/firebase/firestore';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES } from '@/lib/constants';

export default function AdminCategoriesPage() {
  const router = useRouter();

  const { 
    data: categories, 
    loading, 
    execute: reloadCategories 
  } = useAsyncData(getCategories, { immediate: true });

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      message.success('Success');
      reloadCategories();
    } catch {
      message.error('Failure');
    }
  };

  const columns = [
    {
      title: 'COLLECTION NAME',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="text-[11px] font-bold tracking-mega uppercase text-white/80">{name}</span>,
    },
    {
      title: 'BRIEF',
      dataIndex: 'description',
      key: 'description',
      render: (desc: string) => <span className="text-[10px] text-white/30 uppercase tracking-widest">{desc || '—'}</span>,
    },
    {
      title: 'ACTIONS',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="large">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => router.push(`${ROUTES.ADMIN.CATEGORIES}/${record.id}`)}
            className="text-white/40 hover:text-white p-0 text-[10px] uppercase font-bold tracking-widest"
          >
            Modify
          </Button>
          <Popconfirm
            title="Terminate this collection?"
            onConfirm={() => handleDelete(record.id)}
            okText="Destroy"
            cancelText="Retain"
            overlayClassName="admin-popconfirm"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
              className="p-0 text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100"
            >
              Purge
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="animate-reveal">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h1 className="text-2xl font-bold tracking-mega uppercase mb-2">分 类 管 理</h1>
          <p className="text-white/40 text-[10px] tracking-mega uppercase font-light">管理产品的目录结构与属性</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push(`${ROUTES.ADMIN.CATEGORIES}/new`)}
          className="admin-primary-btn"
        >
          INITIATE COLLECTION
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories || []}
        rowKey="id"
        loading={loading}
        pagination={{ 
          pageSize: 10,
          className: 'admin-pagination'
        }}
        className="admin-table"
      />
    </div>
  );
}


