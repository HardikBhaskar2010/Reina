import React, { createContext, useContext, useEffect, useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('love-os-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('love-os-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg transition-all duration-300
        hover:bg-muted/10 hover:scale-110
        ${className}
      `}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle-button"
    >
      {theme === 'light' ? (
        <Icon name="Moon" size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
      ) : (
        <Icon name="Sun" size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;