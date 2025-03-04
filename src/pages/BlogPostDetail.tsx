
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useBlogPost } from "@/data";
import { Textarea } from "@/components/ui/textarea";

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug || "");
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <p>Loading blog post...</p>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <h1 className="text-4xl font-bold mb-8">Blog Post Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <Button asChild>
            <Link to="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <PageLayout>
      <article className="page-container max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        
        {post.image && (
          <div className="rounded-xl overflow-hidden mb-8 aspect-[2/1]">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center text-muted-foreground mb-8">
          <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          <span className="mx-2">•</span>
          <span>{readingTime} min read</span>
          {post.author && (
            <>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </>
          )}
        </div>
        
        <div className="prose prose-lg max-w-none">
          {/* Render content as HTML or Markdown */}
          <div dangerouslySetInnerHTML={{ __html: 
            // Basic markdown to HTML conversion for display
            post.content
              // Convert headings
              .replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>')
              .replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>')
              .replace(/#### (.*?)(\n|$)/g, '<h4>$1</h4>')
              // Convert bold and italic
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              // Convert links
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
              // Convert lists
              .replace(/^\- (.*?)$/gm, '<li>$1</li>')
              .replace(/(<li>.*?<\/li>(\n|$))+/g, '<ul>$&</ul>')
              .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')
              .replace(/(<li>.*?<\/li>(\n|$))+/g, '<ol>$&</ol>')
              // Convert paragraphs (any line not starting with a special character)
              .replace(/^(?!<h|<ul|<ol|<li|<\/|$)(.*?)$/gm, '<p>$1</p>')
              // Convert images
              .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg">')
              // Convert blockquotes
              .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>')
              // Line breaks
              .replace(/\n\n/g, '<br>')
          }} />
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t">
            <h3 className="text-lg font-medium mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="bg-muted px-3 py-1 rounded-full text-sm hover:bg-muted/80 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageLayout>
  );
};

export default BlogPostDetail;
