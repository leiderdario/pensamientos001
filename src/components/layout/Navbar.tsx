
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, LogIn, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthModal from '@/components/auth/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  // Define the navbar links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Ideas', path: '/ideas' },
    { name: 'Explore', path: '/explore' },
  ];

  const handleLogout = () => {
    logout();
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 glass shadow-sm' : 'py-5 bg-transparent'
        }`}
      >
        <div className="page-container">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl font-bold tracking-tight">ideaexchange</span>
              </motion.div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-secondary relative ${
                    location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-3"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              
              <div className="ml-2 flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <Link to="/search">
                    <Search className="h-5 w-5" />
                  </Link>
                </Button>

                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="rounded-full h-10 w-10 p-0 ml-2 focus:ring-0">
                        <Avatar className="h-9 w-9 transition-transform hover:scale-105">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="text-xs">{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-card">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                        <LogIn className="mr-2 h-4 w-4 rotate-180" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button className="btn-primary" onClick={openAuthModal}>
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
            
            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link to="/search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative rounded-full"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileMenuOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, rotate: mobileMenuOpen ? -90 : 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: mobileMenuOpen ? 90 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass border-t mt-3 overflow-hidden"
            >
              <div className="px-4 py-5 space-y-4">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
                        location.pathname === link.path 
                          ? 'bg-secondary text-primary' 
                          : 'text-muted-foreground hover:bg-secondary/50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                
                {!isAuthenticated ? (
                  <div className="pt-2">
                    <Button 
                      className="w-full btn-primary"
                      onClick={openAuthModal}
                    >
                      Sign In
                    </Button>
                  </div>
                ) : (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 rounded-md text-sm font-medium 
                              text-muted-foreground hover:bg-secondary/50 transition-all"
                    >
                      <User className="inline-block mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 rounded-md text-sm font-medium text-left
                              text-destructive hover:bg-destructive/5 transition-all"
                    >
                      <LogIn className="inline-block mr-2 h-4 w-4 rotate-180" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Add padding to account for fixed navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'pt-16' : 'pt-24'}`} />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
