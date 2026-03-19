/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Shield, Cookie, Info } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="pb-8 bg-white">
      <Helmet>
        <title>Cookie Policy | AvvocApp</title>
        <meta name="description" content="Informativa estesa sull'uso dei cookie di AvvocApp." />
      </Helmet>

      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1e3a8a] text-[10px] font-bold uppercase tracking-wider mb-6 border border-blue-100"
          >
            <Cookie size={14} />
            Informativa Cookie
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 tracking-tight mb-6"
          >
            Cookie Policy
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Trasparenza e controllo sui tuoi dati. Scopri come utilizziamo i cookie per migliorare la tua esperienza professionale su AvvocApp.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info size={24} className="text-[#1e3a8a]" />
                Cosa sono i cookie?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-[#1e3a8a] mb-3">Tipologie di cookie utilizzati</h3>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">1</div>
                  <div>
                    <strong>Cookie Tecnici:</strong> Necessari per il corretto funzionamento del sito e per l'erogazione del servizio richiesto (es. login, sessione). Non richiedono il consenso preventivo.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">2</div>
                  <div>
                    <strong>Cookie di Profilazione:</strong> Utilizzati per tracciare la navigazione dell'utente e creare profili sui suoi gusti, abitudini, scelte, ecc. al fine di trasmettere messaggi pubblicitari in linea con le preferenze manifestate. Richiedono il tuo consenso.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">3</div>
                  <div>
                    <strong>Cookie di Terze Parti:</strong> Cookie installati da un sito diverso da quello che l'utente sta visitando (es. Google Analytics). Richiedono il tuo consenso.
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Finalità del trattamento</h2>
              <p className="text-slate-600 leading-relaxed">
                Su AvvocApp utilizziamo i cookie per:
              </p>
              <ul className="list-disc list-inside text-slate-600 mt-4 space-y-2">
                <li>Garantire la sicurezza e la stabilità della piattaforma;</li>
                <li>Analizzare l'utilizzo del sito per ottimizzare le prestazioni;</li>
                <li>Personalizzare i contenuti e le offerte commerciali in base alle esigenze degli avvocati e degli studi legali;</li>
                <li>Fornire funzionalità integrate (es. mappe, video).</li>
              </ul>
            </div>

            <div className="p-6 border border-slate-200 rounded-2xl">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Gestione del consenso</h2>
              <p className="text-slate-600 text-sm mb-6">
                Puoi modificare le tue preferenze sui cookie in qualsiasi momento tramite il banner di consenso o le impostazioni del tuo browser. Il rifiuto dei cookie di profilazione non pregiudica in alcun modo la possibilità di navigare sul sito e utilizzare le funzionalità base di AvvocApp.
              </p>
              <button 
                onClick={() => {
                  localStorage.removeItem('avvocapp-cookie-consent');
                  window.location.reload();
                }}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
              >
                Ripristina preferenze cookie
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
