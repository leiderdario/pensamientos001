
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Image, X, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tag from '@/components/ui/Tag';

interface IdeaFormProps {
  onSubmit?: (data: { title: string; content: string; tags: string[]; image?: File }) => void;
  isSubmitting?: boolean;
}

const POPULAR_TAGS = [
  'technology', 'business', 'science', 'health',
  'education', 'society', 'art', 'environment',
  'philosophy', 'psychology', 'politics', 'design'
];

const IdeaForm: React.FC<IdeaFormProps> = ({ 
  onSubmit,
  isSubmitting = false
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post ideas",
      });
      return;
    }
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your idea",
        variant: "destructive",
      });
      return;
    }
    
    if (onSubmit) {
      onSubmit({
        title,
        content,
        tags,
        image: image || undefined
      });
    }
  };
  
  const handleSuggestedTagClick = (tag: string) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
  };
  
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your idea about?"
          className="input-primary"
          required
          maxLength={100}
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Description</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe your idea in detail..."
          className="min-h-[150px] input-primary"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (up to 5)</Label>
        <div className="flex items-center mb-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Add tags (press Enter to add)"
            className="input-primary"
            disabled={isSubmitting || tags.length >= 5}
          />
          <Button
            type="button"
            onClick={handleAddTag}
            className="ml-2 btn-primary"
            disabled={!tagInput.trim() || tags.length >= 5 || isSubmitting}
          >
            Add
          </Button>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            <AnimatePresence>
              {tags.map((tag) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  <Tag name={tag} size="md" clickable={false} />
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-muted-foreground hover:text-destructive transition-colors rounded-full"
                    disabled={isSubmitting}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Remove {tag}</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested tags:</p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_TAGS.filter(tag => !tags.includes(tag)).slice(0, 8).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSuggestedTagClick(tag)}
                className="px-2.5 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-muted/70 transition-colors"
                disabled={tags.length >= 5 || isSubmitting}
              >
                <Plus className="h-3 w-3 inline-block mr-1" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image (optional)</Label>
        
        {!imagePreview ? (
          <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <label htmlFor="image" className="cursor-pointer block">
              <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload an image<br />
                <span className="text-xs">(Maximum size: 5MB)</span>
              </p>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </label>
          </div>
        ) : (
          <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors"
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </button>
          </div>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full btn-primary py-6"
        disabled={isSubmitting || !title.trim() || !content.trim()}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>Post Idea</>
        )}
      </Button>
    </motion.form>
  );
};

export default IdeaForm;
