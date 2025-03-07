
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 py-12 mt-auto">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">ideaexchange</h3>
            <p className="text-sm text-muted-foreground">
              Share and discover ideas from thinkers around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm hover:text-primary hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ideas" className="text-sm hover:text-primary hover:underline transition-colors">
                  Ideas
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm hover:text-primary hover:underline transition-colors">
                  Explore
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-primary hover:underline transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm hover:text-primary hover:underline transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm hover:text-primary hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary hover:underline transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-primary hover:underline transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} ideaexchange. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
