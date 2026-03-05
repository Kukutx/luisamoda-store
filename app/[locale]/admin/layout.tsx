'use client';

import { useRouter, usePathname, Link } from '@/i18n/routing';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { logoutUser } from '@/lib/firebase/auth';
import { ROUTES } from '@/lib/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import '@/app/globals.css';

const { Header: AntHeader, Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useRequireAuth(true); // Require admin role
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutUser();
    router.push(ROUTES.HOME);
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return null; // Redirect handled by useRequireAuth

  const menuItems = [
    {
      key: ROUTES.ADMIN.ROOT,
      icon: <DashboardOutlined />,
      label: <Link href={ROUTES.ADMIN.ROOT} className="tracking-widest">DASHBOARD</Link>,
    },
    {
      key: ROUTES.ADMIN.PRODUCTS,
      icon: <ShoppingOutlined />,
      label: <Link href={ROUTES.ADMIN.PRODUCTS} className="tracking-widest">PRODUCTS</Link>,
    },
    {
      key: ROUTES.ADMIN.ORDERS,
      icon: <FileTextOutlined />,
      label: <Link href={ROUTES.ADMIN.ORDERS} className="tracking-widest">RESERVATIONS</Link>,
    },
    {
      key: ROUTES.ADMIN.CATEGORIES,
      icon: <AppstoreOutlined />,
      label: <Link href={ROUTES.ADMIN.CATEGORIES} className="tracking-widest">CATEGORIES</Link>,
    },
    {
      key: ROUTES.ADMIN.USERS,
      icon: <UserOutlined />,
      label: <Link href={ROUTES.ADMIN.USERS} className="tracking-widest">USERS</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ffffff',
          colorBgBase: '#050505',
          colorBorder: '#262626',
          fontFamily: 'Inter, system-ui, sans-serif',
          borderRadius: 0,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#050505' }}>
        <Sider width={240} theme="dark" style={{ background: '#0a0a0a', borderRight: '1px solid #1a1a1a' }}>
          <div className="p-8 pb-10">
             <Link href={ROUTES.HOME} className="font-serif text-lg tracking-ultra uppercase text-white block">
               LUISA <span className="opacity-40 italic">MODA</span>
             </Link>
          </div>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[pathname || ROUTES.ADMIN.ROOT]}
            items={menuItems}
            style={{ borderRight: 0, background: 'transparent' }}
          />
        </Sider>
        <Layout style={{ background: '#050505' }}>
          <AntHeader style={{ background: '#050505', borderBottom: '1px solid #1a1a1a', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="text-xs tracking-mega uppercase font-bold text-white/60">Management Console</h1>
            <div className="flex items-center gap-8">
              <span className="text-[10px] text-white/30 tracking-widest">{user.email}</span>
              <button 
                onClick={handleLogout}
                className="text-[10px] text-white/40 hover:text-white tracking-widest uppercase transition-colors"
              >
                Logout
              </button>
              <Link href={ROUTES.HOME} className="text-[10px] text-white border border-white/20 px-4 py-1.5 hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                Front Store
              </Link>
            </div>
          </AntHeader>
          <Content style={{ margin: '32px', padding: '32px', background: '#0a0a0a', border: '1px solid #1a1a1a', minHeight: 280 }}>
            <div className="text-white">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
