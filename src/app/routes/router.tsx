import { createBrowserRouter, redirect } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import Layout from '@/app/routes/Layout'
import Home from '@/features/home/Home'
import Products from '@/features/products/ProductsPage'
import ProductDetail from '@/features/products/ProductDetailPage'
import Cart from '@/features/cart/CartPage'
import Checkout from '@/features/checkout/CheckoutPage'
import Login from '@/features/auth/LoginPage'
import Register from '@/features/auth/RegisterPage'
import Profile from '@/features/auth/ProfilePage'
import Orders from '@/features/orders/OrdersPage'
import OrderDetail from '@/features/orders/OrderDetailPage'
import AdminLayout from '@/features/admin/AdminLayout'
import AdminDashboard from '@/features/admin/dashboard/AdminDashboard'
import AdminProducts from '@/features/admin/products/AdminProducts'
import AdminOrders from '@/features/admin/orders/AdminOrders'
import AdminUsers from '@/features/admin/users/AdminUsers'
import NotFound from '@/shared/components/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:slug', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: 'orders',
        element: <ProtectedRoute><Orders /></ProtectedRoute>,
      },
      {
        path: 'orders/:id',
        element: <ProtectedRoute><OrderDetail /></ProtectedRoute>,
      },
      { path: '* ', element: <NotFound /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'users', element: <AdminUsers /> },
    ],
  },
])

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return redirect(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
  }

  return <>{children}</>
}

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return redirect('/')
  }

  return <>{children}</>
}

function LoadingScreen() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50'>
      <LoadingSpinner size='lg' />
    </div>
  )
}
