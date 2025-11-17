'use client'

import PageLayout from '@/components/PageLayout'
import Image from 'next/image'
import { FRUITS } from '@/lib/data'
import { useCart } from '@/context/CartContext'

export default function ProductPage({params}:{params:{id:string}}){
  const product = FRUITS.find(f=> f.id === params.id)
  const { addToCart } = useCart()

  if(!product) return (
    <PageLayout>
      <div className="grid place-items-center min-h-[60vh]">Product not found</div>
    </PageLayout>
  )

  return (
    <PageLayout>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded shadow overflow-hidden">
            <div className="w-full h-96 relative">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">{product.name}</h1>
            <p className="text-gray-500 mt-2">{product.category}</p>
            <p className="mt-4 text-gray-700">{product.description}</p>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-green-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="ml-3 text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={()=> addToCart(product,1)} className="px-4 py-2 bg-green-600 text-white rounded">Add to cart</button>
              <button className="px-4 py-2 border rounded">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
