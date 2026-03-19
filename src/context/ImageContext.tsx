import React, { createContext, useContext, useState, useEffect } from 'react';

interface ImageConfig {
  home: {
    dashboard: string;
  };
  blog: {
    post1: string;
    post2: string;
    post3: string;
  };
}

const DEFAULT_IMAGES: ImageConfig = {
  home: {
    dashboard: "https://picsum.photos/seed/legal-software-ui/1600/900",
  },
  blog: {
    post1: "https://picsum.photos/seed/lawyer-tech/800/600",
    post2: "https://picsum.photos/seed/cyber-security/800/600",
    post3: "https://picsum.photos/seed/digital-office/800/600",
  }
};

interface ImageContextType {
  images: ImageConfig;
  updateImage: (category: keyof ImageConfig, key: string, url: string) => void;
  resetImages: () => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<ImageConfig>(() => {
    const saved = localStorage.getItem('avvocapp_images');
    return saved ? JSON.parse(saved) : DEFAULT_IMAGES;
  });

  useEffect(() => {
    localStorage.setItem('avvocapp_images', JSON.stringify(images));
  }, [images]);

  const updateImage = (category: keyof ImageConfig, key: string, url: string) => {
    setImages(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: url
      }
    }));
  };

  const resetImages = () => {
    setImages(DEFAULT_IMAGES);
  };

  return (
    <ImageContext.Provider value={{ images, updateImage, resetImages }}>
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
