import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

interface ImageConfig {
  home: {
    dashboard: string;
    featurePratiche: string;
    featureParcelle: string;
    featureReport: string;
    featureClientPortal: string;
  };
  blog: {
    default: string;
  };
}

const DEFAULT_IMAGES: ImageConfig = {
  home: {
    dashboard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600&h=900",
    featurePratiche: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200&h=800",
    featureParcelle: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200&h=800",
    featureReport: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800",
    featureClientPortal: "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=1200&h=800",
  },
  blog: {
    default: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800&h=600",
  }
};

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

interface ImageContextType {
  images: ImageConfig;
  updateImage: (category: keyof ImageConfig, key: string, url: string) => Promise<void>;
  resetImages: () => Promise<void>;
  loading: boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<ImageConfig>(DEFAULT_IMAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'images/config';
    const unsubscribe = onSnapshot(doc(db, path), (snapshot) => {
      if (snapshot.exists()) {
        setImages(snapshot.data() as ImageConfig);
      } else {
        // Initialize with defaults
        setDoc(doc(db, path), DEFAULT_IMAGES).catch(err => console.error("Error initializing images:", err));
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error loading images from ${path}:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateImage = async (category: keyof ImageConfig, key: string, url: string) => {
    const path = 'images/config';
    console.log(`Aggiornamento immagine: ${category}.${key} -> ${url}`);
    try {
      const newImages = {
        ...images,
        [category]: {
          ...images[category],
          [key]: url
        }
      };
      await setDoc(doc(db, path), newImages);
      console.log('Configurazione immagini aggiornata con successo su Firestore');
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dell\'immagine su Firestore:', error);
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const resetImages = async () => {
    const path = 'images/config';
    try {
      await setDoc(doc(db, path), DEFAULT_IMAGES);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  return (
    <ImageContext.Provider value={{ images, updateImage, resetImages, loading }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};
