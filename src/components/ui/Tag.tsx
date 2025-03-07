
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface TagProps {
  name: string;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'accent';
  clickable?: boolean;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  name,
  count,
  size = 'md',
  variant = 'default',
  clickable = true,
  className
}) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-3',
    lg: 'text-base py-1.5 px-4',
  };
  
  const variantClasses = {
    default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'bg-transparent border border-secondary text-secondary-foreground hover:bg-secondary/10',
    accent: 'bg-accent/10 text-accent-foreground hover:bg-accent/20',
  };
  
  const badge = (
    <Badge 
      className={cn(
        "font-normal transition-all duration-200 rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        clickable && "cursor-pointer hover:scale-105",
        className
      )}
    >
      {name}
      {count !== undefined && (
        <span className="ml-1.5 text-xs opacity-70">
          {count}
        </span>
      )}
    </Badge>
  );
  
  if (clickable) {
    return (
      <Link to={`/tag/${formattedName}`} aria-label={`View all posts tagged with ${name}`} className="inline-block">
        {badge}
      </Link>
    );
  }
  
  return badge;
};

export default Tag;
