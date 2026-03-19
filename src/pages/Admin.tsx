import React, { useState } from 'react';
import { useImages } from '../context/ImageContext';
import { useBlog, BlogPost } from '../context/BlogContext';
import { Save, RotateCcw, Image as ImageIcon, Lock, ArrowLeft, Upload, BarChart3, Users, Clock, MousePointer2, Plus, Trash2, Edit2, X, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { images, updateImage, resetImages } = useImages();
  const { posts, addPost, updatePost, deletePost, resetPosts } = useBlog();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Blog management state
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [isNewPost, setIsNewPost] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password errata');
    }
  };

  const handleFileUpload = (category: any, key: string, e: React.ChangeEvent<HTMLInputElement>, isBlog?: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isBlog) {
          setCurrentPost(prev => ({ ...prev, image: reader.result as string }));
        } else {
          updateImage(category, key, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsNewPost(false);
    setIsEditingPost(true);
  };

  const openNewPost = () => {
    setCurrentPost({
      title: '',
      excerpt: '',
      author: '',
      date: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }),
      category: 'Legal Tech',
      image: 'https://picsum.photos/seed/legal/800/600'
    });
    setIsNewPost(true);
    setIsEditingPost(true);
  };

  const savePost = () => {
    if (isNewPost) {
      addPost(currentPost as Omit<BlogPost, 'id'>);
    } else {
      updatePost(currentPost.id!, currentPost);
    }
    setIsEditingPost(false);
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
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Amministrazione AvvocApp</h1>
            <p className="text-slate-500 font-medium">Gestisci contenuti, immagini e blog</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { resetImages(); resetPosts(); }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RotateCcw size={16} /> Ripristina Tutto
            </button>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg">
              Vedi Sito
            </Link>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Visite Totali', value: '1,284', icon: <BarChart3 size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Visitatori Unici', value: '856', icon: <Users size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Tempo Medio', value: '3m 42s', icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Click Demo', value: '142', icon: <MousePointer2 size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          ))}
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
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <FileText size={20} className="text-blue-600" /> Gestione Blog
              </h2>
              <button 
                onClick={openNewPost}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#1e3a8a] rounded-lg text-xs font-bold hover:bg-blue-100 transition-all border border-blue-100"
              >
                <Plus size={14} /> Nuovo Articolo
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{post.title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{post.category} • {post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => openEditPost(post)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Post Modal */}
        {isEditingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {isNewPost ? 'Nuovo Articolo' : 'Modifica Articolo'}
                </h3>
                <button onClick={() => setIsEditingPost(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Titolo</label>
                      <input 
                        type="text" 
                        value={currentPost.title}
                        onChange={(e) => setCurrentPost(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Categoria</label>
                      <select 
                        value={currentPost.category}
                        onChange={(e) => setCurrentPost(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      >
                        <option value="Legal Tech">Legal Tech</option>
                        <option value="Sicurezza">Sicurezza</option>
                        <option value="Innovazione">Innovazione</option>
                        <option value="News">News</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Autore</label>
                      <input 
                        type="text" 
                        value={currentPost.author}
                        onChange={(e) => setCurrentPost(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Immagine Copertina</label>
                      <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-100 mb-3">
                        <img src={currentPost.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <label className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-100 transition-all border border-slate-200">
                        <Upload size={14} /> Cambia Foto
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => handleFileUpload(null, '', e, true)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estratto (Breve descrizione)</label>
                  <textarea 
                    value={currentPost.excerpt}
                    onChange={(e) => setCurrentPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditingPost(false)}
                  className="px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Annulla
                </button>
                <button 
                  onClick={savePost}
                  className="px-6 py-2 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg"
                >
                  Salva Articolo
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
          <p className="text-sm font-bold text-[#1e3a8a] mb-2 tracking-tight">Le modifiche vengono salvate automaticamente nel tuo browser.</p>
          <p className="text-xs text-blue-400 font-medium">Per renderle permanenti per tutti gli utenti, dovrai caricare i file reali nel progetto.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
