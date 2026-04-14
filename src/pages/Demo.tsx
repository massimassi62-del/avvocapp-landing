/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Folder, 
  Calendar, 
  Briefcase, 
  FileText, 
  Search, 
  Bell, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Scale,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockStats = [
    { label: 'Pratiche Attive', value: '124', icon: <Folder size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Udienze Mese', value: '18', icon: <Calendar size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Clienti Totali', value: '856', icon: <Users size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Fatturato Mese', value: '€12.450', icon: <TrendingUp size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const mockPratiche = [
    { id: 'PR-2024-001', title: 'Rossi vs. Bianchi', client: 'Mario Rossi', status: 'In corso', date: '12 Apr 2024', priority: 'Alta' },
    { id: 'PR-2024-002', title: 'Condominio Sole', client: 'Elena Verdi', status: 'In attesa', date: '10 Apr 2024', priority: 'Media' },
    { id: 'PR-2024-003', title: 'Separazione Neri', client: 'Luigi Neri', status: 'Chiusa', date: '08 Apr 2024', priority: 'Bassa' },
    { id: 'PR-2024-004', title: 'Recupero Crediti SPA', client: 'Azienda X', status: 'In corso', date: '05 Apr 2024', priority: 'Alta' },
  ];

  const mockEvents = [
    { time: '09:30', title: 'Udienza Tribunale Milano', type: 'Udienza', location: 'Aula 12' },
    { time: '11:00', title: 'Incontro Cliente Rossi', type: 'Appuntamento', location: 'Studio' },
    { time: '15:00', title: 'Deposito Atto Appello', type: 'Scadenza', location: 'Telematico' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <Helmet>
        <title>Demo Live | AvvocApp</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Sidebar (Demo Version) */}
      <aside className="w-full lg:w-64 bg-[#1e3a8a] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 group">
            <Scale className="text-blue-300" size={24} />
            <span className="text-xl font-bold tracking-tight">AvvocApp <span className="text-[10px] bg-blue-500 px-1.5 py-0.5 rounded ml-1 uppercase">Demo</span></span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
            { id: 'pratiche', label: 'Pratiche', icon: <Folder size={18} /> },
            { id: 'agenda', label: 'Agenda', icon: <Calendar size={18} /> },
            { id: 'clienti', label: 'Clienti', icon: <Users size={18} /> },
            { id: 'documenti', label: 'Documenti', icon: <FileText size={18} /> },
            { id: 'parcelle', label: 'Parcelle', icon: <Briefcase size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-white/10 text-white shadow-inner' : 'text-blue-100 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/prezzi" className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-center text-sm font-bold transition-all shadow-lg">
            Attiva Versione Full
          </Link>
          <Link to="/" className="flex items-center justify-center gap-2 mt-4 text-xs text-blue-200 hover:text-white transition-all">
            <ArrowLeft size={14} /> Torna al sito
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 lg:p-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cerca pratiche, clienti, documenti..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                readOnly
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[#1e3a8a] font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-4 lg:p-8 space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-blue-600 rounded-3xl p-6 lg:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 tracking-tight">Bentornato, Avv. Rossi</h1>
              <p className="text-blue-100 text-sm lg:text-base font-medium opacity-90">Hai 3 udienze oggi e 5 scadenze imminenti per questa settimana.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="bg-white text-[#1e3a8a] px-5 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                  <Plus size={18} /> Nuova Pratica
                </button>
                <button className="bg-blue-500/30 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition-all">
                  Genera Report
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {mockStats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Pratiche */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Pratiche Recenti</h2>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-all">Vedi tutte</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">ID / Titolo</th>
                      <th className="px-6 py-4">Cliente</th>
                      <th className="px-6 py-4">Stato</th>
                      <th className="px-6 py-4">Priorità</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {mockPratiche.map((pratica, i) => (
                      <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-all">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{pratica.title}</div>
                          <div className="text-[10px] text-slate-400">{pratica.id}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">{pratica.client}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                            pratica.status === 'In corso' ? 'bg-blue-50 text-blue-600' :
                            pratica.status === 'In attesa' ? 'bg-amber-50 text-amber-600' :
                            'bg-emerald-50 text-emerald-600'
                          }`}>
                            {pratica.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              pratica.priority === 'Alta' ? 'bg-red-500' :
                              pratica.priority === 'Media' ? 'bg-amber-500' :
                              'bg-emerald-500'
                            }`}></div>
                            <span className="text-xs font-medium text-slate-600">{pratica.priority}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1 text-slate-400 hover:text-slate-600 transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Agenda / Events */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Agenda Oggi</h2>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">14 Apr 2024</div>
              </div>
              <div className="p-6 space-y-6">
                {mockEvents.map((event, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== mockEvents.length - 1 && (
                      <div className="absolute left-[1.125rem] top-8 bottom-[-1.5rem] w-px bg-slate-100"></div>
                    )}
                    <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center ${
                      event.type === 'Udienza' ? 'bg-red-50 text-red-600' :
                      event.type === 'Appuntamento' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {event.type === 'Udienza' ? <Scale size={18} /> : 
                       event.type === 'Appuntamento' ? <Users size={18} /> : 
                       <AlertCircle size={18} />}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-400">{event.time} - {event.type}</div>
                      <div className="text-sm font-bold text-slate-900 leading-tight">{event.title}</div>
                      <div className="text-xs text-slate-500 font-medium">{event.location}</div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 mt-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                  <Plus size={16} /> Aggiungi Impegno
                </button>
              </div>
            </div>
          </div>

          {/* AI Features Highlight */}
          <div className="bg-blue-50 rounded-[2rem] p-8 border border-blue-100">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600 shrink-0">
                <Sparkles size={32} />
              </div>
              <div className="flex-grow text-center lg:text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Potenzia il tuo studio con l'IA Legale</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  Stai usando la versione demo. Nella versione Pro puoi redigere atti, sintetizzare fascicoli e analizzare giurisprudenza in pochi secondi grazie a Gemini 1.5 Pro.
                </p>
              </div>
              <Link to="/prezzi" className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#1e40af] transition-all shadow-lg flex items-center gap-2 shrink-0">
                Scopri di più <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
