/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('IT');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'AI Legale', href: '/ai-legale' },
    { name: 'Sicurezza', href: '/sicurezza' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contatti', href: '/contatti' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-[#1e3a8a] p-1.5 rounded-lg">
            <Scale className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Avvoc<span className="text-[#1e3a8a]">App</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-semibold transition-colors ${location.pathname === link.href ? 'text-[#1e3a8a]' : 'text-slate-600 hover:text-[#1e3a8a]'}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-slate-200 mx-2" />
          
          <button 
            onClick={() => setLang(lang === 'IT' ? 'EN' : 'IT')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1e3a8a] transition-colors"
          >
            <Globe size={14} />
            {lang}
          </button>

          <Link to="/prezzi" className="bg-[#1e3a8a] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#1e40af] transition-all shadow-sm">
            Piani e Prezzi
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-slate-900 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`block text-xl font-bold ${location.pathname === link.href ? 'text-[#1e3a8a]' : 'text-slate-900'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6">
                <Link 
                  to="/contatti"
                  className="block w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-bold text-lg text-center shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inizia Ora
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
