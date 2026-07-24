import { z } from 'zod'

export const emailSchema = z.string().email('Invalid email address')
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
export const nameSchema = z.string().min(2, 'Must be at least 2 characters').max(50)
export const phoneSchema = z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number')

// Address validation
export const addressSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  address1: z.string().min(5, 'Address is too short'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  country: z.string().min(2, 'Country is required'),
  phone: phoneSchema.optional(),
  isDefault: z.boolean().default(false),
})

// Cart item
export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1).max(99),
})

// Product validation
export const productSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(5000),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  sku: z.string().min(3).max(50),
  categoryId: z.string().uuid(),
  inventoryQuantity: z.number().int().min(0),
  trackInventory: z.boolean(),
  status: z.enum(['draft', 'active', 'archived']),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
})
