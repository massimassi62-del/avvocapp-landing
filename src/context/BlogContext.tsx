import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  content?: string;
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "L'Intelligenza Artificiale nel Processo Civile: Opportunità e Rischi",
    excerpt: "Come l'IA sta trasformando la ricerca giuridica e la redazione degli atti, mantenendo il controllo umano.",
    author: "Avv. Marco Rossi",
    date: "12 Marzo 2026",
    category: "Legal Tech",
    image: "https://picsum.photos/seed/lawyer-tech/800/600"
  },
  {
    id: '2',
    title: "Cybersecurity per Studi Legali: 5 Errori da non commettere",
    excerpt: "La protezione dei dati dei clienti non è solo un obbligo legale, ma un pilastro della fiducia professionale.",
    author: "Ing. Sofia Bianchi",
    date: "05 Marzo 2026",
    category: "Sicurezza",
    image: "https://picsum.photos/seed/cyber-security/800/600"
  },
  {
    id: '3',
    title: "Il Futuro della Professione: Verso lo Studio Legale 4.0",
    excerpt: "Automazione, collaborazione remota e gestione data-driven: come prepararsi al cambiamento.",
    author: "Dott. Luca Verdi",
    date: "28 Febbraio 2026",
    category: "Innovazione",
    image: "https://picsum.photos/seed/digital-office/800/600"
  }
];

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  resetPosts: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('avvocapp_blog_posts');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('avvocapp_blog_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = {
      ...post,
      id: Date.now().toString()
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updatedFields: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, ...updatedFields } : post));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const resetPosts = () => {
    setPosts(DEFAULT_POSTS);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, resetPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
