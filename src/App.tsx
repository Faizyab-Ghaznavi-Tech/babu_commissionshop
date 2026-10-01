import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { FullPageLoader } from '@/components/States';

// Public pages
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { DatesPage } from '@/pages/public/DatesPage';
import { ProductDetailPage } from '@/pages/public/ProductDetailPage';
import { ServicesPage } from '@/pages/public/ServicesPage';
import { GalleryPage } from '@/pages/public/GalleryPage';
import { ContactPage } from '@/pages/public/ContactPage';

// Admin pages
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage';
import { AdminServicesPage } from '@/pages/admin/AdminServicesPage';
import { AdminEnquiriesPage } from '@/pages/admin/AdminEnquiriesPage';
import { AdminAnnouncementsPage } from '@/pages/admin/AdminAnnouncementsPage';
import { AdminGalleryPage } from '@/pages/admin/AdminGalleryPage';
import { AdminMediaPage } from '@/pages/admin/AdminMediaPage';
import { AdminAboutPage } from '@/pages/admin/AdminAboutPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return <FullPageLoader />;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dates" element={<DatesPage />} />
      <Route path="/dates/:slug" element={<ProductDetailPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />
      <Route path="/admin/services" element={<ProtectedRoute><AdminServicesPage /></ProtectedRoute>} />
      <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiriesPage /></ProtectedRoute>} />
      <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncementsPage /></ProtectedRoute>} />
      <Route path="/admin/gallery" element={<ProtectedRoute><AdminGalleryPage /></ProtectedRoute>} />
      <Route path="/admin/media" element={<ProtectedRoute><AdminMediaPage /></ProtectedRoute>} />
      <Route path="/admin/about" element={<ProtectedRoute><AdminAboutPage /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
