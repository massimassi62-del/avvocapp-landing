import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  FileText, 
  ShieldCheck, 
  Zap, 
  BrainCircuit, 
  MessageSquare, 
  ArrowRight,
  Lock,
  Scale,
  LayoutDashboard,
  Users,
  BarChart3,
  PieChart,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="pb-8 bg-white">
      <Helmet>
        <title>Funzionalità AI per Avvocati | AvvocApp</title>
        <meta name="description" content="Scopri le funzionalità avanzate di AvvocApp: analisi documentale IA, ricerca giurisprudenziale, redazione assistita e portale clienti sicuro." />
        <meta property="og:title" content="Funzionalità AI per Avvocati | AvvocApp" />
        <meta property="og:description" content="Analisi documentale, ricerca giurisprudenziale e redazione assistita potenziata dall'IA." />
        <meta name="twitter:title" content="Funzionalità AI per Avvocati | AvvocApp" />
        <meta name="twitter:description" content="Scopri come l'IA di AvvocApp può trasformare il tuo studio legale." />
      </Helmet>
      {/* Hero Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#1e3a8a] text-sm font-bold uppercase tracking-wider mb-8 border border-blue-100"
          >
            <BrainCircuit size={16} />
            AI Legale di Nuova Generazione
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-8"
          >
            L'Intelligenza Artificiale <br className="hidden lg:block" /> che capisce il Diritto.
          </motion.h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            AvvocApp non è solo un gestionale. È un assistente legale potenziato dall'IA che analizza, redige e ricerca per te, permettendoti di concentrarti solo sulla strategia.
          </p>
        </div>
      </section>

      {/* Main AI Capabilities */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Analisi Documentale Avanzata</h2>
              <p className="text-base text-slate-600 mb-8 leading-relaxed font-medium">
                Carica centinaia di pagine di atti, perizie o sentenze. L'IA di AvvocApp estrae i punti chiave, identifica i rischi legali e suggerisce le migliori linee difensive in pochi secondi.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Sintesi Intelligente", desc: "Riassunti esecutivi di atti complessi e voluminosi.", icon: <FileText className="text-blue-600" size={20} /> },
                  { title: "Rilevazione Rischi", desc: "Identificazione automatica di clausole vessatorie o criticità.", icon: <ShieldCheck className="text-blue-600" size={20} /> },
                  { title: "Timeline Automatica", desc: "Ricostruzione cronologica dei fatti dai documenti caricati.", icon: <Zap className="text-blue-600" size={20} /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="bg-blue-50 p-3 rounded-lg h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-blue-200/30 blur-3xl rounded-full -z-10" />
              <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-800 text-white font-mono text-sm leading-relaxed">
                <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-500 text-xs ml-4">avvocapp_ai_engine.v2</span>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <span className="text-emerald-400">➜</span>
                    <p className="text-slate-300">Analisi contratto_locazione_commerciale.pdf...</p>
                  </div>
                  <div className="pl-6 space-y-3">
                    <p className="text-blue-400">[RILEVATO]</p>
                    <p className="text-slate-400">Art. 7: Clausola di recesso anticipato non conforme alla L. 392/78.</p>
                    <p className="text-blue-400">[SUGGERIMENTO]</p>
                    <p className="text-slate-400">Modificare il preavviso da 3 a 6 mesi per evitare nullità parziale del contratto.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-emerald-400">➜</span>
                    <p className="text-slate-300 animate-pulse">Generazione bozza clausola correttiva...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ricerca Giurisprudenziale",
                desc: "Trova sentenze pertinenti non solo per parole chiave, ma per concetto giuridico e contesto del caso.",
                icon: <Search className="text-blue-600" size={24} />
              },
              {
                title: "Redazione Assistita",
                desc: "Genera bozze di atti, diffide e pareri partendo da semplici input o fatti di causa.",
                icon: <Sparkles className="text-blue-600" size={24} />
              },
              {
                title: "Chat Legale",
                desc: "Interagisci con l'IA per approfondire temi normativi o confrontarti su una strategia difensiva.",
                icon: <MessageSquare className="text-blue-600" size={24} />
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Portal Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 order-2 lg:order-1">
              <div className="rounded-3xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-50 p-4">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="bg-[#1e3a8a] p-4 text-white flex justify-between items-center">
                    <span className="font-bold text-sm">Area Riservata Cliente</span>
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Ultimo Documento</p>
                        <p className="text-sm font-bold text-slate-900">Atto di Citazione_firmato.pdf</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-slate-900">Stato Pratica: <span className="text-emerald-600">In Corso</span></p>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-3/4" />
                      </div>
                    </div>
                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold">Scarica Fascicolo</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider mb-6 border border-purple-100">
                <Users size={14} />
                Fidelizzazione
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Portale Clienti Dedicato</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                Offri ai tuoi clienti un'esperienza premium. Un'area riservata dove possono monitorare lo stato delle pratiche, scaricare documenti e comunicare in modo sicuro, riducendo drasticamente le telefonate informative in studio.
              </p>
              <ul className="space-y-4">
                {[
                  "Accesso sicuro con credenziali dedicate",
                  "Download immediato di atti e documenti",
                  "Monitoraggio timeline della pratica",
                  "Notifiche automatiche sugli aggiornamenti"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                    <CheckCircle2 className="text-emerald-500" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-6 border border-white/10">
                <BarChart3 size={14} />
                Business Intelligence
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 tracking-tight">Dashboard Analitica Avanzata</h2>
              <p className="text-blue-100 text-lg mb-10 font-medium leading-relaxed">
                Trasforma i dati del tuo studio in decisioni strategiche. Monitora la redditività, i carichi di lavoro e le performance in tempo reale con grafici intuitivi e report dettagliati.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <PieChart className="text-blue-400 mb-4" size={24} />
                  <h4 className="font-bold mb-2">Analisi Redditività</h4>
                  <p className="text-xs text-slate-400">Scopri quali aree del diritto sono più profittevoli per il tuo studio.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <LayoutDashboard className="text-blue-400 mb-4" size={24} />
                  <h4 className="font-bold mb-2">Carico di Lavoro</h4>
                  <p className="text-xs text-slate-400">Bilancia le attività tra i collaboratori in base alla disponibilità reale.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-2xl text-slate-900">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-sm">Performance Studio Q1</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Fatturato Previsto", value: "€ 142.500", color: "bg-blue-500", width: "w-3/4" },
                    { label: "Pratiche Chiuse", value: "84", color: "bg-emerald-500", width: "w-1/2" },
                    { label: "Nuovi Clienti", value: "+12%", color: "bg-purple-500", width: "w-2/3" }
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400 uppercase">{stat.label}</span>
                        <span>{stat.value}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`${stat.color} h-full ${stat.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-around">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ROI Media</p>
                    <p className="text-lg font-bold text-emerald-600">+24%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ore Risparmiate</p>
                    <p className="text-lg font-bold text-blue-600">120h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1e3a8a] rounded-3xl p-8 lg:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-6 border border-white/10">
                  <Lock size={14} />
                  Privacy & Sicurezza
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-6 tracking-tight">I tuoi dati sono sacri.</h2>
                <p className="text-blue-100 text-base mb-8 font-medium leading-relaxed">
                  Sappiamo quanto sia delicato il segreto professionale. Per questo abbiamo progettato l'IA di AvvocApp con un approccio "Privacy-First".
                </p>
                
                <ul className="space-y-6">
                  {[
                    "Nessun addestramento sui tuoi dati: i tuoi documenti non lasciano mai il tuo ambiente protetto.",
                    "Autenticazione 2FA: accesso sicuro garantito tramite verifica a due fattori.",
                    "Conformità GDPR: server situati esclusivamente in territorio europeo.",
                    "Isolamento totale: ogni studio ha un'istanza IA dedicata e isolata."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-100 font-medium">
                      <ShieldCheck className="shrink-0 text-blue-300 mt-1" size={18} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center">
                <div className="p-12 bg-white/5 rounded-full border border-white/10 relative">
                  <div className="absolute inset-0 animate-pulse bg-blue-400/10 rounded-full" />
                  <Scale size={120} className="text-blue-300 relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Pronto a testare il futuro del diritto?</h2>
          <p className="text-slate-600 text-lg mb-10 font-medium">
            Accedi alla nostra demo e scopri come l'IA può potenziare il tuo studio legale oggi stesso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/prezzi" className="w-full sm:w-auto bg-[#1e3a8a] text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-[#1e40af] transition-all shadow-lg flex items-center justify-center gap-2 group">
              Vedi i Piani
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://workflow-engine-81.emergent.host?email=demo@avvocapp.it&password=Demo2026!" target="_blank" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              Prova la Demo AI
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
