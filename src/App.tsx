/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <BackToTopButton />
      <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-legale" element={<Features />} />
            <Route path="/prezzi" element={<Pricing />} />
            <Route path="/sicurezza" element={<Security />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contatti" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
