/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Shield, Lock, Server, Eye, FileCheck, UserCheck, Globe } from 'lucide-react';

const Security = () => {
  return (
    <div className="pb-8 bg-white">
      <Helmet>
        <title>Sicurezza e Privacy | AvvocApp</title>
        <meta name="description" content="La sicurezza dei tuoi dati è la nostra priorità. Scopri come AvvocApp protegge il segreto professionale e garantisce la conformità GDPR." />
        <meta property="og:title" content="Sicurezza e Privacy | AvvocApp" />
        <meta property="og:description" content="Proteggiamo i dati del tuo studio con le tecnologie più avanzate." />
        <meta name="twitter:title" content="Sicurezza e Privacy | AvvocApp" />
        <meta name="twitter:description" content="Scopri i protocolli di sicurezza di AvvocApp." />
      </Helmet>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-6 border border-emerald-100"
          >
            <Shield size={14} />
            Sicurezza di Grado Militare
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6"
          >
            La tua riservatezza è la nostra priorità
          </motion.h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Proteggiamo i dati del tuo studio con le tecnologie più avanzate, garantendo la piena conformità al GDPR e al codice deontologico forense.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <UserCheck className="text-emerald-600" />,
                title: "Autenticazione 2FA",
                desc: "Proteggi il tuo account con l'autenticazione a due fattori obbligatoria per garantire che solo il personale autorizzato possa accedere ai dati dello studio."
              },
              {
                icon: <Server className="text-emerald-600" />,
                title: "Server Europei (GDPR)",
                desc: "I nostri server si trovano esclusivamente in territorio UE, garantendo il rispetto totale della normativa sulla privacy."
              },
              {
                icon: <Eye className="text-emerald-600" />,
                title: "Zero Data Training",
                desc: "I dati caricati per l'analisi IA non vengono mai utilizzati per addestrare modelli pubblici. La tua proprietà intellettuale è al sicuro."
              },
              {
                icon: <FileCheck className="text-emerald-600" />,
                title: "Backup Ridondanti",
                desc: "Eseguiamo backup automatici ogni ora su server geograficamente distanti per prevenire qualsiasi perdita di dati."
              },
              {
                icon: <Globe className="text-emerald-600" />,
                title: "Conformità Deontologica",
                desc: "Il sistema è progettato per rispettare gli obblighi di segretezza e riservatezza richiesti dalla professione legale."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-900 text-white mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Hai domande sulla sicurezza?</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Il nostro team tecnico è a disposizione per fornire dettagli specifici sulle infrastrutture e sui protocolli di sicurezza adottati.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:security@avvocapp.it" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all">
              Contatta il Responsabile Sicurezza
            </a>
            <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
              Scarica il Whitepaper Sicurezza
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;
