
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: AuthMode;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  defaultMode = 'login'
}) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        toast({
          title: "Success!",
          description: "You have been logged in.",
        });
      } else {
        await signup(name, email, password);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
      }
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass border-none shadow-lg p-0 overflow-hidden">
        <div className="bg-accent/10 absolute inset-0 z-0 opacity-40"></div>
        <div className="relative z-10 p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'login' 
                ? 'Enter your credentials to sign in to your account' 
                : 'Fill in the information below to create your account'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  key="name-field"
                >
                  <label htmlFor="name" className="text-sm font-medium block mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-primary"
                    placeholder="Your name"
                    required={mode === 'signup'}
                    disabled={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium block mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-primary"
                placeholder="Your password"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <p>
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-accent font-medium hover:underline"
                disabled={isSubmitting}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
