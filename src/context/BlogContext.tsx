import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

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
    image: "/pratiche.png"
  },
  {
    id: '2',
    title: "Cybersecurity per Studi Legali: 5 Errori da non commettere",
    excerpt: "La protezione dei dati dei clienti non è solo un obbligo legale, ma un pilastro della fiducia professionale.",
    author: "Ing. Sofia Bianchi",
    date: "05 Marzo 2026",
    category: "Sicurezza",
    image: "/calcola parcella.png"
  },
  {
    id: '3',
    title: "Il Futuro della Professione: Verso lo Studio Legale 4.0",
    excerpt: "Automazione, collaborazione remota e gestione data-driven: come prepararsi al cambiamento.",
    author: "Dott. Luca Verdi",
    date: "28 Febbraio 2026",
    category: "Innovazione",
    image: "/report andamento studio.png"
  }
];

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  resetPosts: () => Promise<void>;
  loading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'blog_posts';
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) => {
      const blogPosts: BlogPost[] = [];
      snapshot.forEach((doc) => {
        blogPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      
      if (blogPosts.length === 0 && loading) {
        // Initialize with defaults if empty
        DEFAULT_POSTS.forEach(async (post) => {
          const { id, ...postData } = post;
          await setDoc(doc(db, path, id), postData).catch(err => console.error("Error initializing blog:", err));
        });
      }

      setPosts(blogPosts);
      setLoading(false);
    }, (error) => {
      console.error(`Error loading blog posts from ${path}:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loading]);

  const addPost = async (post: Omit<BlogPost, 'id'>) => {
    const path = 'blog_posts';
    try {
      await addDoc(collection(db, path), post);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const updatePost = async (id: string, updatedFields: Partial<BlogPost>) => {
    const path = `blog_posts/${id}`;
    try {
      await updateDoc(doc(db, 'blog_posts', id), updatedFields);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const deletePost = async (id: string) => {
    const path = `blog_posts/${id}`;
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const resetPosts = async () => {
    const path = 'blog_posts';
    try {
      // Delete all existing posts first (simplified for this example)
      posts.forEach(async (post) => {
        await deleteDoc(doc(db, path, post.id));
      });
      // Re-initialize with defaults
      DEFAULT_POSTS.forEach(async (post) => {
        const { id, ...postData } = post;
        await setDoc(doc(db, path, id), postData);
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, resetPosts, loading }}>
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
