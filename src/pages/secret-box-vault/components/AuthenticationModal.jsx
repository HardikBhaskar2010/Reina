import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuthenticationModal = ({ isOpen, onClose, onAuthenticate, isAuthenticating }) => {
  const [authMethod, setAuthMethod] = useState('password');
  const [password, setPassword] = useState('');
  const [biometricStatus, setBiometricStatus] = useState('idle');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Mock credentials for demonstration
  const mockPassword = "ourSecret2024";

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setAttempts(0);
      setBiometricStatus('idle');
    }
  }, [isOpen]);

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    if (password === mockPassword) {
      onAuthenticate();
      setError('');
    } else {
      setAttempts(prev => prev + 1);
      setError('Incorrect password. Try again.');
      setPassword('');
      
      // Lock after 3 attempts
      if (attempts >= 2) {
        setError('Too many failed attempts. Please try again later.');
        setTimeout(() => {
          setAttempts(0);
          setError('');
        }, 5000);
      }
    }
  };

  const handleBiometricAuth = () => {
    setBiometricStatus('scanning');
    setError('');
    
    // Simulate biometric authentication
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        setBiometricStatus('success');
        setTimeout(() => {
          onAuthenticate();
        }, 1000);
      } else {
        setBiometricStatus('failed');
        setError('Biometric authentication failed. Please try again.');
        setTimeout(() => {
          setBiometricStatus('idle');
        }, 2000);
      }
    }, 2000);
  };

  const getBiometricIcon = () => {
    switch (biometricStatus) {
      case 'scanning': return 'Scan';
      case 'success': return 'Check';
      case 'failed': return 'X';
      default: return 'Fingerprint';
    }
  };

  const getBiometricColor = () => {
    switch (biometricStatus) {
      case 'scanning': return 'text-primary';
      case 'success': return 'text-success';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md mx-4"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="glass-card rounded-3xl shadow-floating border border-border/30 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border/20 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center shadow-soft">
                    <Icon name="Shield" size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground">Secret Access</h2>
                    <p className="font-caption text-sm text-muted-foreground">Unlock your treasure vault</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300"
                >
                  <Icon name="X" size={20} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Authentication Methods */}
            <div className="p-6">
              {/* Method Selector */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setAuthMethod('password')}
                  className={`
                    flex-1 py-3 px-4 rounded-xl font-body text-sm font-medium transition-all duration-300
                    ${authMethod === 'password' ?'bg-primary/20 text-primary-foreground border-2 border-primary/30' :'bg-muted/10 text-muted-foreground hover:bg-muted/20'
                    }
                  `}
                >
                  <Icon name="Key" size={16} className="inline mr-2" />
                  Password
                </button>
                <button
                  onClick={() => setAuthMethod('biometric')}
                  className={`
                    flex-1 py-3 px-4 rounded-xl font-body text-sm font-medium transition-all duration-300
                    ${authMethod === 'biometric' ?'bg-primary/20 text-primary-foreground border-2 border-primary/30' :'bg-muted/10 text-muted-foreground hover:bg-muted/20'
                    }
                  `}
                >
                  <Icon name="Fingerprint" size={16} className="inline mr-2" />
                  Biometric
                </button>
              </div>

              {/* Password Authentication */}
              {authMethod === 'password' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <Input
                      type="password"
                      label="Secret Password"
                      placeholder="Enter your secret password"
                      value={password}
                      onChange={(e) => setPassword(e?.target?.value)}
                      error={error}
                      disabled={isAuthenticating || attempts >= 3}
                      className="mb-4"
                    />
                    
                    <div className="text-center">
                      <Button
                        type="submit"
                        variant="default"
                        loading={isAuthenticating}
                        disabled={!password || attempts >= 3}
                        iconName="Unlock"
                        iconPosition="left"
                        className="w-full"
                      >
                        {isAuthenticating ? 'Authenticating...' : 'Unlock Vault'}
                      </Button>
                    </div>

                    {/* Hint */}
                    <div className="mt-4 p-3 bg-muted/10 rounded-lg">
                      <p className="font-caption text-xs text-muted-foreground text-center">
                        💡 Demo password: <code className="bg-muted/20 px-1 rounded">ourSecret2024</code>
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Biometric Authentication */}
              {authMethod === 'biometric' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="mb-6">
                    <motion.div
                      className={`
                        w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center mb-4
                        ${biometricStatus === 'scanning' ? 'border-primary animate-pulse' : 
                          biometricStatus === 'success' ? 'border-success' :
                          biometricStatus === 'failed' ? 'border-error' : 'border-muted'}
                      `}
                      animate={biometricStatus === 'scanning' ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 360]
                      } : {}}
                      transition={{ duration: 2, repeat: biometricStatus === 'scanning' ? Infinity : 0 }}
                    >
                      <Icon 
                        name={getBiometricIcon()} 
                        size={32} 
                        className={getBiometricColor()}
                      />
                    </motion.div>
                    
                    <h3 className="font-body text-lg font-semibold text-foreground mb-2">
                      {biometricStatus === 'scanning' ? 'Scanning...' :
                       biometricStatus === 'success' ? 'Authenticated!' :
                       biometricStatus === 'failed'? 'Authentication Failed' : 'Touch to Authenticate'}
                    </h3>
                    
                    <p className="font-caption text-sm text-muted-foreground">
                      {biometricStatus === 'scanning' ? 'Please hold still while we verify your identity' :
                       biometricStatus === 'success' ? 'Access granted to your secret vault' :
                       biometricStatus === 'failed'? 'Please try again or use password' : 'Use your fingerprint or face to unlock'}
                    </p>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                      <p className="font-body text-sm text-error">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleBiometricAuth}
                    variant="outline"
                    disabled={biometricStatus === 'scanning' || isAuthenticating}
                    iconName="Fingerprint"
                    iconPosition="left"
                    className="w-full"
                  >
                    {biometricStatus === 'scanning' ? 'Scanning...' : 'Start Biometric Scan'}
                  </Button>
                </motion.div>
              )}

              {/* Attempts Warning */}
              {attempts > 0 && attempts < 3 && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="font-caption text-sm text-warning-foreground text-center">
                    {3 - attempts} attempt{3 - attempts !== 1 ? 's' : ''} remaining
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/20 bg-muted/5">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Shield" size={14} className="text-success" />
                <span className="font-caption text-xs text-muted-foreground">
                  Your secrets are protected with end-to-end encryption
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthenticationModal;