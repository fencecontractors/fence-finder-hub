
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPost } from "@/types";
import { useToast } from "@/hooks/use-toast";

const GEMINI_API_KEY = "AIzaSyDZ6vhb4K-SOkc9NKseRS88uO2dkfIV_VU";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const AdminBlogGenerator = () => {
  const [keywords, setKeywords] = useState("");
  const [title, setTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [authorName, setAuthorName] = useState("Fencing Blog");
  const [metaDescription, setMetaDescription] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const generateBlogPost = async () => {
    if (!keywords.trim()) {
      toast({
        title: "Missing keywords",
        description: "Please enter keywords to generate content",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const prompt = `
        Generate a comprehensive, SEO-optimized blog post about ${keywords}.
        
        The blog post should include:
        1. An engaging title (if one isn't already provided)
        2. A table of contents
        3. Well-structured content with proper headings (H2, H3)
        4. Key takeaways section
        5. Strategic use of the following keywords throughout: ${keywords}
        6. Suggestions for internal links (placeholder URLs are fine)
        7. A meta description optimized for SEO
        
        Format the content in HTML with proper semantic tags (<h2>, <h3>, <p>, <ul>, <ol>, <blockquote>, etc.).
        Make the content comprehensive, informative, and at least 1500 words.
        Include placeholder suggestions for where images or multimedia could be added.
        
        For the author bio, use: "${authorName}"
      `;

      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Failed to generate content");
      }

      const content = data.candidates[0].content.parts[0].text;
      
      // Extract title if not already set
      if (!title && content.includes("<h1>") && content.includes("</h1>")) {
        const extractedTitle = content.split("<h1>")[1].split("</h1>")[0];
        setTitle(extractedTitle);
        
        // Generate slug from title
        const generatedSlug = extractedTitle
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
        setBlogSlug(generatedSlug);
      }
      
      // Extract meta description if not already set
      if (!metaDescription && content.includes("Meta Description:")) {
        const metaSection = content.split("Meta Description:")[1].split("\n")[0];
        setMetaDescription(metaSection.trim());
      }
      
      // Extract tags if not already set
      if (!tags && content.includes("Keywords:")) {
        const keywordsSection = content.split("Keywords:")[1].split("\n")[0];
        setTags(keywordsSection.trim());
      }
      
      setGeneratedContent(content);
      
      toast({
        title: "Content generated",
        description: "Blog post content has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate content",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveBlogPost = async () => {
    if (!title || !generatedContent || !blogSlug) {
      toast({
        title: "Missing information",
        description: "Please ensure title, content, and slug are provided",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Format tags as an array
      const tagArray = tags.split(",").map(tag => tag.trim());
      
      const newBlogPost: Partial<BlogPost> = {
        title,
        slug: blogSlug,
        content: generatedContent,
        excerpt: metaDescription || generatedContent.substring(0, 150) + "...",
        author: authorName,
        date: new Date().toISOString(),
        image: blogImage || "https://images.unsplash.com/photo-1533748430324-1f3d1beb2a60",
        tags: tagArray,
      };

      // In a real app, this would be an API call to save to a database
      // For demo purposes, we're logging to console
      console.log("Saving blog post:", newBlogPost);
      
      toast({
        title: "Blog post saved",
        description: "Your blog post has been published successfully.",
      });
      
      // Navigate to the blog post after a short delay
      setTimeout(() => {
        navigate(`/blog/${blogSlug}`);
      }, 1500);
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

  return (
    <PageLayout 
      title="Admin Blog Generator" 
      description="Generate and publish blog posts with AI"
    >
      <div className="page-container max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">AI Blog Generator</h1>
        
        <Tabs defaultValue="generate">
          <TabsList className="mb-6">
            <TabsTrigger value="generate">Generate Content</TabsTrigger>
            <TabsTrigger value="edit">Edit & Publish</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Keywords</label>
                <Textarea 
                  placeholder="Enter keywords separated by commas (e.g., fence installation, wooden fences, privacy fencing)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  rows={3}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={generateBlogPost} 
                disabled={isGenerating || !keywords.trim()}
                className="w-full md:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate Blog Post
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="edit">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Blog Title</label>
                  <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">URL Slug</label>
                  <Input 
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Author Name</label>
                  <Input 
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Author name"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Featured Image URL</label>
                  <Input 
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Meta Description</label>
                <Textarea 
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO meta description (150-160 characters)"
                  rows={2}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Tags/Keywords</label>
                <Input 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Blog Content</label>
                <div className="border rounded-md p-4 bg-white min-h-[300px]">
                  <div 
                    ref={contentRef} 
                    className="prose prose-sm max-w-none"
                    contentEditable 
                    suppressContentEditableWarning 
                    onBlur={(e) => setGeneratedContent(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: generatedContent }}
                  />
                </div>
              </div>
              
              <Button 
                onClick={saveBlogPost} 
                disabled={isSaving || !title || !generatedContent || !blogSlug}
                className="w-full md:w-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Publish Blog Post
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminBlogGenerator;
