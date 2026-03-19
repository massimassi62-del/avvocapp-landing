/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Settings, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-500 py-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-[#1e3a8a] p-2 rounded-lg">
                <Scale className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Avvoc<span className="text-blue-400">App</span></span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-8 text-slate-400 font-medium">
              Il gestionale studio legale moderno, intuitivo e potenziato dall'intelligenza artificiale per avvocati che guardano al futuro.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-[#1e3a8a] transition-all cursor-pointer group">
                <Settings className="w-5 h-5 text-slate-500 group-hover:text-white" />
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-[#1e3a8a] transition-all cursor-pointer group">
                <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-white" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-6 uppercase tracking-wider">Prodotto</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/ai-legale" className="hover:text-blue-400 transition-colors">AI Legale</Link></li>
              <li><Link to="/prezzi" className="hover:text-blue-400 transition-colors">Piani e Prezzi</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link to="/contatti" className="hover:text-blue-400 transition-colors">Richiedi Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-6 uppercase tracking-wider">Contatti</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>info@avvocapp.it</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+39 02 1234567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Via Montenapoleone 8, Milano (MI)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs font-medium">
          <p>© 2026 AvvocApp. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Termini di Servizio</a>
            <a href="#" className="hover:text-white transition-colors">GDPR</a>
            <Link to="/admin" className="text-slate-800 hover:text-slate-700 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
