
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Reply, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { Comment as CommentType } from '@/lib/models';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentProps {
  comment: CommentType;
  level?: number;
  onReply?: (parentId: string, content: string) => void;
}

const Comment: React.FC<CommentProps> = ({ 
  comment, 
  level = 0,
  onReply
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [replyContent, setReplyContent] = useState('');
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
  
  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like comments",
      });
      return;
    }
    
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };
  
  const toggleReply = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to reply to comments",
      });
      return;
    }
    
    setIsReplying(!isReplying);
  };
  
  const handleSubmitReply = () => {
    if (replyContent.trim() && onReply) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
      
      toast({
        title: "Reply submitted",
        description: "Your reply has been added to the conversation",
      });
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="bg-secondary/50 p-3.5 rounded-xl rounded-tl-none">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Copy text</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <p className="text-sm">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-xs">
            <button 
              onClick={handleLike} 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
              <span>{likeCount}</span>
            </button>
            
            <button
              onClick={toggleReply}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <Reply className="h-3.5 w-3.5" />
              <span>Reply</span>
            </button>
          </div>
          
          <AnimatePresence>
            {isReplying && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 overflow-hidden"
              >
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="min-h-[80px] text-sm mb-2"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsReplying(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSubmitReply}
                    disabled={!replyContent.trim()}
                  >
                    Reply
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Render nested replies if they exist */}
          {comment.replies && comment.replies.length > 0 && (
            <div 
              className="mt-4 ml-0 space-y-4"
              style={{ marginLeft: level < 3 ? '1rem' : '0' }}
            >
              {comment.replies.map((reply) => (
                <Comment 
                  key={reply.id} 
                  comment={reply} 
                  level={level + 1} 
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Comment;
