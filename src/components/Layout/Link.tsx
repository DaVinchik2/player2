import React from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, className, children }) => {
  const isCurrentPath = window.location.pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    // Trigger a custom event to notify the app of navigation
    window.dispatchEvent(new CustomEvent('navigation', { detail: { path: href } }));
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={`${className} ${isCurrentPath ? 'text-white' : ''}`}
    >
      {children}
    </a>
  );
};