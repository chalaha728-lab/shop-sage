import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product, ProductFilters, PaginatedResponse } from '@/features/products/types'

interface ProductsState {
  items: Product[]
  featured: Product[]
  currentProduct: Product | null
  categories: Category[]
  filters: ProductFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  isLoading: boolean
  error: string | null
}

interface Category {
  id: string
  name: string
  slug: string
  image?: string
  parentId?: string
}

const initialState: ProductsState = {
  items: [],
  featured: [],
  currentProduct: null,
  categories: [],
  filters: {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'newest',
    inStock: false,
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<PaginatedResponse<Product>>) => {
      state.items = action.payload.data
      state.pagination = {
        page: action.payload.page,
        limit: action.payload.limit,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
      }
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featured = action.payload
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setProducts,
  setFeaturedProducts,
  setCurrentProduct,
  setCategories,
  setFilters,
  resetFilters,
  setPage,
  setLoading,
  setError,
} = productsSlice.actions
export default productsSlice.reducer
