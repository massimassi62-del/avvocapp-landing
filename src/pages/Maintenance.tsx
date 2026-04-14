/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Construction, Mail, Phone, Scale, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-16 border border-slate-200 relative overflow-hidden"
      >
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-blue-50 text-[#1e3a8a] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Construction size={40} />
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Scale className="text-[#1e3a8a]" size={24} />
            <span className="text-2xl font-bold tracking-tight text-slate-900">Avvoc<span className="text-[#1e3a8a]">App</span></span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            Sito in Lavorazione
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
            Stiamo perfezionando la piattaforma per offrirti il miglior servizio possibile. 
            Torneremo online a breve con tutte le nuove funzionalità IA per il tuo studio legale.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Mail className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                <p className="text-sm font-bold text-slate-900">info@avvocapp.it</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telefono</p>
                <p className="text-sm font-bold text-slate-900">+39 02 1234567</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-400 font-medium mb-6">
              Sei l'amministratore? Accedi al pannello per continuare i lavori.
            </p>
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1e3a8a] text-white rounded-xl font-bold text-sm hover:bg-[#1e40af] transition-all shadow-lg group"
            >
              <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              Area Amministratore
            </Link>
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        © 2024 AvvocApp • Legal Tech Solutions
      </p>
    </div>
  );
};

export default Maintenance;
