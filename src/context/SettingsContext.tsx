import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('avvocapp_site_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('avvocapp_site_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
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
