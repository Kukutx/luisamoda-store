import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getCategory } from '@/lib/firebase/firestore';
import Header from '@/components/user/Header';
import ProductDetailClient from '@/components/user/ProductDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product ? product.name : 'Not found',
    description: product?.description || 'Luisa Moda — curated goods and custom services.',
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productData = await getProduct(id);
  let productWithCategory = productData;

  if (productData && productData.categoryId) {
    const category = await getCategory(productData.categoryId);
    if (category) {
      productWithCategory = {
        ...productData,
        categoryName: category.name
      };
    }
  }

  if (!productWithCategory) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />
      <main className="container mx-auto px-6 md:px-10 pt-28 pb-20">
        <ProductDetailClient product={productWithCategory} />
      </main>
    </div>
  );
}
