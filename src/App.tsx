import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { PrivateRoute } from '@/app/routes/PrivateRoute'
import { AdminRoute } from '@/app/routes/AdminRoute'

// Lazy load pages for code splitting
const Home = lazy(() => import('@/features/home/Home').then(m => ({ default: m.Home })))
const Products = lazy(() => import('@/features/products/ProductsPage').then(m => ({ default: m.ProductsPage })))
const ProductDetail = lazy(() => import('@/features/products/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })))
const Cart = lazy(() => import('@/features/cart/CartPage').then(m => ({ default: m.CartPage })))
const Checkout = lazy(() => import('@/features/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })))
const Login = lazy(() => import('@/features/auth/LoginPage').then(m => ({ default: m.LoginPage })))
const Register = lazy(() => import('@/features/auth/RegisterPage').then(m => ({ default: m.RegisterPage })))
const Profile = lazy(() => import('@/features/auth/ProfilePage').then(m => ({ default: m.ProfilePage })))
const Orders = lazy(() => import('@/features/orders/OrdersPage').then(m => ({ default: m.OrdersPage })))
const OrderDetail = lazy(() => import('@/features/orders/OrderDetailPage').then(m => ({ default: m.OrderDetailPage })))
const AdminDashboard = lazy(() => import('@/features/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminProducts = lazy(() => import('@/features/admin/AdminProducts').then(m => ({ default: m.AdminProducts })))
const AdminOrders = lazy(() => import('@/features/admin/AdminOrders').then(m => ({ default: m.AdminOrders })))
const AdminUsers = lazy(() => import('@/features/admin/AdminUsers').then(m => ({ default: m.AdminUsers })))
const NotFound = lazy(() => import('@/shared/components/NotFound').then(m => ({ default: m.NotFound })))

const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
)

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <PrivateRoute>
                  <OrderDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <Routes>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="users" element={<AdminUsers />} />
                  </Routes>
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
