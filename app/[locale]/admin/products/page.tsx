'use client';

import { useRouter } from 'next/navigation';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Image,
  Tag,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getProducts, deleteProduct } from '@/lib/firebase/firestore';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES } from '@/lib/constants';

export default function AdminProductsPage() {
  const router = useRouter();

  const { 
    data: products, 
    loading, 
    execute: loadProducts 
  } = useAsyncData(getProducts, { immediate: true });

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('删除成功');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: '图片',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 100,
      render: (url: string) => (
        <Image 
          src={url} 
          alt="product" 
          width={60} 
          height={80} 
          className="object-cover rounded border border-white/10" 
        />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="font-serif italic tracking-wide">{name}</span>
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span className="font-mono">{formatPrice(price)}</span>,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => <span className="font-mono">{stock}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'black' : 'default'} className="tracking-widest uppercase text-[9px]">
          {status === 'active' ? 'Active' : 'Archived'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => router.push(`${ROUTES.ADMIN.PRODUCTS}/${record.id}`)}
            className="text-white/60 hover:text-white"
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个商品吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
            overlayClassName="admin-popconfirm"
          >
            <Button type="link" danger icon={<DeleteOutlined />} className="opacity-60 hover:opacity-100">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="animate-reveal">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-2xl font-bold tracking-mega uppercase mb-2">商品管理</h1>
          <p className="text-white/40 text-[10px] tracking-mega uppercase font-light">管理您的珍藏系列与库存</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push(`${ROUTES.ADMIN.PRODUCTS}/new`)}
          className="bg-white text-black hover:bg-white/90 border-none h-10 px-8 tracking-mega font-bold uppercase text-[10px]"
        >
          添加商品
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={products || []}
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


