import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  city: string;
  vatNumber: string;
  presentationVideoUrl: string;
  socials: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  phone: '+39 02 1234567',
  email: 'info@avvocapp.it',
  address: 'Via Montenapoleone 8',
  city: 'Milano (MI)',
  vatNumber: 'IT 12345678901',
  presentationVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
  socials: {
    linkedin: '#',
    twitter: '#',
    facebook: '#'
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

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'settings/global';
    const unsubscribe = onSnapshot(doc(db, path), (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.data() as SiteSettings);
      } else {
        // If it doesn't exist, initialize with defaults
        setDoc(doc(db, path), DEFAULT_SETTINGS).catch(err => {
          console.error("Error initializing settings:", err);
        });
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error loading settings from ${path}:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const path = 'settings/global';
    try {
      const updatedSettings = { ...settings, ...newSettings };
      await setDoc(doc(db, path), updatedSettings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const resetSettings = async () => {
    const path = 'settings/global';
    try {
      await setDoc(doc(db, path), DEFAULT_SETTINGS);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
