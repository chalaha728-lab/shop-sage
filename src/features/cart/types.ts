export interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  sku?: string
}

export interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  appliedCoupon: string | null
  discount: number
}

export interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrderValue?: number
  maxDiscount?: number
}
