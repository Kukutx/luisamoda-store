'use client';

import { Statistic, Row, Col, Card } from 'antd';
import { ShoppingOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { getProducts, getOrders, getUsers } from '@/lib/firebase/firestore';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ORDER_STATUS } from '@/lib/constants';

export default function AdminDashboard() {
  const { data: stats, loading } = useAsyncData(async () => {
    const [products, orders, users] = await Promise.all([
      getProducts(),
      getOrders(),
      getUsers(),
    ]);

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalUsers: users.length,
      pendingOrders: orders.filter((o) => o.status === ORDER_STATUS.PENDING).length
    };
  });

  return (
    <div className="animate-reveal">
      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-mega uppercase mb-2">仪 表 盘</h1>
        <p className="text-white/40 text-[10px] tracking-mega uppercase font-light">欢迎回来，以下是店铺概览</p>
      </div>

      {stats && stats.pendingOrders > 0 && (
        <div className="mb-12 p-6 bg-white/[0.03] border border-white/10 flex items-center gap-4 reveal">
          <span className="text-xl">📋</span>
          <p className="text-white/60 text-xs tracking-mega uppercase font-light leading-relaxed">
            您有 <span className="text-white font-bold">{stats.pendingOrders}</span> 笔预定待联系处理，请尽快跟进。
          </p>
        </div>
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-white/[0.02] border border-white/[0.05]">
            <Statistic
              title={<span className="text-[10px] tracking-mega uppercase text-white/30">商品总数</span>}
              value={stats?.totalProducts || 0}
              prefix={<ShoppingOutlined className="text-white/20" />}
              loading={loading}
              valueStyle={{ color: '#fff', fontWeight: 900, letterSpacing: '-0.05em' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-white/[0.02] border border-white/[0.05]">
            <Statistic
              title={<span className="text-[10px] tracking-mega uppercase text-white/30">预定总数</span>}
              value={stats?.totalOrders || 0}
              prefix={<FileTextOutlined className="text-white/20" />}
              loading={loading}
              valueStyle={{ 
                color: stats && stats.pendingOrders > 0 ? '#fbbf24' : '#fff', 
                fontWeight: 900, 
                letterSpacing: '-0.05em' 
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-white/[0.02] border border-white/[0.05]">
            <Statistic
              title={<span className="text-[10px] tracking-mega uppercase text-white/30">注册用户</span>}
              value={stats?.totalUsers || 0}
              prefix={<UserOutlined className="text-white/20" />}
              loading={loading}
              valueStyle={{ color: '#fff', fontWeight: 900, letterSpacing: '-0.05em' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
