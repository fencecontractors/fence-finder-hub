// src/pages/admin/blog/BlogEditor.tsx


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Save, Eye, Loader2 } from "lucide-react";
import { BlogPost } from "@/types";
import { addBlogPost, updateBlogPost, useBlogPost } from "@/data";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import BlogPreview from "@/components/admin/blog/BlogPreview";

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const { data: existingPost, isLoading: isLoadingPost } = useBlogPost(id || "");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Fence Finder Team");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");

  // Load existing post data when editing
  useEffect(() => {
    if (isEditing && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setSlug(existingPost.slug);
      setExcerpt(existingPost.excerpt);
      setAuthor(existingPost.author);
      setImage(existingPost.image || "");
      setTags(existingPost.tags.join(", "));
    }
  }, [isEditing, existingPost]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Only auto-generate slug if it's empty or matches the previous auto-generated slug
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = async () => {
    if (!title || !content || !slug) {
      toast({
        title: "Missing information",
        description: "Please ensure title, content, and slug are provided",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
      
      const blogPost: BlogPost = {
        id: isEditing && existingPost ? existingPost.id : "",
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 150) + "...",
        author,
        date: isEditing && existingPost ? existingPost.date : new Date().toISOString(),
        image: image || "https://images.unsplash.com/photo-1533748430324-1f3d1beb2a60",
        tags: tagArray,
      };

      if (isEditing && existingPost) {
        await updateBlogPost(blogPost);
        toast({
          title: "Blog post updated",
          description: "Your blog post has been updated successfully.",
        });
      } else {
        await addBlogPost(blogPost);
        toast({
          title: "Blog post created",
          description: "Your blog post has been published successfully.",
        });
      }
      
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Save failed",
        description: "Failed to save the blog post",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing && isLoadingPost) {
    return <div className="text-center py-6">Loading blog post...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/admin/blogs">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Blog Post" : "Create Blog Post"}
          </h2>
        </div>
        
        <div className="flex gap-2">
          {slug && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </a>
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update" : "Publish"}
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Enter blog title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="url-friendly-slug"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Featured Image URL</Label>
                    <Input
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Short excerpt for blog listings (150-160 characters)"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="tags">Tags/Keywords</Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content in Markdown format"
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <BlogPreview 
            post={{
              id: id || "",
              title,
              slug,
              content,
              excerpt: excerpt || content.substring(0, 150) + "...",
              author,
              date: new Date().toISOString(),
              image: image || "https://images.unsplash.com/photo-1533748430324-1f3d1beb2a60",
              tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogEditor;
