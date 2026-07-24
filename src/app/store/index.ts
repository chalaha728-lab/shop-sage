import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/features/auth/authSlice'
import { cartSlice } from '@/features/cart/cartSlice'
import { productSlice } from '@/features/products/productSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
