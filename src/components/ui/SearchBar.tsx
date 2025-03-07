
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showSubmitButton?: boolean;
  variant?: 'default' | 'minimal';
  roundedFull?: boolean;
  onSearch?: (query: string) => void;
  initialQuery?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for ideas...',
  className,
  showSubmitButton = false,
  variant = 'default',
  roundedFull = false,
  onSearch,
  initialQuery = '',
  autoFocus = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative group",
        className
      )}
    >
      <div className={cn(
        "flex items-center w-full border transition-all duration-200",
        variant === 'default' ? 'bg-background border-input' : 'bg-transparent border-transparent',
        focused ? 'border-primary/40 ring-2 ring-primary/20' : 'hover:border-input/80',
        roundedFull ? 'rounded-full' : 'rounded-md',
        "focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20"
      )}>
        <div className="flex-shrink-0 pl-3">
          <Search className={cn(
            "h-4 w-4 text-muted-foreground transition-colors",
            focused && "text-primary"
          )} />
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent",
            roundedFull && "rounded-full"
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus={autoFocus}
        />
        
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex-shrink-0 pr-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={handleClear}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {showSubmitButton && (
          <div className="flex-shrink-0 pr-2">
            <Button
              type="submit"
              size="sm"
              className="btn-primary"
              disabled={!query.trim()}
            >
              Search
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
