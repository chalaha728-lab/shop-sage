import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  categoryId: string
  sku: string
  inventory: number
  variants?: ProductVariant[]
  featured: boolean
  status: 'active' | 'draft' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  inventory: number
  options: Record&lt;string, string&gt;
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  productCount: number
}

export interface ProductFilters {
  search: string
  category: string
  minPrice: number | null
  maxPrice: number | null
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular'
  page: number
  limit: number
}

export interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  categories: Category[]
  selectedProduct: Product | null
  filters: ProductFilters
  totalProducts: number
  totalPages: number
  isLoading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  categories: [],
  selectedProduct: null,
  filters: {
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sortBy: 'newest',
    page: 1,
    limit: 12,
  },
  totalProducts: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ products: Product[]; total: number; page: number; totalPages: number }>) => {
      state.products = action.payload.products
      state.totalProducts = action.payload.total
      state.totalPages = action.payload.totalPages
      state.filters.page = action.payload.page
      state.isLoading = false
      state.error = null
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const {
  setProducts,
  setFeaturedProducts,
  setCategories,
  setSelectedProduct,
  setFilters,
  resetFilters,
  setLoading,
  setError,
} = productSlice.actions

export default productSlice.reducer
