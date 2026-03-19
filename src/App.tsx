/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Security from './pages/Security';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import { ImageProvider } from './context/ImageContext';
import { BlogProvider } from './context/BlogContext';
import { SettingsProvider } from './context/SettingsContext';
import { initGA, trackPageView } from './services/analytics';

import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
        {!isAdminPage && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-legale" element={<Features />} />
            <Route path="/prezzi" element={<Pricing />} />
            <Route path="/sicurezza" element={<Security />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contatti" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        {!isAdminPage && <Footer />}
      </div>
    </HelmetProvider>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ImageProvider>
        <BlogProvider>
          <SettingsProvider>
            <Router>
              <ScrollToTop />
              <BackToTopButton />
              <AppContent />
            </Router>
          </SettingsProvider>
        </BlogProvider>
      </ImageProvider>
    </ErrorBoundary>
  );
}
