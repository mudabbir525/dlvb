import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import EditMedication from './components/back/EditMedication';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const ContactPage = lazy(() => import('./components/ContactUs'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ProductDetailsPage = lazy(() => import('./components/ProductDetailsPage'));
const NotFound = lazy(() => import('./components/NotFound'));

// Admin routes lazy loading
const MedicationForm = lazy(() => import('./components/back/MedicationForm'));
const MedicationsDisplay = lazy(() => import('./components/back/MedicationsDisplay'));
const MedicationEdit = lazy(() => import('./components/back/MedicationEdit'));

// Route configurations
const publicRoutes = [
  { path: '/', element: <Hero /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/product/:productId', element: <ProductDetailsPage /> },
  { path: '*', element: <NotFound /> },
];

const adminRoutes = [
  { path: '/siddesh', element: <MedicationForm /> },
  { path: '/sid', element: <MedicationsDisplay /> },
  { path: '/edit/:id', element: <EditMedication /> },
];

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}

              {/* Admin Routes */}
              {adminRoutes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <RequireAuth>
                      {element}
                    </RequireAuth>
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

// Simple auth check component - you can enhance this based on your needs
const RequireAuth = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default App;