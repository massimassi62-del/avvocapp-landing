/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Globe, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('IT');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isScrolledOrNotHome = isScrolled || !isHomePage;

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolledOrNotHome ? 'bg-white shadow-lg border-b border-slate-100 py-2' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group transition-all hover:scale-105 active:scale-95">
          <Scale className={`${isScrolledOrNotHome ? 'text-[#1e3a8a]' : 'text-white'} w-7 h-7 transition-colors duration-500`} strokeWidth={2.5} />
          <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${isScrolledOrNotHome ? 'text-slate-900' : 'text-white'}`}>
            Avvoc<span className={isScrolledOrNotHome ? 'text-[#1e3a8a]' : 'text-white'}>App</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-semibold transition-colors ${
                isScrolledOrNotHome 
                  ? (location.pathname === link.href ? 'text-[#1e3a8a]' : 'text-slate-600 hover:text-[#1e3a8a]')
                  : (location.pathname === link.href ? 'text-white underline underline-offset-4' : 'text-blue-100 hover:text-white')
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className={`h-4 w-px mx-2 ${isScrolledOrNotHome ? 'bg-slate-200' : 'bg-white/20'}`} />
          
          <button 
            onClick={() => setLang(lang === 'IT' ? 'EN' : 'IT')}
            className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${isScrolledOrNotHome ? 'text-slate-500 hover:text-[#1e3a8a]' : 'text-blue-100 hover:text-white'}`}
          >
            <Globe size={14} />
            {lang}
          </button>

          <Link to="/prezzi" className={`${isScrolledOrNotHome ? 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]' : 'bg-white text-[#1e3a8a] hover:bg-blue-50'} px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm`}>
            Piani e Prezzi
          </Link>

          <Link 
            to="/admin" 
            className={`flex items-center gap-2 px-3 py-2 ${isScrolledOrNotHome ? 'bg-blue-600' : 'bg-white/10 backdrop-blur-md border border-white/20'} text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md`}
            title="Impostazioni Amministratore"
          >
            <Settings size={14} />
            <span>Gestisci Sito</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className={`lg:hidden p-2 ${isScrolledOrNotHome ? 'text-slate-900' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                <Link 
                  to="/admin" 
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 mt-4 rounded-xl font-bold text-lg text-center shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings size={20} />
                  Area Amministratore
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
