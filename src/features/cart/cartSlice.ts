import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  price: number
  quantity: number
  image: string
  sku: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  promoCode: string | null
  discount: number
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  promoCode: null,
  discount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'id'>>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId && item.variantId === action.payload.variantId
      )
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push({ ...action.payload, id: crypto.randomUUID() })
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity)
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id)
        }
      }
    },
    clearCart: (state) => {
      state.items = []
      state.promoCode = null
      state.discount = 0
    },
    setPromoCode: (state, action: PayloadAction<{ code: string; discount: number } | null>) => {
      if (action.payload) {
        state.promoCode = action.payload.code
        state.discount = action.payload.discount
      } else {
        state.promoCode = null
        state.discount = 0
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
    },
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
    },
  },
})

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setPromoCode,
  toggleCart,
  openCart,
  closeCart,
  setItems,
} = cartSlice.actions

export default cartSlice.reducer
