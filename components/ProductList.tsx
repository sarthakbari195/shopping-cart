import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="group bg-white rounded-3xl p-3 border border-transparent hover:border-stone-200 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 flex flex-col"
        >
          {/* Image Container */}
          <div className="h-64 overflow-hidden rounded-2xl bg-stone-100 relative mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm border border-stone-100">
              {product.category}
            </div>
          </div>
          
          <div className="px-2 pb-2 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="font-bold text-lg text-stone-900 leading-tight group-hover:text-orange-600 transition-colors">
                {product.name}
              </h3>
              <span className="flex-shrink-0 font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg text-sm border border-orange-100">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <p className="text-stone-500 text-sm mb-5 line-clamp-2 leading-relaxed flex-1">
              {product.description}
            </p>
            
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-stone-900 text-white py-3.5 rounded-2xl font-semibold text-sm hover:bg-orange-600 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-stone-200 group-hover:shadow-orange-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                <path d="M12 9v6m3-3H9" strokeWidth="2.5"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;