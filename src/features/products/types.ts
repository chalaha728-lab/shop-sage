export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  cost?: number
  sku: string
  barcode?: string
  trackInventory: boolean
  inventoryQuantity: number
  categoryId: string
  category?: Category
  images: ProductImage[]
  variants: ProductVariant[]
  options: ProductOption[]
  status: 'draft' | 'active' | 'archived'
  featured: boolean
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
  sortOrder: number
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  inventoryQuantity: number
  options: Record<string, string>
}

export interface ProductOption {
  id: string
  name: string
  values: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  sortOrder: number
  productCount?: number
}

export interface ProductFilters {
  search: string
  category: string
  minPrice: number
  maxPrice: number
  sortBy: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
  inStock: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}
