import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "Cos'è AvvocApp e come può aiutare il mio studio?",
      a: "AvvocApp è un gestionale legale di nuova generazione che integra l'Intelligenza Artificiale per automatizzare le attività ripetitive. Aiuta il tuo studio riducendo i tempi di redazione atti, automatizzando il calcolo dei termini e centralizzando la gestione di pratiche e scadenze."
    },
    {
      q: "I miei dati sono al sicuro e conformi al GDPR?",
      a: "Assolutamente sì. Tutti i dati sono ospitati su server sicuri situati in Europa e protetti da autenticazione 2FA obbligatoria. Siamo pienamente conformi al GDPR e i tuoi dati non vengono mai utilizzati per addestrare modelli di IA pubblici."
    },
    {
      q: "L'Intelligenza Artificiale può sostituire il lavoro dell'avvocato?",
      a: "No, l'IA di AvvocApp è progettata per essere un assistente potente, non un sostituto. Si occupa di compiti a basso valore aggiunto (ricerca, estrazione dati, bozze preliminari) permettendoti di concentrarti sulla strategia legale e sulla relazione con il cliente."
    },
    {
      q: "Posso importare i dati dal mio attuale gestionale?",
      a: "Sì, offriamo strumenti di importazione assistita per i principali gestionali sul mercato. Il nostro team di supporto può aiutarti durante la fase di migrazione per garantire che nessun dato vada perduto."
    },
    {
      q: "Qual è la differenza tra i piani Base, Professional e Premium?",
      a: "Il piano Base è ideale per singoli professionisti. Il piano Professional aggiunge l'IA Legale e strumenti di automazione per piccoli studi. Il piano Premium è la soluzione completa con utenti illimitati, IA avanzata per documenti e reportistica strategica."
    },
    {
      q: "È prevista una formazione per l'utilizzo del software?",
      a: "Sì, AvvocApp è estremamente intuitivo, ma offriamo comunque webinar settimanali, una documentazione completa e, per i piani Premium, sessioni di formazione personalizzate per tutto il team dello studio."
    },
    {
      q: "Come funziona il calcolo automatico dei termini?",
      a: "Il sistema monitora le scadenze inserite e, basandosi sul codice di procedura civile e penale aggiornato, calcola automaticamente i termini a ritroso o in avanti, inviando notifiche preventive per evitare qualsiasi decadenza."
    },
    {
      q: "Posso accedere ad AvvocApp da dispositivi mobili?",
      a: "Certamente. AvvocApp è una piattaforma cloud nativa, accessibile tramite browser da qualsiasi dispositivo (PC, Mac, Tablet, Smartphone) con un'interfaccia ottimizzata per il mobile."
    },
    {
      q: "Cosa succede se decido di disdire l'abbonamento?",
      a: "Non ci sono vincoli di permanenza. Se decidi di disdire, avrai 60 giorni di tempo per esportare tutti i tuoi dati in formati standard (Excel, PDF, ZIP). Dopo tale periodo, i dati verranno eliminati definitivamente per la tua sicurezza."
    },
    {
      q: "Offrite supporto tecnico in caso di problemi?",
      a: "Sì, il supporto è incluso in tutti i piani. Il piano Base ha supporto via email, mentre i piani Professional e Premium includono supporto prioritario e dedicato per risolvere qualsiasi dubbio in tempi rapidissimi."
    }
  ];

  return (
    <div className="pt-16 pb-8 bg-white">
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6"
          >
            Domande Frequenti
          </motion.h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Tutto quello che devi sapere su AvvocApp e su come può rivoluzionare il tuo modo di lavorare.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-200 ${openIndex === index ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-slate-900 leading-tight">
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-8 rounded-3xl bg-slate-900 text-white text-center">
            <h3 className="text-xl font-bold mb-4">Hai altre domande?</h3>
            <p className="text-slate-400 mb-8 font-medium">Il nostro team è a tua disposizione per qualsiasi chiarimento.</p>
            <Link to="/contatti" className="inline-flex bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Contattaci Ora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
