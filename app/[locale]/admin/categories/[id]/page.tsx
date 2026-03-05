'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, Space, Card, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getCategory, createCategory, updateCategory } from '@/lib/firebase/firestore';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES } from '@/lib/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const { TextArea } = Input;

export default function AdminCategoryEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const isNew = id === 'new';
  const [form] = Form.useForm();

  const { loading: dataLoading } = useAsyncData(async () => {
    if (isNew || !id) return null;
    const category = await getCategory(id);
    if (category) form.setFieldsValue(category);
    return category;
  }, { immediate: true });

  const { execute: saveCategory, loading: saving } = useAsyncData(async (values: any) => {
    if (isNew) {
      await createCategory(values);
      message.success('Genre identified');
    } else {
      await updateCategory(id, values);
      message.success('Genre redefined');
    }
    router.push(ROUTES.ADMIN.CATEGORIES);
  });

  if (dataLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="animate-reveal max-w-3xl">
      <div className="mb-12">
        <Button 
          type="text" 
          icon={<LeftOutlined />}
          onClick={() => router.back()}
          className="text-white/40 hover:text-white flex items-center gap-2 text-[10px] tracking-mega uppercase font-bold p-0"
        >
          Back to Taxonomy
        </Button>
      </div>

      <div className="mb-16 border-b border-white/10 pb-12">
        <h1 className="text-3xl font-bold tracking-mega uppercase mb-4">
          {isNew ? 'New Taxonomy' : 'Refine Genre'}
        </h1>
        <p className="text-white/40 text-[10px] tracking-mega uppercase font-light">Structure the thematic resonance of the inventory.</p>
      </div>

      <Card bordered={false} className="bg-white/[0.02] border border-white/[0.05]">
        <Form
          form={form}
          layout="vertical"
          onFinish={saveCategory}
          autoComplete="off"
          className="admin-form"
        >
          <Form.Item
            name="name"
            label="TAXONOMY IDENTITY"
            rules={[{ required: true, message: 'Identity required' }]}
          >
            <Input placeholder="E.g. CERAMICS / AVANT-GARDE" className="admin-input" />
          </Form.Item>

          <Form.Item
            name="description"
            label="CONCEPTUAL BRIEF"
          >
            <TextArea rows={6} placeholder="Define the essence of this genre..." className="admin-input pt-4" />
          </Form.Item>

          <Form.Item className="mt-12 mb-0">
            <Space size="large">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={saving}
                className="bg-white text-black hover:bg-white/90 border-none h-12 px-12 tracking-mega font-bold uppercase text-[11px]"
              >
                {isNew ? 'INITIALIZE' : 'COMMIT REFINEMENT'}
              </Button>
              <Button 
                onClick={() => router.back()}
                className="bg-transparent border-white/20 hover:text-white h-12 px-10 tracking-mega uppercase text-[11px] font-bold text-white/40"
              >
                ABANDON
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
