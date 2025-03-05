
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BlogPost } from "@/types";
import { deleteBlogPost } from "@/data";
import { toast } from "@/hooks/use-toast";

interface DeleteBlogDialogProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteBlogDialog = ({ post, isOpen, onClose }: DeleteBlogDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!post) {
    return null;
  }

  const handleDelete = async () => {
    if (!post) return;
    
    setIsDeleting(true);
    try {
      await deleteBlogPost(post.id);
      toast({
        title: "Blog post deleted",
        description: `"${post.title}" has been successfully deleted.`,
      });
      onClose();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "Failed to delete the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{post.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlogDialog;
