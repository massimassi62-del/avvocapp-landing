/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Calculator, 
  TrendingUp, 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  Star, 
  Folder,
  FlaskConical,
  Gift,
  Download,
  Target,
  Info,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [hoursSaved, setHoursSaved] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(150);

  const monthlySavings = hoursSaved * hourlyRate;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="pt-16 pb-8 bg-white">
      {/* Header */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6"
          >
            Piani e Prezzi
          </motion.h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Scegli la soluzione ideale per il tuo studio legale. Trasparenza totale, nessun costo nascosto.
          </p>
        </div>
      </section>

      {/* Demo & CTA Section */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="https://workflow-engine-81.emergent.host?email=demo@avvocapp.it&password=Demo2026!" target="_blank" className="w-full sm:w-auto bg-[#1e3a8a] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#1e40af] transition-all shadow-lg flex items-center justify-center gap-2 group">
                Registra il tuo Studio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://workflow-engine-81.emergent.host?email=demo@avvocapp.it&password=Demo2026!" target="_blank" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                Esplora la Demo
              </a>
            </div>

            {/* Demo Credentials Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm"
            >
              <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider text-center">Accesso Demo (Sola Lettura)</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Email:</span>
                  <code className="bg-white px-2 py-1 rounded border border-slate-200 text-[#1e3a8a] font-semibold">demo@avvocapp.it</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Password:</span>
                  <code className="bg-white px-2 py-1 rounded border border-slate-200 text-[#1e3a8a] font-semibold">Demo2026!</code>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: 'Piano Base', 
                price: '25,00', 
                desc: 'Ideale per chi preferisce il controllo locale',
                footer: 'Salvataggio solo in locale',
                icon: <Folder size={24} className="text-slate-900" />,
                bgColor: 'bg-blue-50/30',
                borderColor: 'border-blue-200',
                cta: 'Inizia con il Piano Base',
                features: [
                  'Salvataggio solo in locale (File System Access API)',
                  'Nessun accesso da mobile',
                  'Nessuna sincronizzazione cloud',
                  'Nessun backup automatico',
                  'Gestione pratiche e clienti',
                  'Agenda e scadenze',
                  'Dashboard base'
                ] 
              },
              { 
                name: 'Piano Pro', 
                price: '50,00', 
                desc: 'La soluzione cloud completa per lo studio moderno',
                popular: true, 
                footer: 'Accesso cloud multi-dispositivo',
                icon: <Sparkles size={24} className="text-slate-900" />,
                bgColor: 'bg-purple-50/30',
                borderColor: 'border-purple-200',
                cta: 'Attiva il Piano Pro',
                features: [
                  'Salvataggio su Supabase Cloud',
                  'Accesso da PC, mobile e tablet',
                  'Backup automatici',
                  'Portale clienti incluso',
                  'Workflow intelligenti inclusi',
                  'Condivisione documenti',
                  'Dashboard avanzata',
                  'Sicurezza avanzata (RLS, URL firmati)',
                  'Integrazioni: Pec, Calendar',
                  'Business Intelligence base'
                ] 
              },
              { 
                name: 'Piano Premium', 
                price: '80,00', 
                desc: 'Per studi che richiedono il massimo delle prestazioni',
                footer: 'Tutto incluso, senza compromessi',
                icon: <Star size={24} className="text-slate-900" />,
                bgColor: 'bg-amber-50/30',
                borderColor: 'border-amber-200',
                cta: 'Passa al Premium',
                features: [
                  'Tutto ciò che è incluso nel Pro',
                  'Versioning documenti',
                  'Audit trail completo',
                  'Limiti storage e banda elevati',
                  'Priorità di elaborazione',
                  'Business Intelligence avanzata',
                  'Automazioni estese',
                  'Supporto premium'
                ] 
              },
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-2xl border flex flex-col ${plan.borderColor} ${plan.bgColor} shadow-sm transition-all hover:shadow-md ${plan.popular ? 'scale-105 z-10' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md font-bold uppercase tracking-wider text-[10px]">
                    Consigliato
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-2">
                  {plan.icon}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{plan.name}</h3>
                </div>
                
                <p className="text-sm text-slate-500 mb-6 font-medium">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-slate-900">{plan.price} €</span>
                  <span className="text-sm text-slate-500">/mese</span>
                </div>
                
                <ul className="space-y-4 mb-8 text-sm font-medium text-slate-600 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 text-emerald-500 mt-0.5" size={16} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-xs text-slate-400 mb-6 font-medium">{plan.footer}</p>
                  <a href="https://workflow-engine-81.emergent.host?email=demo@avvocapp.it&password=Demo2026!" target="_blank" className="block w-full py-3.5 rounded-lg text-sm font-bold text-center transition-all bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 group">
                    {plan.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Comparative Table */}
          <div className="mt-12 max-w-5xl mx-auto overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-6 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">Funzione</th>
                    <th className="p-6 text-center text-sm font-bold text-slate-900 uppercase tracking-wider">Base</th>
                    <th className="p-6 text-center text-sm font-bold text-[#1e3a8a] uppercase tracking-wider bg-blue-50/30">Pro</th>
                    <th className="p-6 text-center text-sm font-bold text-slate-900 uppercase tracking-wider">Premium</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { label: 'Gestione pratiche e clienti', base: true, pro: true, premium: true },
                    { label: 'Agenda e scadenze', base: true, pro: true, premium: true },
                    { label: 'Dashboard base', base: true, pro: true, premium: true },
                    { label: 'Salvataggio locale documenti', base: true, pro: false, premium: false },
                    { label: 'Salvataggio cloud (Supabase)', base: false, pro: true, premium: true },
                    { label: 'Accesso documenti da mobile', base: false, pro: true, premium: true },
                    { label: 'Backup automatici', base: false, pro: true, premium: true },
                    { label: 'Portale clienti', base: false, pro: true, premium: true },
                    { label: 'Workflow intelligenti', base: false, pro: true, premium: true },
                    { label: 'Condivisione documenti', base: false, pro: true, premium: true },
                    { label: 'Versioning documenti', base: false, pro: false, premium: true },
                    { label: 'Audit trail', base: false, pro: false, premium: true },
                    { label: 'Business Intelligence', base: false, pro: 'Base', premium: 'Avanzata' },
                    { label: 'Limiti storage elevati', base: false, pro: true, premium: 'Estesi' },
                    { label: 'Priorità elaborazione', base: false, pro: false, premium: true },
                    { label: 'Prezzo', base: '25€', pro: '50€', premium: '80€' },
                  ].map((row, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} border-b border-slate-100 last:border-0`}>
                      <td className="p-6 font-medium text-slate-700">{row.label}</td>
                      <td className="p-6 text-center">
                        {typeof row.base === 'boolean' ? (
                          row.base ? <CheckCircle2 className="mx-auto text-emerald-500" size={20} /> : <X className="mx-auto text-slate-300" size={20} />
                        ) : <span className="font-bold text-slate-900">{row.base}</span>}
                      </td>
                      <td className="p-6 text-center bg-blue-50/10">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <CheckCircle2 className="mx-auto text-blue-600" size={20} /> : <X className="mx-auto text-slate-300" size={20} />
                        ) : <span className="font-bold text-[#1e3a8a]">{row.pro}</span>}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? <CheckCircle2 className="mx-auto text-emerald-500" size={20} /> : <X className="mx-auto text-slate-300" size={20} />
                        ) : <span className="font-bold text-slate-900">{row.premium}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Experience Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1e3a8a] text-[10px] font-bold uppercase tracking-wider mb-6 border border-blue-100">
                <Info size={14} />
                Esperienza di Prova
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">La tua prova dell'app</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                La <strong>prova dell’app</strong> è pensata per offrire allo studio un’esperienza completa, trasparente e senza rischi: prima attraverso una <em>demo guidata in sola lettura</em>, poi con una <em>prova gratuita di 30 giorni</em> che permette di utilizzare realmente tutte le funzionalità operative.
              </p>
            </div>

            <div className="space-y-8">
              {/* Demo Version */}
              <div className="bg-slate-50 rounded-3xl p-6 lg:p-10 border border-slate-200">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <FlaskConical className="text-blue-600" size={32} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">🧪 Versione Demo: esplorazione immediata e senza rischi</h3>
                    <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                      Nella pagina dedicata è disponibile una <strong>versione demo</strong> dell’app, accessibile inserendo le credenziali indicate. La demo permette di:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                      {[
                        "Accedere all’interfaccia completa dell’app",
                        "Esplorare tutte le sezioni (agenda, pratiche, documenti, parcelle, reportistica)",
                        "Vedere esempi reali di pratiche, scadenze, documenti e fatture",
                        "Comprendere il flusso di lavoro e la logica dell’intero sistema"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                          <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-[#1e3a8a] font-semibold">
                      La demo è <strong>in sola lettura</strong>: non è possibile modificare, cancellare o creare nuovi contenuti. Serve a osservare, capire e valutare l’app senza alcun rischio per i dati.
                    </div>
                  </div>
                </div>
              </div>

              {/* 30-Day Trial */}
              <div className="bg-slate-50 rounded-3xl p-6 lg:p-10 border border-slate-200">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <Gift className="text-emerald-600" size={32} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">🎁 Prova gratuita di 30 giorni: utilizzo reale dell’app</h3>
                    <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                      Per chi desidera testare l’app in modo operativo, è disponibile una <strong>prova gratuita di 30 giorni</strong>, durante la quale lo studio può:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {[
                        "Creare pratiche reali",
                        "Caricare documenti",
                        "Gestire scadenze e agenda",
                        "Assegnare attività ai collaboratori",
                        "Generare parcelle e fatture",
                        "Analizzare i dati tramite reportistica"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                          <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm font-bold text-slate-700">
                      La prova è completa e senza limitazioni: l’app funziona esattamente come nella versione a pagamento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-slate-50 rounded-3xl p-6 lg:p-10 border border-slate-200">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <Download className="text-amber-600" size={32} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">📥 Gestione dei dati al termine della prova</h3>
                    <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                      Alla scadenza dei 30 giorni, lo studio può scegliere tra due strade:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-2">Attivare un piano</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Continua a utilizzare l’app senza interruzioni mantenendo tutto il lavoro svolto.</p>
                      </div>
                      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-2">Non proseguire</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Mantenendo comunque la possibilità di scaricare i propri dati.</p>
                      </div>
                    </div>
                    <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-sm text-amber-900 font-medium">
                      In caso di mancata attivazione, i dati rimangono disponibili per <strong>15 giorni</strong> per essere esportati e salvati localmente. Trascorso questo periodo, per ragioni di sicurezza e conformità normativa, <strong>i dati devono essere eliminati in modo definitivo</strong>.
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Summary */}
              <div className="bg-[#1e3a8a] rounded-3xl p-6 lg:p-10 text-white shadow-xl">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                    <Target className="text-blue-200" size={32} />
                  </div>
                  <div className="flex-grow text-center lg:text-left">
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">🎯 Risultato: una prova chiara, sicura e rispettosa dei dati</h3>
                    <p className="text-blue-100 font-medium leading-relaxed">
                      La combinazione tra demo in sola lettura e prova gratuita operativa permette allo studio di valutare l’app con serenità, comprendere ogni funzionalità e decidere con consapevolezza, sapendo che i propri dati sono sempre protetti e recuperabili.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-6 border border-white/10">
                  <Calculator size={14} />
                  Calcolatore ROI
                </div>
                <h2 className="text-3xl font-bold mb-6 tracking-tight">Quanto vale il tuo tempo?</h2>
                <p className="text-slate-400 mb-10 font-medium leading-relaxed">
                  Scopri il risparmio economico mensile automatizzando le attività ripetitive con AvvocApp.
                </p>

                <div className="space-y-10">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Ore risparmiate / mese</label>
                      <span className="text-blue-400 font-bold">{hoursSaved} ore</span>
                    </div>
                    <input 
                      type="range" min="1" max="50" value={hoursSaved} 
                      onChange={(e) => setHoursSaved(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tariffa oraria media (€)</label>
                      <span className="text-blue-400 font-bold">€{hourlyRate}</span>
                    </div>
                    <input 
                      type="range" min="50" max="500" step="10" value={hourlyRate} 
                      onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
                <TrendingUp className="mx-auto text-blue-400 mb-6" size={48} />
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Risparmio Mensile Stimato</p>
                <div className="text-5xl font-bold text-white mb-6 tracking-tight">€{monthlySavings.toLocaleString()}</div>
                <div className="h-px bg-white/10 mb-6" />
                <p className="text-sm font-medium text-slate-300 mb-8">
                  Pari a <span className="text-white font-bold">€{yearlySavings.toLocaleString()}</span> all'anno di valore recuperato.
                </p>
                <Link to="/contatti" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-lg text-sm font-bold hover:bg-slate-100 transition-all">
                  Inizia a risparmiare <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Domande Frequenti</h2>
            <p className="text-slate-600 font-medium">Tutto quello che devi sapere su AvvocApp.</p>
          </div>

          <div className="space-y-6">
            {[
              { q: "Posso cambiare piano in qualsiasi momento?", a: "Certamente. Puoi effettuare l'upgrade o il downgrade del tuo piano direttamente dalle impostazioni del tuo account." },
              { q: "I miei dati sono al sicuro?", a: "Sì, utilizziamo protocolli di sicurezza avanzati inclusa l'autenticazione 2FA e i server sono situati in Europa (GDPR compliant). L'IA non usa i tuoi dati per il training." },
              { q: "Cosa succede dopo i 30 giorni di prova?", a: "Al termine della prova potrai scegliere se sottoscrivere un abbonamento. Se decidi di non farlo, il tuo account verrà sospeso ma i dati rimarranno disponibili per l'esportazione per 60 giorni." },
              { q: "Offrite sconti per pagamenti annuali?", a: "Sì, scegliendo la fatturazione annuale riceverai uno sconto del 20% sul prezzo totale." },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-base font-bold text-slate-900 mb-3 flex items-start gap-3">
                  <HelpCircle className="text-[#1e3a8a] shrink-0 mt-0.5" size={18} />
                  {faq.q}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed ml-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
