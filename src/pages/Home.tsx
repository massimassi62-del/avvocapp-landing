/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  TrendingUp,
  Clock,
  Users,
  Folder,
  Calendar,
  Briefcase,
  FileText,
  Link as LinkIcon,
  Compass,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(30,58,138,0.05)_0%,transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1e3a8a] text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100"
            >
              <Sparkles size={14} />
              Potenziato da Gemini 1.5 Pro
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
            >
              Il gestionale intelligente per lo <br />
              <span className="text-[#1e3a8a]">Studio Legale Moderno</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Automatizza le scadenze, redigi atti con l'IA e gestisci la contabilità in un'unica interfaccia elegante e professionale.
            </motion.p>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 relative max-w-5xl mx-auto"
            >
              <div className="absolute -inset-4 bg-blue-100/50 blur-3xl rounded-[2rem] -z-10" />
              <div className="rounded-xl border border-slate-200 shadow-2xl overflow-hidden bg-white">
                <img 
                  src="dashboard.png" 
                  alt="AvvocApp Dashboard" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/legal-software-ui/1600/900";
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Features Showcase */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Potenza e Semplicità.</h2>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto text-sm">
              Ogni aspetto del tuo studio, ottimizzato e sotto controllo.
            </p>
          </div>

          <div className="space-y-20">
            {[
              {
                title: "Gestione Pratiche Evoluta",
                desc: "La gestione delle pratiche in AvvocApp è pensata come un flusso ordinato, automatico e completamente tracciabile, così che ogni fascicolo diventi un “contenitore intelligente” capace di organizzare documenti, attività, scadenze e collaborazioni senza richiedere interventi manuali superflui.",
                img: "pratiche.png",
                reverse: false,
                details: [
                  {
                    icon: <Folder className="text-blue-600" size={18} />,
                    title: "Creazione automatica cartelle",
                    text: "Il sistema genera immediatamente una cartella dedicata per atti, note, PEC e allegati."
                  },
                  {
                    icon: <Users className="text-blue-600" size={18} />,
                    title: "Assegnazione collaboratori",
                    text: "Affida la pratica a uno o più collaboratori con accesso immediato a documenti e scadenze."
                  },
                  {
                    icon: <Calendar className="text-blue-600" size={18} />,
                    title: "Scadenze in agenda",
                    text: "Udienze e appuntamenti sono inseriti direttamente nell'agenda dello studio con notifiche."
                  },
                  {
                    icon: <Clock className="text-blue-600" size={18} />,
                    title: "Cronistoria completa",
                    text: "Ogni evento viene registrato in una linea del tempo chiara per il controllo totale."
                  }
                ]
              },
              {
                title: "Calcolo Parcelle e Tributi",
                desc: "La gestione della parcella in AvvocApp è costruita con la stessa eleganza, precisione e trasparenza che caratterizzano l’intero ecosistema dello studio: ogni attività svolta si traduce in un valore chiaro, documentato e immediatamente fatturabile, senza calcoli manuali o rischi di errore.",
                img: "calcola parcella.png",
                reverse: true,
                details: [
                  {
                    icon: <Briefcase className="text-blue-600" size={18} />,
                    title: "Parametri Forensi",
                    text: "Il sistema applica automaticamente i Parametri Forensi vigenti, trasformando le attività in parcelle coerenti."
                  },
                  {
                    icon: <FileText className="text-blue-600" size={18} />,
                    title: "Fatturazione Automatica",
                    text: "Genera fatture complete di dati cliente, descrizioni, spese e contributi con un solo gesto."
                  },
                  {
                    icon: <LinkIcon className="text-blue-600" size={18} />,
                    title: "Integrazione Totale",
                    text: "Riconosce udienze, atti e appuntamenti rilevanti ai fini della fatturazione direttamente dalla pratica."
                  },
                  {
                    icon: <TrendingUp className="text-blue-600" size={18} />,
                    title: "Cronistoria Economica",
                    text: "Monitora parcelle emesse, fatture inviate e pagamenti ricevuti per una visione chiara dello stato economico."
                  }
                ]
              },
              {
                title: "Analisi e Reportistica",
                desc: "L’area Analisi e Reportistica di AvvocApp offre una visione chiara, strutturata e immediatamente utilizzabile dell’intera attività dello studio, trasformando dati complessi in informazioni leggibili, comparabili e utili alle decisioni strategiche.",
                img: "report andamento studio.png",
                reverse: false,
                details: [
                  {
                    icon: <BarChart3 className="text-blue-600" size={18} />,
                    title: "Analisi Operative",
                    text: "Monitora volume pratiche, carichi di lavoro e tempi medi di lavorazione per ottimizzare ogni processo."
                  },
                  {
                    icon: <TrendingUp className="text-blue-600" size={18} />,
                    title: "Salute Finanziaria",
                    text: "Fotografia completa di ricavi, fatture incassate e performance economica per singola area di attività."
                  },
                  {
                    icon: <Zap className="text-blue-600" size={18} />,
                    title: "Report Dinamici",
                    text: "Filtra e personalizza i dati per periodi, clienti o team, ottenendo solo le informazioni necessarie."
                  },
                  {
                    icon: <Compass className="text-blue-600" size={18} />,
                    title: "Indicatori Strategici",
                    text: "Evidenzia tendenze e redditività per prendere decisioni informate e pianificare la crescita."
                  }
                ]
              }
            ].map((feature, i) => (
              <div key={i} className="space-y-8">
                <div className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10`}>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-sm lg:text-base text-slate-600 mb-6 leading-relaxed font-medium text-justify">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="rounded-xl border border-slate-200 shadow-xl overflow-hidden bg-white group">
                      <img 
                        src={feature.img} 
                        alt={feature.title} 
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-700 max-h-[300px] object-cover" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/${feature.img}/1200/800`;
                        }}
                      />
                    </div>
                  </div>
                </div>

                {feature.details && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          {detail.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-[10px] uppercase tracking-wider">{detail.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium text-justify">{detail.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Perché scegliere AvvocApp?</h2>
            <p className="text-slate-600 font-medium text-sm">Confronto con i gestionali tradizionali.</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 text-left">Caratteristica</th>
                  <th className="p-4 text-center bg-blue-50/50 text-[#1e3a8a]">AvvocApp</th>
                  <th className="p-4 text-center">Tradizionali</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="p-4">Intelligenza Artificiale</td>
                  <td className="p-4 text-center bg-blue-50/30"><CheckCircle2 className="mx-auto text-emerald-500" size={18} /></td>
                  <td className="p-4 text-center opacity-30">—</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4">Calcolo Termini Automatico</td>
                  <td className="p-4 text-center bg-blue-50/30"><CheckCircle2 className="mx-auto text-emerald-500" size={18} /></td>
                  <td className="p-4 text-center opacity-30">—</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4">Redazione Atti con IA</td>
                  <td className="p-4 text-center bg-blue-50/30"><CheckCircle2 className="mx-auto text-emerald-500" size={18} /></td>
                  <td className="p-4 text-center opacity-30">—</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4">Interfaccia Moderna</td>
                  <td className="p-4 text-center bg-blue-50/30"><CheckCircle2 className="mx-auto text-emerald-500" size={18} /></td>
                  <td className="p-4 text-center">Obsoleta</td>
                </tr>
                <tr>
                  <td className="p-4">Costo di Setup</td>
                  <td className="p-4 text-center bg-blue-50/30 text-[#1e3a8a] font-bold">€ 0</td>
                  <td className="p-4 text-center">€ 500+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">Cosa dicono i nostri clienti</h2>
            <div className="inline-flex items-center justify-center p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 max-w-2xl mx-auto w-full">
              <div className="text-center">
                <Star className="mx-auto text-blue-200 mb-4" size={32} />
                <p className="text-lg font-medium text-slate-600 mb-2 italic">
                  "Prova AvvocApp e lascia il tuo primo commento"
                </p>
                <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">
                  Diventa il primo a recensire la rivoluzione legale
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Si integra con il tuo ecosistema</h2>
              <p className="text-base text-slate-600 mb-8 font-medium leading-relaxed">
                AvvocApp non lavora in isolamento. Si collega agli strumenti che già utilizzi ogni giorno per garantirti un flusso di lavoro senza interruzioni.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Pec", desc: "Gestione integrata delle comunicazioni certificate." },
                  { title: "Cloud Storage", desc: "Sincronizzazione con Google Drive e OneDrive." },
                  { title: "Calendari", desc: "Sincronizza udienze con Outlook e Google Calendar." },
                  { title: "PCT", desc: "Interfaccia diretta con il Processo Civile Telematico." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-[#1e3a8a] font-bold">
                      <CheckCircle2 size={16} />
                      <span className="text-xs uppercase tracking-wider">{item.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                "Google", "Microsoft", "Dropbox", "Aruba", "InfoCert", "LegalMail"
              ].map((brand, idx) => (
                <div key={idx} className="aspect-square bg-white rounded-xl border border-slate-200 flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-[#1e3a8a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tight">Pronto a trasformare il tuo Studio?</h2>
          <p className="text-blue-100 text-base mb-8 opacity-90">
            Inizia la tua prova di 30 giorni oggi stesso. <br />
            Nessun impegno, solo efficienza.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/prezzi" className="w-full sm:w-auto bg-white text-[#1e3a8a] px-8 py-3 rounded-lg text-base font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 group">
              Piani e Prezzi
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://workflow-engine-81.emergent.host?email=demo@avvocapp.it&password=Demo2026!" target="_blank" className="w-full sm:w-auto bg-transparent text-white border border-white/30 px-8 py-3 rounded-lg text-base font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Esplora la Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
