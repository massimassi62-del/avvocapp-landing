import React, { useState } from 'react';
import { useImages } from '../context/ImageContext';
import { Save, RotateCcw, Image as ImageIcon, Lock, ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { images, updateImage, resetImages } = useImages();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password errata');
    }
  };

  const handleFileUpload = (category: any, key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateImage(category, key, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-2 tracking-tight">Accesso Amministratore</h1>
          <p className="text-center text-slate-500 text-sm mb-8 font-medium">Inserisci la password per gestire le immagini</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-[#1e3a8a] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1e40af] transition-all shadow-lg"
            >
              Accedi
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-bold text-slate-400 hover:text-[#1e3a8a] transition-all flex items-center justify-center gap-2">
              <ArrowLeft size={14} /> Torna al sito
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestione Immagini</h1>
            <p className="text-slate-500 font-medium">Personalizza le foto del tuo sito AvvocApp</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={resetImages}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RotateCcw size={16} /> Ripristina Default
            </button>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg">
              Vedi Sito
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {/* Home Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <ImageIcon size={20} className="text-blue-600" /> Home Page
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Dashboard Preview (Immagine Principale)</label>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-50 text-[#1e3a8a] rounded-xl font-bold text-sm cursor-pointer hover:bg-blue-100 transition-all border border-blue-100">
                        <Upload size={18} /> Carica Foto dal Computer
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => handleFileUpload('home', 'dashboard', e)}
                        />
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                          <span className="text-[10px] font-bold uppercase">URL</span>
                        </div>
                        <input 
                          type="text" 
                          value={images.home.dashboard}
                          onChange={(e) => updateImage('home', 'dashboard', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                          placeholder="Oppure incolla URL..."
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Puoi caricare un file direttamente o incollare un link esterno.
                    </p>
                  </div>
                  <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-100 shadow-inner">
                    <img src={images.home.dashboard} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <ImageIcon size={20} className="text-blue-600" /> Blog Posts
              </h2>
            </div>
            <div className="p-6 space-y-8">
              {[
                { key: 'post1', label: 'Post 1: Legal Tech' },
                { key: 'post2', label: 'Post 2: Cybersecurity' },
                { key: 'post3', label: 'Post 3: Innovazione' }
              ].map((post) => (
                <div key={post.key} className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">{post.label}</label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-100 transition-all border border-slate-200">
                        <Upload size={14} /> Carica Foto
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => handleFileUpload('blog', post.key, e)}
                        />
                      </label>
                      <input 
                        type="text" 
                        value={(images.blog as any)[post.key]}
                        onChange={(e) => updateImage('blog', post.key, e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs font-medium"
                        placeholder="O incolla URL..."
                      />
                    </div>
                  </div>
                  <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-100 shadow-inner h-32">
                    <img src={(images.blog as any)[post.key]} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
          <p className="text-sm font-bold text-[#1e3a8a] mb-2 tracking-tight">Le modifiche vengono salvate automaticamente nel tuo browser.</p>
          <p className="text-xs text-blue-400 font-medium">Per renderle permanenti per tutti gli utenti, dovrai caricare i file reali nel progetto.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
