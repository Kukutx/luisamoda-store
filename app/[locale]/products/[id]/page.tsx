import { Metadata } from 'next';
import { getProduct, getCategory } from '@/lib/firebase/firestore';
import Header from '@/components/user/Header';
import ProductDetailClient from '@/components/user/ProductDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product ? `${product.name} | Luisa Series` : 'Piece Not Found',
    description: product?.description || 'Discover a masterfully curated artisan piece from the Luisa Series.',
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
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-foreground/20 text-sm tracking-mega uppercase italic">Piece not located</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />
      <main className="container mx-auto px-8 md:px-12 pt-40 pb-32">
        <ProductDetailClient product={productWithCategory} />
      </main>
    </div>
  );
}
