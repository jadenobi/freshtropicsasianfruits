// Google Analytics tracking utility
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: pagePath,
      page_title: pageTitle,
    })
  }
}

export const trackPurchase = (
  transactionId: string,
  value: number,
  items: Array<{ id: string; name: string; price: number; quantity: number }>,
  currency: string = 'USD'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  }
}

export const trackAddToCart = (
  itemId: string,
  itemName: string,
  price: number,
  quantity: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      value: price * quantity,
      currency: 'USD',
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price: price,
          quantity: quantity,
        },
      ],
    })
  }
}

export const trackViewItem = (itemId: string, itemName: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price: price,
        },
      ],
    })
  }
}

export const trackSearch = (searchQuery: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchQuery,
      results_count: resultsCount,
    })
  }
}

export const trackBeginCheckout = (value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value: value,
      currency: 'USD',
      items: items,
    })
  }
}

declare global {
  interface Window {
    gtag: any
  }
}
