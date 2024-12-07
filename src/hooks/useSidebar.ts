import { useState } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Changed to false by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggleSidebar
  };
};