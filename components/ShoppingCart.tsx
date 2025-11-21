import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { MOCK_PRODUCTS } from '../constants';
import { CartItemType, Product } from '../types';

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Glassmorphic Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shadow-lg shadow-orange-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">SmartCart</h1>
          </div>
          
          <div className="relative group">
            <button className="relative bg-white border border-stone-200 hover:border-stone-300 text-stone-700 font-medium px-4 py-2 rounded-full shadow-sm transition-all flex items-center gap-2">
               <span className="text-sm">Cart</span>
               <span className="bg-stone-900 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[24px] text-center">
                 {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
               </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          
          {/* Product List Section */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight mb-2">Fresh Arrivals</h2>
              <p className="text-stone-500">Premium quality products curated just for you.</p>
            </div>
            <ProductList 
              products={MOCK_PRODUCTS} 
              onAddToCart={handleAddToCart} 
            />
          </div>

          {/* Cart Section (Sidebar) */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              
              {/* Cart Items Container */}
              <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
                <div className="p-6 border-b border-stone-100 bg-white/50 backdrop-blur-sm z-10">
                  <h3 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                    Your Shopping Bag
                  </h3>
                </div>
                
                <div className="overflow-y-auto p-6 flex-1 min-h-[200px]">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-10 text-center">
                      <div className="bg-stone-50 w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-inner">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                      </div>
                      <p className="text-stone-900 font-medium">Your cart is empty</p>
                      <p className="text-stone-400 text-sm mt-1 max-w-[200px]">Looks like you haven't made your choice yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map(item => (
                        <CartItem 
                          key={item.id} 
                          item={item} 
                          onRemove={handleRemoveFromCart}
                          onUpdateQuantity={handleUpdateQuantity}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer of Cart Card */}
                <CartSummary items={cartItems} />
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;