'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/routing';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/user/Header';
import PageHeader from '@/components/ui/PageHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/firebase/firestore';
import { formatPrice } from '@/lib/utils';
import { ROUTES, CONTACT, ORDER_STATUS } from '@/lib/constants';

export default function CheckoutPage() {
  const t = useTranslations('Checkout');
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const orderItems = items.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.imageUrl,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const newOrderId = await createOrder({
        userId: user?.uid || 'anonymous',
        userEmail: form.email || user?.email || undefined,
        items: orderItems,
        totalAmount: getTotalPrice(),
        status: ORDER_STATUS.PENDING,
        shippingAddress: {
          name: form.name,
          phone: form.contact,
          address: form.note,
          city: '',
          postalCode: '',
        },
        paymentMethod: 'contact',
      });

      clearCart();
      setOrderId(String(newOrderId ?? ''));
      setSubmitted(true);
    } catch (error) {
      console.error('Error creating order:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
        <Header />
        <div className="container mx-auto px-8 py-48 max-w-2xl text-center flex flex-col items-center reveal">
          <div className="w-24 h-px bg-black/10 mb-20" />
          
          <h1 className="font-serif text-6xl md:text-8xl tracking-widest uppercase italic mb-8">{t('confirmedTitle')}</h1>
          <p className="text-foreground/30 text-sm tracking-mega uppercase mb-20 font-medium">{t('confirmedSub')}</p>

          <div className="w-full bg-neutral-50/50 p-16 mb-20 text-left space-y-16 border border-black/5">
             <div className="space-y-4">
                <span className="text-foreground/20 text-sm tracking-mega uppercase font-bold">{t('refSequence')}</span>
                <p className="font-mono text-sm text-foreground/50 tracking-widest font-bold">{orderId.toUpperCase()}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <span className="text-foreground/20 text-sm tracking-mega uppercase font-bold">WeChat ID</span>
                  <p className="text-foreground font-serif text-2xl tracking-widest italic">{CONTACT.WECHAT}</p>
                </div>
                <div className="space-y-6">
                  <span className="text-foreground/20 text-sm tracking-mega uppercase font-bold">WhatsApp</span>
                  <a href={CONTACT.WHATSAPP} target="_blank" rel="noopener noreferrer" className="block text-foreground hover:opacity-50 text-xs tracking-[0.3em] font-extrabold transition-opacity underline decoration-black/10 underline-offset-8 uppercase">
                    Launch Contact →
                  </a>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-8 w-full max-w-sm">
            <button onClick={() => router.push(ROUTES.HOME)} className="w-full bg-foreground text-background py-5 text-sm tracking-mega font-black transition-all uppercase hover:opacity-90 active:scale-95">
              {t('returnHome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <Header />
      <main className="container mx-auto px-8 md:px-12 pt-40 pb-32 max-w-360">
        <PageHeader 
          step="02 / Negotiation"
          title={t('title')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 xl:gap-32">
          {/* Form - Deep Minimalist */}
          <div className="lg:col-span-7 reveal reveal-delay-1">
            <form onSubmit={handleSubmit} className="space-y-20">
               <div className="space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-foreground/30 text-sm tracking-mega uppercase font-bold">{t('nameLabel')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-sm focus:outline-none focus:border-black transition-colors tracking-widest font-bold"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-foreground/30 text-sm tracking-mega uppercase font-bold">{t('contactLabel')}</label>
                      <input
                        type="text"
                        required
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-sm focus:outline-none focus:border-black transition-colors tracking-widest font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-foreground/30 text-sm tracking-mega uppercase font-bold">{t('emailLabel')}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-black/10 text-foreground placeholder-black/10 py-4 text-sm focus:outline-none focus:border-black transition-colors tracking-widest"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-foreground/30 text-sm tracking-mega uppercase font-bold">{t('noteLabel')}</label>
                    <textarea
                      rows={6}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      className="w-full bg-neutral-50/50 border-0 text-foreground placeholder-black/10 p-8 text-sm focus:outline-none focus:ring-1 focus:ring-black/10 transition-all resize-none font-light leading-relaxed"
                    />
                  </div>
               </div>

              {submitError && (
                <p className="text-sm text-red-600 font-medium" role="alert">
                  {submitError}
                </p>
              )}
              <div className="space-y-8 pt-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-foreground text-background py-6 text-sm tracking-mega font-black uppercase hover:opacity-90 transition-all disabled:opacity-20 active:scale-95"
                >
                  {loading ? t('submitting') : t('submit')}
                </button>
                <p className="text-sm text-foreground/10 text-center tracking-mega uppercase font-light">
                  {t('notice')}
                </p>
              </div>
            </form>
          </div>

          {/* Side Summary - Architectural Layout */}
          <div className="lg:col-span-5 border-l border-black/5 pl-20 hidden lg:block reveal reveal-delay-2">
            <div className="space-y-20">
               <span className="text-foreground/20 text-sm tracking-mega uppercase font-bold">List of Interests</span>
               <div className="space-y-12">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-end group">
                      <div className="space-y-2">
                        <p className="text-foreground text-sm tracking-[0.2em] uppercase font-bold group-hover:opacity-40 transition-opacity duration-500">{item.product.name}</p>
                        <p className="text-foreground/20 text-sm tracking-widest italic font-bold">Vol. {item.quantity}</p>
                      </div>
                      <span className="text-foreground text-lg font-bold tracking-tighter">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
               </div>
               
               <div className="pt-16 border-t border-black/10 flex justify-between items-baseline">
                  <span className="text-foreground/20 text-sm tracking-mega uppercase font-black">Valuation</span>
                  <span className="text-5xl font-black tracking-tighter text-foreground">{formatPrice(getTotalPrice())}</span>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
