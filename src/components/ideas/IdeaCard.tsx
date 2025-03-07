
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Tag from '@/components/ui/Tag';
import { type Idea } from '@/lib/models';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IdeaCardProps {
  idea: Idea;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  variant = 'default',
  className,
}) => {
  const {
    id,
    title,
    content,
    author,
    createdAt,
    likes,
    comments,
    tags,
    image,
  } = idea;

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  const baseClasses = "overflow-hidden group relative transition-all duration-300";
  
  const variants = {
    default: "flex flex-col h-full glass-card border border-border/40 hover:border-border/80",
    compact: "flex flex-row items-start gap-4 p-4 rounded-xl border border-border/40 hover:border-border/80 bg-background/40",
    featured: "flex flex-col h-full glass-card border border-border/40 hover:border-border/80 shadow-md",
  };
  
  const getContentExcerpt = () => {
    if (variant === 'compact') {
      return content.length > 120 ? `${content.substring(0, 120)}...` : content;
    }
    return content.length > 180 ? `${content.substring(0, 180)}...` : content;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(baseClasses, variants[variant], className)}
    >
      <Link to={`/ideas/${id}`} className="flex flex-col h-full">
        {image && variant !== 'compact' && (
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        <div className={cn(
          "flex flex-col flex-grow p-5",
          variant === 'compact' ? "p-0" : "",
          variant === 'featured' ? "p-6" : ""
        )}>
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium leading-none">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground leading-snug">
                {formattedDate}
              </span>
            </div>
          </div>
          
          <h3 className={cn(
            "font-semibold mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors",
            variant === 'compact' ? "text-base" : "text-xl",
            variant === 'featured' ? "text-2xl" : ""
          )}>
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4 text-sm">
            {getContentExcerpt()}
          </p>
          
          {variant !== 'compact' && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <Tag key={tag} name={tag} size="sm" />
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-4 mt-auto text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default IdeaCard;
