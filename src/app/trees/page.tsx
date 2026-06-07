'use client'

import PageLayout from "@/components/PageLayout"
import ProductCard from "@/components/ProductCard"
import { ProductService } from "@/lib/productService"
import { useState, useMemo } from 'react'

export default function TreesPage() {
  const [sortBy, setSortBy] = useState('featured')
  
  const filteredTrees = useMemo(() => {
    const allProducts = ProductService.getAllProducts();
    let trees = allProducts.filter(p => p.sizes?.some(s => s.name?.includes('Tree') || s.name?.includes('Bush') || s.name?.includes('Plant')));
    
    if (sortBy === 'price-low') {
      trees = [...trees].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      trees = [...trees].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      trees = [...trees].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    return trees;
  }, [sortBy]);
  
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-emerald-900 text-white min-h-[50vh] flex items-center border-b-4 border-amber-400">
        {/* Abstract 3D background components */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 opacity-90 backdrop-blur-3xl"></div>
        <div className="absolute top-10 left-20 w-96 h-96 bg-amber-400 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-[30rem] h-[30rem] bg-emerald-500 rounded-full blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-sm animate-slide-up">
            Grow Your Own
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Cultivate paradise right in your backyard. Explore our premium collection of exotic fruit trees, berry bushes, and fragrant herb plants.
          </p>
        </div>
      </section>

      {/* Stats micro-section */}
      <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 py-6 text-emerald-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center font-black">
          <div>🌱 Easy to Grow</div>
          <div>🏡 Perfect for Patios</div>
          <div>🚚 Safe Live Shipping</div>
          <div className="hidden lg:block">💚 Lifetime Support</div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-gray-200 pb-6 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black text-emerald-900">Shop Live Plants</h2>
              <p className="text-emerald-700 bg-emerald-100 px-4 py-2 font-bold rounded-lg shadow-sm">
                {filteredTrees.length} Curated Varieties
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-emerald-200 bg-white rounded-xl text-emerald-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none cursor-pointer hover:border-emerald-300 transition-colors"
              >
                <option value="featured">Featured Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTrees.map((tree, idx) => (
              <div key={tree.id} className="animate-scale-in" style={{animationDelay: `${0.05 * idx}s`}}>
                <ProductCard product={tree} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
