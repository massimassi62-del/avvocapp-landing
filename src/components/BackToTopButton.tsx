/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to 400px
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full bg-[#1e3a8a] text-white shadow-md hover:shadow-lg transition-opacity hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 ${
        isVisible 
          ? 'opacity-100 duration-[350ms] ease-out' 
          : 'opacity-0 pointer-events-none duration-[250ms] ease-in'
      } w-[42px] h-[42px] md:w-[48px] md:h-[48px]`}
      aria-label="Torna su"
    >
      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
};

export default BackToTopButton;
