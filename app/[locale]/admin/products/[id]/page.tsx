'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  message,
  Card,
  Space,
} from 'antd';
import { UploadOutlined, LeftOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { getProduct, createProduct, updateProduct, getCategories } from '@/lib/firebase/firestore';
import { uploadImage } from '@/lib/firebase/storage';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ROUTES } from '@/lib/constants';
import { type ProductFormData } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const { TextArea } = Input;

export default function AdminProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const isNew = id === 'new';
  const [form] = Form.useForm();
  
  const { data: categories } = useAsyncData(getCategories, { immediate: true });
  
  const { loading: saving, execute: saveProduct } = useAsyncData(async (values: ProductFormData) => {
    const productData = {
      ...values,
      status: values.status || 'active',
    };

    if (isNew) {
      await createProduct(productData);
      message.success('Commission initialized');
    } else {
      await updateProduct(id, productData);
      message.success('Piece synchronized');
    }
    router.push(ROUTES.ADMIN.PRODUCTS);
  });

  const { loading: productLoading } = useAsyncData(async () => {
    if (isNew || !id) return null;
    const product = await getProduct(id);
    if (product) {
      form.setFieldsValue(product);
    }
    return product;
  }, { immediate: true });

  const handleImageUpload = async (file: File) => {
    try {
      const path = `products/${Date.now()}_${file.name}`;
      const url = await uploadImage(file, path);
      form.setFieldValue('imageUrl', url);
      message.success('Visual asset documented');
      return false; 
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to capture visual asset');
      return false;
    }
  };

  const imageUrl = Form.useWatch('imageUrl', form);

  if (productLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="animate-reveal max-w-4xl">
      <div className="mb-12 flex items-center justify-between">
        <Button 
          type="text" 
          icon={<LeftOutlined />}
          onClick={() => router.back()}
          className="text-white/40 hover:text-white flex items-center gap-2 text-[10px] tracking-mega uppercase font-bold p-0"
        >
          Back to Registry
        </Button>
      </div>

      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-mega uppercase mb-2">
          {isNew ? 'New Entry' : 'Refine Piece'}
        </h1>
        <p className="text-white/40 text-[10px] tracking-mega uppercase font-light">
          {isNew ? 'Register a new masterpiece to the repository' : `Modifying sequence: ${id}`}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={saveProduct}
        initialValues={{ status: 'active', stock: 0 }}
        requiredMark={false}
        className="admin-form"
      >
        <Card bordered={false} className="bg-white/2 border border-white/5 mb-8">
          <Form.Item
            name="name"
            label="OBJECT NOMENCLATURE"
            rules={[{ required: true, message: 'Identity missing' }]}
          >
            <Input placeholder="Enter object name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="CONCEPTUAL NARRATIVE"
            rules={[{ required: true, message: 'Description missing' }]}
          >
            <TextArea rows={6} placeholder="Describe the artistic merit and technical specifications" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="DESIGNATED COLLECTION"
            rules={[{ required: true, message: 'Collection missing' }]}
          >
            <Select placeholder="Select collection">
              {categories?.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card bordered={false} className="bg-white/2 border border-white/5">
            <Form.Item
              name="price"
              label="MARKET VALUATION"
              rules={[{ required: true, message: 'Price unknown' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                placeholder="Rate"
                className="w-full"
              />
            </Form.Item>

            <Form.Item name="originalPrice" label="BASE VALUATION (OPTIONAL)">
              <InputNumber
                min={0}
                step={0.01}
                placeholder="Previous"
                className="w-full"
              />
            </Form.Item>
          </Card>

          <Card bordered={false} className="bg-white/2 border border-white/5">
            <Form.Item
              name="stock"
              label="AVAILABILITY COUNT"
              rules={[{ required: true, message: 'Quantity unknown' }]}
            >
              <InputNumber
                min={0}
                placeholder="Units"
                className="w-full"
              />
            </Form.Item>

            <Form.Item name="status" label="EXHIBITION STATE">
              <Select>
                <Select.Option value="active">Active Exhibition</Select.Option>
                <Select.Option value="inactive">Archived Piece</Select.Option>
              </Select>
            </Form.Item>
          </Card>
        </div>

        <Card bordered={false} className="bg-white/2 border border-white/5 mb-12">
          <Form.Item
            name="imageUrl"
            label="VISUAL ASSET"
            rules={[{ required: true, message: 'Visual identity missing' }]}
            help={<span className="text-white/20 text-[9px] tracking-widest uppercase mt-4">Required: High-fidelity portrait 3:4</span>}
          >
            <div className="space-y-6">
              <Upload
                beforeUpload={handleImageUpload}
                showUploadList={false}
                accept="image/*"
              >
                <Button 
                  icon={<UploadOutlined />}
                  className="bg-white/5 border-white/10 hover:border-white/40 h-10 tracking-mega uppercase text-[9px] font-bold text-white/60"
                >
                  Document Visual
                </Button>
              </Upload>
              
              {imageUrl && (
                <div className="relative w-48 h-64 border border-white/10 bg-black overflow-hidden group">
                  <Image 
                    src={imageUrl} 
                    alt="preview" 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    unoptimized 
                  />
                </div>
              )}
            </div>
          </Form.Item>
        </Card>

        <Form.Item className="mb-0">
          <Space size="large">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={saving}
              className="bg-white text-black hover:bg-white/90 border-none h-12 px-12 tracking-mega font-bold uppercase text-[11px]"
            >
              {isNew ? 'INITIATE ENTRY' : 'COMMIT REFINEMENT'}
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
    </div>
  );
}
