/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('avvocapp-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('avvocapp-cookie-consent', 'all');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('avvocapp-cookie-consent', 'essential');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    // In a real app, this would open a modal to toggle categories
    // For this demo, we'll just show the intent
    console.log('Opening cookie customization modal...');
    // For now, we'll treat it as a partial acceptance or just close for the demo
    localStorage.setItem('avvocapp-cookie-consent', 'custom');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 lg:p-8">
              <div className="flex-shrink-0 hidden md:flex w-12 h-12 bg-blue-50 rounded-xl items-center justify-center text-[#1e3a8a]">
                <Cookie size={28} />
              </div>
              
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold text-lg">
                  <ShieldCheck size={20} className="md:hidden" />
                  <h3>Informativa sui Cookie</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                  AvvocApp utilizza cookie tecnici per garantire il corretto funzionamento del sito. Previo tuo consenso, utilizzeremo anche cookie di profilazione e di terze parti per finalità statistiche e di marketing, per migliorare i servizi offerti e proporti contenuti e offerte rilevanti per le esigenze del tuo studio legale. Il rifiuto del consenso non impedisce la normale navigazione del sito. Puoi gestire le tue preferenze in ogni momento. Per approfondire, consulta la nostra <Link to="/cookie-policy" className="text-[#1e3a8a] font-bold underline underline-offset-4 hover:text-blue-700 transition-colors">Cookie Policy</Link>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={handleCustomize}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all border border-slate-200"
                >
                  Personalizza
                </button>
                <button
                  onClick={handleReject}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all border border-slate-200"
                >
                  Rifiuta
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-8 py-3 text-xs font-bold text-white bg-[#1e3a8a] hover:bg-[#1e40af] rounded-xl transition-all shadow-lg shadow-blue-900/10"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
