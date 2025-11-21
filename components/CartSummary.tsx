import React, { useState } from 'react';
import { CartItemType, AiRecipe } from '../types';
import { getRecipeSuggestion } from '../services/geminiService';

interface CartSummaryProps {
  items: CartItemType[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const [recipe, setRecipe] = useState<AiRecipe | null>(null);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleGetSuggestion = async () => {
    setLoading(true);
    setRecipe(null);
    try {
      const productNames = items.map(i => i.name);
      const result = await getRecipeSuggestion(productNames);
      setRecipe(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-stone-50/50 border-t border-stone-100">
      {/* Summary Rows */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm text-stone-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-stone-600">
          <span>Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="pt-3 border-t border-stone-200 flex justify-between items-end">
          <span className="text-stone-900 font-bold text-lg">Total</span>
          <span className="text-2xl font-bold text-stone-900 tracking-tight">${total.toFixed(2)}</span>
        </div>
      </div>

      <button 
        disabled={items.length === 0}
        className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-200 mb-6 active:scale-[0.99]"
      >
        Checkout Now
      </button>

      {/* AI Feature Section - The "Magic" Card */}
      <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${recipe ? 'bg-white border-orange-100 shadow-lg shadow-orange-100' : 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 border-transparent text-white'}`}>
        
        {/* Background Elements for decoration */}
        {!recipe && (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="0" cy="0" r="50" fill="white" />
              <circle cx="100" cy="100" r="50" fill="white" />
            </svg>
          </div>
        )}

        <div className="relative p-5">
          {!recipe && !loading && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 12.05"></path><path d="M12 12 16.9 7.15"></path></svg>
                <h3 className="font-bold text-sm tracking-wide">CHEF GEMINI</h3>
              </div>
              <p className="text-xs opacity-90 mb-4 leading-relaxed px-2">
                Unlock a custom recipe using ingredients from your cart.
              </p>
              <button
                onClick={handleGetSuggestion}
                disabled={items.length === 0}
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white font-semibold py-2.5 rounded-xl text-xs transition-all"
              >
                Generate Recipe Idea
              </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-6 text-white">
               <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
               <span className="text-xs font-bold tracking-widest uppercase animate-pulse">Consulting Chef...</span>
            </div>
          )}

          {recipe && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 12.05"></path><path d="M12 12 16.9 7.15"></path></svg>
                  </div>
                  <span className="text-[10px] font-bold text-orange-600 tracking-wider uppercase">AI Suggestion</span>
                </div>
                <button onClick={() => setRecipe(null)} className="text-stone-400 hover:text-stone-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              
              <h4 className="text-base font-bold text-stone-900 mb-1.5 leading-tight">{recipe.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">{recipe.summary}</p>
              
              <div className="flex flex-wrap gap-1.5">
                {recipe.ingredients.map((ing, idx) => (
                  <span key={idx} className="text-[10px] font-medium bg-orange-50 text-orange-800 px-2 py-1 rounded-md border border-orange-100/50">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;