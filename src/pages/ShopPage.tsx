import { useState } from 'react';
import type { Language } from '../types';
import { SEO } from '../components/SEO';

interface ShopPageProps {
  lang: Language;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const products = [
  { id: 'tuki-learning-tower', name: { de: 'Tuki Learning Tower', en: 'Tuki Learning Tower', fr: 'Tuki Learning Tower' }, price: 299, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop' },
  { id: 'tuki-cushion', name: { de: 'Tuki Kissen Set', en: 'Tuki Cushion Set', fr: 'Set Coussins Tuki' }, price: 49, image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&h=600&fit=crop' },
  { id: 'tuki-accessory', name: { de: 'Zubehör Paket', en: 'Accessory Pack', fr: 'Pack Accessoires' }, price: 29, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=600&fit=crop' },
];

export function ShopPage({ lang }: ShopPageProps) {
  const pageTitle = lang === 'de' ? 'Shop' : lang === 'en' ? 'Shop' : 'Boutique';
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name[lang], price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <SEO lang={lang} pageTitle={pageTitle} />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-tuki-schwarz">{pageTitle}</h1>
              <p className="text-tuki-blau/70 mt-2">{lang === 'de' ? 'Premium Montessori Möbel' : lang === 'en' ? 'Premium Montessori Furniture' : 'Meubles Montessori Premium'}</p>
            </div>
            <button onClick={() => setShowCart(!showCart)} className="relative inline-flex items-center gap-2 bg-tuki-schwarz text-tuki-weiss px-6 py-3 rounded-full hover:bg-tuki-rot transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span>{cartCount} {lang === 'de' ? 'Artikel' : lang === 'en' ? 'items' : 'articles'}</span>
              {cartCount > 0 && <span className="absolute -top-2 -right-2 w-6 h-6 bg-tuki-rot text-tuki-weiss rounded-full text-xs flex items-center justify-center font-bold">{cartCount}</span>}
            </button>
          </div>

          {/* Cart Drawer */}
          {showCart && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
              <div className="relative w-full max-w-md bg-tuki-weiss h-full overflow-y-auto shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-tuki-schwarz">{lang === 'de' ? 'Warenkorb' : lang === 'en' ? 'Cart' : 'Panier'}</h2>
                  <button onClick={() => setShowCart(false)} className="text-tuki-blau hover:text-tuki-rot"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-tuki-blau/70 text-center py-8">{lang === 'de' ? 'Warenkorb ist leer' : lang === 'en' ? 'Cart is empty' : 'Panier vide'}</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 bg-tuki-sand rounded-xl p-4">
                          <div className="flex-1">
                            <h4 className="font-medium text-tuki-schwarz">{item.name}</h4>
                            <p className="text-sm text-tuki-blau/70">{item.price} CHF × {item.quantity}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-tuki-rot hover:text-tuki-rot-dark"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-tuki-schwarz/10 pt-4 space-y-2">
                      <div className="flex justify-between font-semibold text-tuki-schwarz">
                        <span>Total</span>
                        <span>{cartTotal.toFixed(2)} CHF</span>
                      </div>
                      <button className="w-full bg-tuki-rot text-tuki-weiss py-4 rounded-full font-medium hover:bg-tuki-rot-dark transition-colors">
                        {lang === 'de' ? 'Zur Kasse' : lang === 'en' ? 'Checkout' : 'Payer'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-tuki-sand rounded-2xl overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-tuki-schwarz mb-1">{product.name[lang]}</h3>
                  <p className="text-2xl font-semibold text-tuki-schwarz mb-4">{product.price} CHF</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-tuki-schwarz text-tuki-weiss py-3 rounded-full font-medium hover:bg-tuki-rot transition-colors">
                    {lang === 'de' ? 'In den Warenkorb' : lang === 'en' ? 'Add to cart' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
