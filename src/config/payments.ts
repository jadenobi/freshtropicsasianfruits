export const PAYMENT_METHODS = [
  { id: "bank_account", name: "Bank Account Transfer", icon: "", color: "#1e293b", description: "Direct Wire/ACH Transfer" },
  { id: "chime", name: "Chime", icon: "", color: "#25D366", description: "Mobile banking" },
  { id: "gift_card", name: "Gift Card", icon: "🎁", color: "#FE4164", description: "Use store balance or Visa gift card" },
  { id: "apple_pay", name: "Apple Pay", icon: "", color: "#000000", description: "Quick checkout" },
  { id: "venmo", name: "Venmo", icon: "", color: "#3D95CE", description: "Social payment" },
  { id: "cashapp", name: "Cash App", icon: "", color: "#00D036", description: "Mobile transfer" },
  { id: "zelle", name: "Zelle", icon: "", color: "#6716D0", description: "Bank to bank" },
  { id: "crypto", name: "Crypto", icon: "₿", color: "#F7931A", description: "BTC, ETH, USDC" }
]

export const PAYMENT_INSTRUCTIONS: Record<string, string> = {
  bank_account: "Please wire transfer the total amount to our bank account.\nBank Name: [ADD BANK NAME]\nAccount Name: Fresh Tropics Asian Fruits\nAccount Number: [ADD ACC NUMBER]\nRouting Number: [ADD ROUTING]\nAmount: $[TOTAL]\nReference: Order [ORDER_ID]",
  chime: "Send to Chime: freshtropicsasianfruits@chime.com\nAmount: $[TOTAL]\nMemo: Order [ORDER_ID]",
  gift_card: "Please provide the Gift Card Number, PIN, and Balance during checkout or reply to this email to process.\nAmount: $[TOTAL]\nReference: Order [ORDER_ID]",
  apple_pay: "Send to Apple Pay: [ADD APPLE PAY NUMBER OR EMAIL]\nAmount: $[TOTAL]\nReference: Order [ORDER_ID]",
  venmo: "Send to: @FreshTropicsAsianFruits\nAmount: $[TOTAL]\nMemo: Order [ORDER_ID]",
  cashapp: "Send to: $FreshTropicsAsianFruits\nAmount: $[TOTAL]\nNote: Order [ORDER_ID]",
  zelle: "Send to email: support@freshtropicsasianfruits.com\nAmount: $[TOTAL]\nReference: Order [ORDER_ID]",
  crypto: "Bitcoin Address: [ADD YOUR BTC ADDRESS]\nEthereum: [ADD YOUR ETH ADDRESS]\nUSDC: [ADD YOUR USDC ADDRESS]\nAmount equivalent to: $[TOTAL] USD\nNote: Include order number in transaction memo if possible"
}
