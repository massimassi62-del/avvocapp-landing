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
  BarChart3,
  MessageCircle,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useImages } from '../context/ImageContext';
import { useSettings } from '../context/SettingsContext';
import { Helmet } from 'react-helmet-async';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = React.useState(0);
  const target = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');

  React.useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

const Home = () => {
  const { images } = useImages();
  const { settings } = useSettings();
  return (
    <div className="overflow-hidden bg-white">
      <Helmet>
        <title>AvvocApp - Il Gestionale Intelligente per lo Studio Legale Moderno</title>
        <meta name="description" content="Automatizza le scadenze, redigi atti con l'IA e gestisci la contabilità del tuo studio legale con AvvocApp. Il gestionale moderno per avvocati." />
        <meta property="og:title" content="AvvocApp - Il Gestionale Intelligente per lo Studio Legale Moderno" />
        <meta property="og:description" content="Automatizza le scadenze, redigi atti con l'IA e gestisci la contabilità del tuo studio legale con AvvocApp." />
        <meta property="og:image" content={images.home.dashboard} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-[#1e3a8a] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 blur-3xl rounded-full" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/20 backdrop-blur-sm"
              >
                <Sparkles size={14} className="text-blue-300" />
                Potenziato da Gemini 1.5 Pro
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
              >
                La gestione del tuo studio legale, <span className="text-blue-300">semplificata.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed"
              >
                Pratiche, clienti, scadenze e documenti in un'unica piattaforma pensata per professionisti del diritto italiano.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Users size={18} className="text-blue-300" />
                  <span className="text-sm font-medium">Multi-utente</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <ShieldCheck size={18} className="text-blue-300" />
                  <span className="text-sm font-medium">Conforme GDPR</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/admin" 
                  className="px-8 py-4 bg-white text-[#1e3a8a] rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2 group"
                >
                  Prova ora gratis
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#video" 
                  className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  Guarda demo
                  <Zap size={20} className="text-blue-300" />
                </a>
              </motion.div>
            </div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-400/20 blur-3xl rounded-[2rem] -z-10" />
              <div className="rounded-2xl border border-white/20 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-md p-2">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src={images.home.dashboard} 
                    alt="AvvocApp Dashboard" 
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = "https://picsum.photos/seed/legal-software-ui/1600/900";
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Efficienza</p>
                    <p className="text-sm font-bold text-slate-900">+45% Risparmio tempo</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Pratiche Gestite", value: "15k+", icon: <Folder className="text-blue-600" size={20} /> },
              { label: "Avvocati Attivi", value: "2.5k+", icon: <Users className="text-blue-600" size={20} /> },
              { label: "Tempo Risparmiato", value: "40%", icon: <Clock className="text-blue-600" size={20} /> },
              { label: "Soddisfazione", value: "99%", icon: <Star className="text-blue-600" size={20} /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  <Counter value={stat.value} />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Presentation Section */}
      <section id="video" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">Scopri AvvocApp in 2 minuti</h2>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto">
              Guarda come la nostra piattaforma può rivoluzionare il tuo modo di lavorare con una demo rapida.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group"
          >
            {settings.presentationVideoUrl?.includes('youtube.com') || settings.presentationVideoUrl?.includes('youtu.be') ? (
              <iframe 
                className="w-full h-full"
                src={settings.presentationVideoUrl}
                title="AvvocApp Presentation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                className="w-full h-full object-cover"
                src={settings.presentationVideoUrl}
                controls
                poster={images.home.dashboard}
              >
                Il tuo browser non supporta il tag video.
              </video>
            )}
          </motion.div>
        </div>
      </section>
      {/* Bento Grid Features */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(30,58,138,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Potenza e Semplicità in un unico posto.</h2>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto">
              Ogni aspetto del tuo studio, ottimizzato e sotto controllo con le tecnologie più avanzate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Feature - IA */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-100 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Intelligenza Artificiale Legale</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8 max-w-md">
                  Redigi atti, sintetizza fascicoli e analizza giurisprudenza in pochi secondi grazie all'integrazione nativa con Gemini 1.5 Pro.
                </p>
              </div>
              <div className="relative z-10 rounded-2xl border border-slate-100 shadow-2xl overflow-hidden bg-slate-50">
                <img src="https://picsum.photos/seed/ai-legal/1200/600" alt="IA Legale" className="w-full h-auto" />
              </div>
            </motion.div>

            {/* Security Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#1e3a8a] p-8 rounded-[2rem] text-white flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full -mb-24 -mr-24 blur-2xl group-hover:bg-white/10 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/20">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Sicurezza Militare</h3>
                <p className="text-blue-100 font-medium leading-relaxed">
                  I tuoi dati sono protetti da crittografia end-to-end e ospitati su server europei conformi al GDPR.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-300">
                  <CheckCircle2 size={16} />
                  <span>Certificato ISO 27001</span>
                </div>
              </div>
            </motion.div>

            {/* Cloud Sync */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Sincronizzazione Cloud</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  Accedi alle tue pratiche da qualsiasi dispositivo, ovunque tu sia. Il tuo studio è sempre con te.
                </p>
              </div>
              <div className="mt-6 flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-[#1e3a8a]">
                  +12
                </div>
              </div>
            </motion.div>

            {/* Reporting */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-slate-900 p-8 rounded-[2rem] text-white flex flex-col md:flex-row gap-8 items-center group"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 border border-white/10">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Analisi e Reportistica</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Monitora l'andamento del tuo studio con dashboard intuitive e report esportabili in un click.
                </p>
              </div>
              <div className="flex-1 w-full bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="space-y-4">
                  {[
                    { label: "Ricavi Mensili", val: 75 },
                    { label: "Pratiche Chiuse", val: 90 },
                    { label: "Nuovi Clienti", val: 60 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val}%` }}
                          className="h-full bg-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
                img: "/pratiche.png",
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
                img: "/calcola parcella.png",
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
                img: "/report andamento studio.png",
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
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-8"
              >
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
                          e.currentTarget.src = `https://picsum.photos/seed/${feature.img.replace(/\s/g, '-')}/1200/800`;
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Perché scegliere AvvocApp?</h2>
            <p className="text-slate-600 font-medium">Confronto con i gestionali tradizionali.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Cosa dicono i nostri clienti</h2>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto">
              Unisciti a migliaia di professionisti che hanno già trasformato il loro studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Avv. Marco Rossi",
                role: "Studio Legale Rossi & Associati",
                text: "AvvocApp ha cambiato radicalmente il nostro modo di lavorare. L'integrazione con l'IA ci permette di redigere atti complessi in metà tempo.",
                avatar: "https://i.pravatar.cc/150?u=marco"
              },
              {
                name: "Avv. Laura Bianchi",
                role: "Specialista in Diritto Civile",
                text: "Finalmente un gestionale moderno, intuitivo e che non richiede mesi di formazione. La gestione delle scadenze è impeccabile.",
                avatar: "https://i.pravatar.cc/150?u=laura"
              },
              {
                name: "Avv. Giuseppe Verdi",
                role: "Partner presso LexGlobal",
                text: "La sicurezza dei dati era la mia priorità. Con AvvocApp dormo sonni tranquilli sapendo che tutto è conforme al GDPR e crittografato.",
                avatar: "https://i.pravatar.cc/150?u=giuseppe"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group"
              >
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1e3a8a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
            Pronto a portare il tuo studio nel futuro?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Inizia oggi la tua prova gratuita di 14 giorni. Nessuna carta di credito richiesta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/admin" 
              className="px-10 py-5 bg-white text-[#1e3a8a] rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-2 group"
            >
              Inizia ora gratis
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contatti" 
              className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Parla con un esperto
            </Link>
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

      {/* Floating Action Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Link 
          to="/contatti"
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110 group"
        >
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
