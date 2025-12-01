import Header from './Header'
import Footer from './Footer'
import PromoBanner from './PromoBanner'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PromoBanner variant="top" />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
