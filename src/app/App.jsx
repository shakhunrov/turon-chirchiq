import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LangProvider } from '../shared/i18n';
import { AdminAuthProvider } from '../shared/admin/adminAuth';
import { selectIsAuth } from '../features/auth';
import Navbar from '../widgets/navbar/Navbar';
import Footer from '../widgets/footer/Footer';
import StickyCTA from '../widgets/sticky-cta/StickyCTA';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../admin/pages/Dashboard';
import PagesManager from '../admin/pages/PagesManager';
import PageEditor from '../admin/pages/PageEditor';
import TranslationsManager from '../admin/pages/TranslationsManager';
import MediaManager from '../admin/pages/MediaManager';
import MenuBuilder from '../admin/pages/MenuBuilder';
import ComponentsLibrary from '../admin/pages/ComponentsLibrary';
import GlobalSettings from '../admin/pages/GlobalSettings';
import FormBuilder from '../admin/pages/FormBuilder';
import NewsManager from '../admin/pages/NewsManager';
import InquiryManager from '../admin/pages/InquiryManager';

import { PageRenderer } from '../platform/renderer/PageRenderer';
import '../index.css';
import '../pages/admin/AdminDashboard.css';

// Protected route wrapper
function ProtectedAdminRoute({ children }) {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? children : <Navigate to="/admin" replace />;
}

// Public site layout
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <StickyCTA />
    </>
  );
}

function DynamicSlugRenderer({ nested }) {
  const { parent, slug } = useParams();
  const { slug: paramsSlug } = useParams();
  const targetSlug = nested ? `${parent}-${slug}` : paramsSlug;
  return <PageRenderer slug={targetSlug || 'home'} />;
}

export default function App() {
  return (
    <LangProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/pages" element={<ProtectedAdminRoute><PagesManager /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/pages/:id" element={<ProtectedAdminRoute><PageEditor /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/translations" element={<ProtectedAdminRoute><TranslationsManager /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/media" element={<ProtectedAdminRoute><MediaManager /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/menus" element={<ProtectedAdminRoute><MenuBuilder /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/sections" element={<ProtectedAdminRoute><ComponentsLibrary /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/settings" element={<ProtectedAdminRoute><GlobalSettings /></ProtectedAdminRoute>} />
            <Route path="/admin/cms/forms" element={<ProtectedAdminRoute><FormBuilder /></ProtectedAdminRoute>} />
            <Route path="/admin/news" element={<ProtectedAdminRoute><NewsManager /></ProtectedAdminRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedAdminRoute><InquiryManager /></ProtectedAdminRoute>} />

            {/* Public routes - Fully backend driven */}
            <Route path="/*" element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<PageRenderer slug="home" />} />
                  <Route path="/:slug" element={<DynamicSlugRenderer />} />
                  <Route path="/:parent/:slug" element={<DynamicSlugRenderer nested />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </PublicLayout>
            } />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </LangProvider>
  );
}
