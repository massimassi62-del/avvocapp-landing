import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useImages } from '../context/ImageContext';
import { useBlog, BlogPost } from '../context/BlogContext';
import { useSettings } from '../context/SettingsContext';
import { auth, loginWithGoogle, logout, loginWithEmail, changeUserPassword, uploadFileToStorage } from '../firebase';
import { onAuthStateChanged, User, EmailAuthProvider } from 'firebase/auth';
import { Save, RotateCcw, Image as ImageIcon, Lock, ArrowLeft, Upload, BarChart3, Users, Clock, MousePointer2, Plus, Trash2, Edit2, X, FileText, Settings as SettingsIcon, Phone, Mail, MapPin, Video, LogOut, Key, Sparkles, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAnalyticsSummary } from '../services/analytics';

const Admin = () => {
  const { images, updateImage, resetImages, loading: imagesLoading } = useImages();
  const { posts, addPost, updatePost, deletePost, resetPosts, loading: blogLoading } = useBlog();
  const { settings, updateSettings, resetSettings, loading: settingsLoading } = useSettings();
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Analytics state
  const [analytics, setAnalytics] = useState<{
    totalVisits: string;
    uniqueVisitors: string;
    avgSessionDuration: string;
    demoClicks: string;
  } | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    const data = await getAnalyticsSummary();
    if (data) setAnalytics(data);
    setAnalyticsLoading(false);
  };

  useEffect(() => {
    if (activeSection === 'dashboard' && user) {
      fetchAnalytics();
    }
  }, [activeSection, user]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await updateSettings(localSettings);
      setStatusMessage({ text: 'Impostazioni salvate con successo!', type: 'success' });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ text: `Errore: ${err.message}`, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setStatusMessage({ text: 'Inserisci sia la password attuale che quella nuova.', type: 'error' });
      return;
    }
    setIsChangingPassword(true);
    try {
      await changeUserPassword(currentPassword, newPassword);
      setStatusMessage({ text: 'Password aggiornata con successo!', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ text: `Errore: ${err.message}`, type: 'error' });
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
      setStatusMessage({ text: `Errore durante l'accesso con Google: ${err.message || 'Errore sconosciuto'}`, type: 'error' });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(loginEmail, loginPassword);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ text: `Errore: ${err.message}`, type: 'error' });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (category: any, key: string, e: React.ChangeEvent<HTMLInputElement>, isBlog?: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const uniqueKey = isBlog ? `blog_${key}` : `${category}_${key}`;
      setUploadingKey(uniqueKey);
      setIsSaving(true);
      try {
        const path = isBlog ? `blog/${Date.now()}_${file.name}` : `${category}/${key}_${Date.now()}_${file.name}`;
        const downloadUrl = await uploadFileToStorage(file, path);
        
        if (isBlog) {
          setCurrentPost(prev => ({ ...prev, image: downloadUrl }));
        } else {
          await updateImage(category, key, downloadUrl);
        }
        setStatusMessage({ text: 'Immagine caricata con successo!', type: 'success' });
      } catch (err: any) {
        console.error("Upload error details:", err);
        let errorMsg = "Errore durante il caricamento.";
        if (err.code === 'storage/unauthorized') {
          errorMsg = "Permesso negato. Verifica le regole di sicurezza di Firebase Storage.";
        } else if (err.code === 'storage/canceled') {
          errorMsg = "Caricamento annullato.";
        } else if (err.code === 'storage/unknown') {
          errorMsg = "Errore sconosciuto di Storage. Verifica che il bucket sia attivo nel console Firebase.";
        } else if (err.message) {
          errorMsg = `Errore: ${err.message}`;
        }
        setStatusMessage({ text: errorMsg, type: 'error' });
      } finally {
        setIsSaving(false);
        setUploadingKey(null);
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingKey('presentationVideo');
      setIsSaving(true);
      try {
        const path = `videos/presentation_${Date.now()}_${file.name}`;
        const downloadUrl = await uploadFileToStorage(file, path);
        setLocalSettings(prev => ({ ...prev, presentationVideoUrl: downloadUrl }));
        setStatusMessage({ text: 'Video caricato con successo! Ricorda di salvare le impostazioni.', type: 'success' });
      } catch (err: any) {
        console.error("Video upload error details:", err);
        let errorMsg = "Errore durante il caricamento del video.";
        if (err.code === 'storage/unauthorized') {
          errorMsg = "Permesso negato. Verifica le regole di sicurezza di Firebase Storage.";
        } else if (err.code === 'storage/unknown') {
          errorMsg = "Errore sconosciuto di Storage. Verifica che il bucket sia attivo nel console Firebase.";
        } else if (err.message) {
          errorMsg = `Errore: ${err.message}`;
        }
        setStatusMessage({ text: errorMsg, type: 'error' });
      } finally {
        setIsSaving(false);
        setUploadingKey(null);
      }
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Helmet>
          <title>Accesso Admin | AvvocApp</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-50 rounded-full text-[#1e3a8a]">
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
    <div className="h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      <Helmet>
        <title>Pannello Amministrazione | AvvocApp</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 text-slate-900 p-4 flex items-center justify-between sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-bold tracking-tight text-[#1e3a8a]">AvvocApp</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-600"
        >
          {isSidebarOpen ? <X size={24} /> : <BarChart3 size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 text-slate-900 flex flex-col shrink-0 z-50 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-slate-100 hidden lg:block">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-lg">A</div>
            <span className="text-2xl font-bold tracking-tight text-[#1e3a8a]">AvvocApp</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Menu Principale</div>
          
          <button 
            onClick={() => { setActiveSection('dashboard'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'dashboard' ? 'bg-blue-50 text-[#1e3a8a] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <BarChart3 size={18} /> Dashboard
          </button>
          
          <button 
            onClick={() => { setActiveSection('settings'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'settings' ? 'bg-blue-50 text-[#1e3a8a] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <SettingsIcon size={18} /> Impostazioni
          </button>
          
          <button 
            onClick={() => { setActiveSection('images'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'images' ? 'bg-blue-50 text-[#1e3a8a] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <ImageIcon size={18} /> Immagini
          </button>
          
          <button 
            onClick={() => { setActiveSection('blog'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'blog' ? 'bg-blue-50 text-[#1e3a8a] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <FileText size={18} /> Blog
          </button>

          {isEmailUser && (
            <button 
              onClick={() => { setActiveSection('security'); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'security' ? 'bg-blue-50 text-[#1e3a8a] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Key size={18} /> Sicurezza
            </button>
          )}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 flex items-center justify-center text-[#1e3a8a] font-bold uppercase">
              {user.displayName?.[0] || user.email?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate text-slate-900">{user.displayName || 'Admin'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-sm font-bold transition-all border border-red-100"
          >
            <LogOut size={18} /> Esci dal Pannello
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Top Header */}
        <header className="hidden lg:flex bg-white border-b border-slate-200 p-6 items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pannello di Controllo</h1>
            <p className="text-slate-500 text-sm font-medium">Gestisci i contenuti e le impostazioni del tuo sito</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={async () => { 
                if(window.confirm('Sei sicuro di voler ripristinare tutti i dati predefiniti?')) {
                  await resetImages(); await resetPosts(); await resetSettings(); 
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RotateCcw size={14} /> Ripristina Default
            </button>
            <Link to="/" className="flex items-center gap-2 px-6 py-2 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg">
              Vedi Sito Live
            </Link>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-grow overflow-y-auto p-4 lg:p-10 space-y-10 bg-white">
          <div className="max-w-5xl mx-auto space-y-10">
            
            {activeSection === 'dashboard' && (
              <div className="space-y-10">
                {/* Analytics Section */}
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                    <BarChart3 size={20} className="text-[#1e3a8a]" /> Statistiche Reali (Firestore)
                  </h2>
                  <button 
                    onClick={fetchAnalytics}
                    disabled={analyticsLoading}
                    className="p-2 text-slate-400 hover:text-[#1e3a8a] transition-all"
                    title="Aggiorna dati"
                  >
                    <RefreshCw size={18} className={analyticsLoading ? 'animate-spin' : ''} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Visite Totali', value: analytics?.totalVisits || '...', icon: <BarChart3 size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Visitatori Unici', value: analytics?.uniqueVisitors || '...', icon: <Users size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Tempo Medio', value: analytics?.avgSessionDuration || '...', icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Click Demo', value: analytics?.demoClicks || '...', icon: <MousePointer2 size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                        {stat.icon}
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 tracking-tight">
                        {analyticsLoading && !analytics ? (
                          <span className="inline-block w-12 h-6 bg-slate-100 animate-pulse rounded"></span>
                        ) : stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-[#1e3a8a] rounded-3xl text-center text-white shadow-xl">
                  <Sparkles className="mx-auto mb-4 text-blue-300" size={32} />
                  <h3 className="text-xl font-bold mb-2">Tutto sotto controllo</h3>
                  <p className="text-blue-100 text-sm max-w-md mx-auto">Tutte le modifiche apportate in questo pannello vengono salvate istantaneamente e sono visibili sul sito pubblico.</p>
                </div>
              </div>
            )}

            {/* Site Settings Section */}
            {activeSection === 'settings' && (
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                    <SettingsIcon size={20} className="text-[#1e3a8a]" /> Dati di Contatto e Aziendali
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
                      <Video size={12} /> Video di Presentazione
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-grow">
                        <input 
                          type="text" 
                          value={localSettings.presentationVideoUrl}
                          onChange={(e) => setLocalSettings(prev => ({ ...prev, presentationVideoUrl: e.target.value }))}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm mb-2"
                          placeholder="URL video (YouTube o link diretto)..."
                        />
                        <p className="text-[10px] text-slate-400 font-medium italic">
                          Puoi incollare un link YouTube o caricare un file video dal tuo PC.
                        </p>
                      </div>
                      <label className="shrink-0 flex items-center justify-center gap-2 px-6 py-2 bg-blue-50 text-[#1e3a8a] rounded-xl font-bold text-xs cursor-pointer hover:bg-blue-100 transition-all border border-blue-100 h-fit">
                        {uploadingKey === 'presentationVideo' ? (
                          <div className="w-4 h-4 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Video size={16} />
                        )}
                        {uploadingKey === 'presentationVideo' ? 'Caricamento...' : 'Carica Video dal PC'}
                        <input 
                          type="file" 
                          accept="video/*"
                          className="hidden" 
                          onChange={handleVideoUpload}
                          disabled={isSaving}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Password Change Section (only for email users) */}
            {activeSection === 'security' && isEmailUser && (
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                    <Key size={20} className="text-[#1e3a8a]" /> Sicurezza Account
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
              </section>
            )}

            {/* Image Management Section */}
            {activeSection === 'images' && (
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                    <ImageIcon size={20} className="text-[#1e3a8a]" /> Gestione Tutte le Foto
                  </h2>
                  <button 
                    onClick={() => { if(window.confirm('Vuoi davvero resettare tutte le immagini ai valori predefiniti?')) resetImages(); }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all border border-slate-200"
                  >
                    <RotateCcw size={14} /> Reset Immagini
                  </button>
                </div>
                <div className="p-6 space-y-8">
                  {/* Home Images */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Home Page
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(images.home).map(([key, url]) => (
                        <div key={key} className="space-y-3">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{key}</label>
                          <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-100 mb-3 relative group">
                            <img src={url} alt={key} className="w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-black/40 transition-all flex items-center justify-center ${uploadingKey === `home_${key}` ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                              {uploadingKey === `home_${key}` ? (
                                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <label className="p-3 bg-white text-[#1e3a8a] rounded-full cursor-pointer hover:scale-110 transition-all shadow-xl">
                                  <Upload size={20} />
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden" 
                                    onChange={(e) => handleFileUpload('home', key, e)}
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                          <input 
                            type="text" 
                            value={url}
                            onChange={(e) => updateImage('home', key, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="URL immagine..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blog Images */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> Immagini Blog (Default)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {Object.entries(images.blog).map(([key, url]) => (
                        <div key={key} className="space-y-3">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{key}</label>
                          <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-100 mb-3 relative group">
                            <img src={url} alt={key} className="w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-black/40 transition-all flex items-center justify-center ${uploadingKey === `blog_${key}` ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                              {uploadingKey === `blog_${key}` ? (
                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <label className="p-2 bg-white text-[#1e3a8a] rounded-full cursor-pointer hover:scale-110 transition-all shadow-xl">
                                  <Upload size={16} />
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden" 
                                    onChange={(e) => handleFileUpload('blog', key, e)}
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                          <input 
                            type="text" 
                            value={url}
                            onChange={(e) => updateImage('blog', key, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="URL immagine..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Blog Section */}
            {activeSection === 'blog' && (
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                    <FileText size={20} className="text-[#1e3a8a]" /> Gestione Blog
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
              </section>
            )}

            <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <p className="text-sm font-bold text-[#1e3a8a] mb-2 tracking-tight">Tutte le modifiche sono ora salvate in tempo reale nel database Firebase.</p>
              <p className="text-xs text-blue-400 font-medium">I dati sono visibili a tutti i visitatori del sito.</p>
            </div>
          </div>
        </main>
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
                    <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-100 mb-3 relative">
                      <img src={currentPost.image} alt="" className="w-full h-full object-cover" />
                      {uploadingKey === 'blog_' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
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
      {/* Status Message Toast */}
      {statusMessage && (
        <div className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-bottom-4 duration-300 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
            : 'bg-rose-50 border-rose-100 text-rose-800'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle className="text-emerald-500" size={20} />
          ) : (
            <AlertCircle className="text-rose-500" size={20} />
          )}
          <p className="font-bold text-sm">{statusMessage.text}</p>
          <button 
            onClick={() => setStatusMessage(null)}
            className="ml-4 p-1 hover:bg-black/5 rounded-lg transition-all"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
