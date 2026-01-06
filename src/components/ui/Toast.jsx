import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toast = useCallback({
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div 
      className="fixed top-20 right-6 z-100 flex flex-col space-y-3 max-w-sm"
      data-testid="toast-container"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onRemove={() => onRemove(toast.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Toast = ({ toast, onRemove }) => {
  const { message, type } = toast;

  const typeConfig = {
    success: {
      icon: 'CheckCircle',
      bgColor: 'bg-success/90',
      iconColor: 'text-success-foreground',
      borderColor: 'border-success',
    },
    error: {
      icon: 'XCircle',
      bgColor: 'bg-error/90',
      iconColor: 'text-error-foreground',
      borderColor: 'border-error',
    },
    warning: {
      icon: 'AlertCircle',
      bgColor: 'bg-warning/90',
      iconColor: 'text-warning-foreground',
      borderColor: 'border-warning',
    },
    info: {
      icon: 'Info',
      bgColor: 'bg-primary/90',
      iconColor: 'text-primary-foreground',
      borderColor: 'border-primary',
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
      className={`
        ${config.bgColor} backdrop-blur-md
        ${config.borderColor} border-2
        rounded-xl shadow-floating p-4 min-w-[300px]
        flex items-start space-x-3
      `}
      data-testid={`toast-${type}`}
    >
      <Icon 
        name={config.icon} 
        size={20} 
        className={config.iconColor} 
      />
      <div className="flex-1">
        <p className="font-body text-sm font-medium text-foreground">
          {message}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        data-testid="toast-close-button"
      >
        <Icon name="X" size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;