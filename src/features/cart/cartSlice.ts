import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState } from '@/features/cart/types'

const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

const initialState: CartState = {
  items: loadCartFromStorage(),
  isCartOpen: false,
  appliedCoupon: null,
  discount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId && item.variantId === action.payload.variantId
      )
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      saveCartToStorage(state.items)
    },
    removeItem: (state, action: PayloadAction<{ productId: string; variantId?: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId)
      )
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; variantId?: string; quantity: number }>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId && i.variantId === action.payload.variantId
      )
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
        saveCartToStorage(state.items)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.appliedCoupon = null
      state.discount = 0
      saveCartToStorage(state.items)
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen
    },
    openCart: (state) => {
      state.isCartOpen = true
    },
    closeCart: (state) => {
      state.isCartOpen = false
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.appliedCoupon = action.payload.code
      state.discount = action.payload.discount
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null
      state.discount = 0
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
      saveCartToStorage(state.items)
    },
  },
})

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  applyCoupon,
  removeCoupon,
  setCartItems,
} = cartSlice.actions
export default cartSlice.reducer
