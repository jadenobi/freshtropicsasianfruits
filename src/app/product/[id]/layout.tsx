import { Metadata, ResolvingMetadata } from 'next'
import { ProductService } from '@/lib/productService'

interface Props {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = ProductService.getProductById(params.id)

  if (!product) {
    return {
      title: 'Product Not Found | Fresh Tropics',
    }
  }

  const title = `${product.name} | Fresh Tropics`
  const description = `${product.name} - Premium ${product.category} fruit. Rating: ${product.rating}/5. Buy fresh ${product.category} fruits online with fast delivery.`
  const imageUrl = product.image || product.images?.[0] || 'https://freshtropicsasianfruits.com/logo.svg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://freshtropicsasianfruits.com/product/${product.id}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export function generateStaticParams() {
  const products = ProductService.getAllProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
