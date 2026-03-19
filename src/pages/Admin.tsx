import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useImages } from '../context/ImageContext';
import { useBlog, BlogPost } from '../context/BlogContext';
import { useSettings } from '../context/SettingsContext';
import { auth, loginWithGoogle, logout, loginWithEmail, changeUserPassword } from '../firebase';
import { onAuthStateChanged, User, EmailAuthProvider } from 'firebase/auth';
import { Save, RotateCcw, Image as ImageIcon, Lock, ArrowLeft, Upload, BarChart3, Users, Clock, MousePointer2, Plus, Trash2, Edit2, X, FileText, Settings as SettingsIcon, Phone, Mail, MapPin, Video, LogOut, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { images, updateImage, resetImages, loading: imagesLoading } = useImages();
  const { posts, addPost, updatePost, deletePost, resetPosts, loading: blogLoading } = useBlog();
  const { settings, updateSettings, resetSettings, loading: settingsLoading } = useSettings();
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Local state for settings to avoid too many context updates
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await updateSettings(localSettings);
      alert('Impostazioni salvate con successo!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert('Inserisci sia la password attuale che quella nuova.');
      return;
    }
    setIsChangingPassword(true);
    try {
      await changeUserPassword(currentPassword, newPassword);
      alert('Password aggiornata con successo!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      console.error(err);
      alert(`Errore: ${err.message}`);
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Blog management state
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [isNewPost, setIsNewPost] = useState(false);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error(err);
      alert(`Errore durante l'accesso con Google: ${err.message || 'Errore sconosciuto'}`);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(loginEmail, loginPassword);
    } catch (err: any) {
      console.error(err);
      alert(`Errore: ${err.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = (category: any, key: string, e: React.ChangeEvent<HTMLInputElement>, isBlog?: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (isBlog) {
          setCurrentPost(prev => ({ ...prev, image: reader.result as string }));
        } else {
          await updateImage(category, key, reader.result as string);
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
      author: user?.displayName || user?.email || '',
      date: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }),
      category: 'Legal Tech',
      image: 'https://picsum.photos/seed/legal/800/600'
    });
    setIsNewPost(true);
    setIsEditingPost(true);
  };

  const savePost = async () => {
    setIsSaving(true);
    try {
      if (isNewPost) {
        await addPost(currentPost as Omit<BlogPost, 'id'>);
      } else {
        await updatePost(currentPost.id!, currentPost);
      }
      setIsEditingPost(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || imagesLoading || blogLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Helmet>
          <title>Accesso Admin | AvvocApp</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-2 tracking-tight">Accesso Amministratore</h1>
          <p className="text-center text-slate-500 text-sm mb-8 font-medium">Accedi con il tuo account autorizzato</p>
          
          {!showEmailLogin ? (
            <div className="space-y-4">
              <button 
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                Accedi con Google
              </button>
              <button 
                onClick={() => setShowEmailLogin(true)}
                className="w-full text-slate-400 text-xs font-bold hover:text-blue-600 transition-all"
              >
                Usa Email e Password
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#1e3a8a] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1e40af] transition-all shadow-lg"
              >
                Accedi
              </button>
              <button 
                type="button"
                onClick={() => setShowEmailLogin(false)}
                className="w-full text-slate-400 text-xs font-bold hover:text-blue-600 transition-all"
              >
                Torna a Google Login
              </button>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-bold text-slate-400 hover:text-[#1e3a8a] transition-all flex items-center justify-center gap-2">
              <ArrowLeft size={14} /> Torna al sito
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isEmailUser = user.providerData.some(p => p.providerId === 'password');

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <Helmet>
        <title>Pannello Amministrazione | AvvocApp</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Amministrazione AvvocApp</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-slate-500 font-medium">Benvenuto, {user.displayName || user.email}</p>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-all" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={async () => { 
                if(window.confirm('Sei sicuro di voler ripristinare tutti i dati predefiniti?')) {
                  await resetImages(); await resetPosts(); await resetSettings(); 
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RotateCcw size={16} /> Ripristina Tutto
            </button>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg">
              Vedi Sito
            </Link>
          </div>
        </div>

        {/* Site Settings Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <SettingsIcon size={20} className="text-blue-600" /> Dati di Contatto e Aziendali
            </h2>
            <button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold hover:bg-[#1e40af] transition-all shadow-lg disabled:opacity-50"
            >
              {isSaving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={14} />} 
              Salva Dati
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Phone size={12} /> Telefono
                </label>
                <input 
                  type="text" 
                  value={localSettings.phone}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Mail size={12} /> Email
                </label>
                <input 
                  type="email" 
                  value={localSettings.email}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <MapPin size={12} /> Indirizzo
                </label>
                <input 
                  type="text" 
                  value={localSettings.address}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Città</label>
                <input 
                  type="text" 
                  value={localSettings.city}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div className="md:col-span-2 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Video size={12} /> URL Video di Presentazione (YouTube Embed)
              </label>
              <input 
                type="text" 
                value={localSettings.presentationVideoUrl}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, presentationVideoUrl: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                placeholder="https://www.youtube.com/embed/..."
              />
              <p className="mt-2 text-[10px] text-slate-400 font-medium italic">
                Usa il formato "embed" di YouTube (es. https://www.youtube.com/embed/ID_VIDEO)
              </p>
            </div>
          </div>
        </div>

        {/* Password Change Section (only for email users) */}
        {isEmailUser && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <Key size={20} className="text-blue-600" /> Sicurezza Account
              </h2>
              <button 
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold hover:bg-[#1e40af] transition-all shadow-lg disabled:opacity-50"
              >
                {isChangingPassword ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={14} />} 
                Aggiorna Password
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password Attuale</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nuova Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>
        )}

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
                  disabled={isSaving}
                  className="px-6 py-2 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg disabled:opacity-50"
                >
                  {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Salva Articolo'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
          <p className="text-sm font-bold text-[#1e3a8a] mb-2 tracking-tight">Tutte le modifiche sono ora salvate in tempo reale nel database Firebase.</p>
          <p className="text-xs text-blue-400 font-medium">I dati sono visibili a tutti i visitatori del sito.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
