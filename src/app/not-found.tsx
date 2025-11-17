import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center bg-white min-h-[60vh]">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="mt-4 text-lg">Sorry, we couldn't find the page you're looking for.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="/" className="px-4 py-2 bg-green-600 text-white rounded">Go home</Link>
            <Link href="/shop" className="px-4 py-2 border rounded">Browse the shop</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
