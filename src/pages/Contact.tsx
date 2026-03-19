/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Calendar, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
  const { settings } = useSettings();

  return (
    <div className="pb-8 bg-white">
      <Helmet>
        <title>Contatti | AvvocApp</title>
        <meta name="description" content="Contatta il team di AvvocApp per informazioni, supporto o per richiedere una demo personalizzata del nostro software legale IA." />
        <meta property="og:title" content="Contatti | AvvocApp" />
        <meta property="og:description" content="Siamo al tuo fianco. Contattaci per scoprire come AvvocApp può trasformare il tuo studio." />
        <meta name="twitter:title" content="Contatti | AvvocApp" />
        <meta name="twitter:description" content="Contatta il team di AvvocApp e richiedi una demo." />
      </Helmet>
      {/* Header */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6"
          >
            Siamo al tuo fianco.
          </motion.h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Hai domande o vuoi scoprire come AvvocApp può trasformare il tuo studio? Scrivici o prenota una consulenza.
          </p>
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Richiedi una Demo</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nome</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:border-[#1e3a8a] outline-none transition-all" placeholder="Mario Rossi" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Studio</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:border-[#1e3a8a] outline-none transition-all" placeholder="Studio Rossi & Associati" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Professionale</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:border-[#1e3a8a] outline-none transition-all" placeholder="mario.rossi@studio.it" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Messaggio</label>
                  <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:border-[#1e3a8a] outline-none transition-all" placeholder="Come possiamo aiutarti?"></textarea>
                </div>
                <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-lg text-sm font-bold hover:bg-[#1e3a8a]/90 transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group">
                  Invia richiesta <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Direct Contacts & Calendar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Contatti Diretti</h2>
                <div className="space-y-4">
                  {[
                    { icon: Mail, title: "Email", value: settings.email, color: "text-blue-600 bg-blue-50" },
                    { icon: Phone, title: "Telefono", value: settings.phone, color: "text-emerald-600 bg-emerald-50" },
                    { icon: MapPin, title: "Sede", value: `${settings.address}, ${settings.city}`, color: "text-purple-600 bg-purple-50" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center shrink-0`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{item.title}</h4>
                        <p className="text-base font-bold text-slate-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-900 rounded-2xl text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="text-blue-400" size={24} />
                  <h3 className="text-xl font-bold tracking-tight">Prenota una Call</h3>
                </div>
                <p className="text-sm font-medium text-slate-400 mb-8 leading-relaxed">
                  Scegli un orario e parla direttamente con un nostro consulente per una demo personalizzata.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {['10:00', '11:30', '14:00', '16:30'].map(time => (
                    <button key={time} className="bg-white/5 border border-white/10 py-3 rounded-lg font-bold text-xs hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                      <Clock size={14} />
                      {time}
                    </button>
                  ))}
                </div>
                <button className="w-full bg-white text-slate-900 py-3 rounded-lg text-xs font-bold hover:bg-blue-400 hover:text-white transition-all">
                  Vedi tutte le disponibilità
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
