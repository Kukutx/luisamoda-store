'use client';

import { Table, Tag } from 'antd';
import { getUsers } from '@/lib/firebase/firestore';
import { formatDate } from '@/lib/utils';
import { useAsyncData } from '@/hooks/useAsyncData';

export default function AdminUsersPage() {
  const { data: users, loading } = useAsyncData(getUsers, { immediate: true });

  const columns = [
    {
      title: 'IDENTITY',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <span className="text-[11px] font-medium text-white/60 tracking-wide">{email}</span>,
    },
    {
      title: 'SIGNATURE',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (name: string) => <span className="text-[11px] text-white/40 italic">{name || 'UNSIGNED'}</span>,
    },
    {
      title: 'AUTHORITY',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag 
          className={`border-none px-3 py-0.5 text-[9px] font-black uppercase tracking-widest ${
            role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
          }`}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: 'ENROLLED',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: any) => <span className="text-[10px] text-white/20 uppercase tracking-widest">{formatDate(date)}</span>,
    },
  ];

  return (
    <div className="animate-reveal">
      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-mega uppercase mb-2">用 户 管 理</h1>
        <p className="text-white/40 text-[10px] tracking-mega uppercase font-light">管理所有注册用户及其权限级别</p>
      </div>

      <Table
        columns={columns}
        dataSource={users || []}
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


