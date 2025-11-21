import React from 'react';
import { CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex gap-4 animate-slide-up">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-stone-100 bg-stone-50">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex justify-between items-start gap-2">
          <div>
             <h4 className="text-sm font-bold text-stone-900 line-clamp-1">{item.name}</h4>
             <p className="text-xs text-stone-500 font-medium">${item.price.toFixed(2)}</p>
          </div>
          <div className="text-sm font-bold text-stone-900">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          {/* Quantity Control */}
          <div className="flex items-center bg-stone-100 rounded-full p-1 gap-1">
            <button 
              onClick={() => onUpdateQuantity(item.id, -1)}
              disabled={item.quantity <= 1}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-stone-900 disabled:opacity-50 disabled:shadow-none transition-all text-xs"
            >
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><rect width="10" height="2" rx="1" fill="currentColor"/></svg>
            </button>
            
            <span className="text-xs font-bold w-6 text-center text-stone-900">{item.quantity}</span>
            
            <button 
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-stone-900 transition-all text-xs"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M4 1a1 1 0 0 1 2 0v3h3a1 1 0 1 1 0 2H6v3a1 1 0 1 1-2 0V6H1a1 1 0 1 1 0-2h3V1Z" fill="currentColor"/></svg>
            </button>
          </div>

          <button 
            onClick={() => onRemove(item.id)}
            className="text-[10px] font-semibold text-stone-400 hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;