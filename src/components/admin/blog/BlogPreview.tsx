
import { format } from "date-fns";
import { BlogPost } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPreviewProps {
  post: BlogPost;
}

// Function to convert markdown to HTML (same as in BlogPostDetail)
const markdownToHtml = (markdown: string): string => {
  return markdown
    // Convert headings
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.*?)$/gm, '<h4>$1</h4>')
    // Convert bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Convert links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Convert unordered lists (must be done before paragraph conversion)
    .replace(/^[\*\-] (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>(\n|$))+/g, '<ul class="list-disc pl-6 my-4">$&</ul>')
    // Convert ordered lists
    .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>(\n|$))+/g, '<ol class="list-decimal pl-6 my-4">$&</ol>')
    // Convert paragraphs (any line not starting with a special character)
    .replace(/^(?!<h|<ul|<ol|<li|<\/|$)(.*?)$/gm, '<p class="my-4">$1</p>')
    // Convert images
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="my-6 rounded-lg w-full">')
    // Convert blockquotes
    .replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic my-4">$1</blockquote>')
    // Convert code blocks
    .replace(/```(.*?)\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$2</code></pre>')
    // Convert inline code
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded">$1</code>')
    // Add id attributes to headings for TOC links
    .replace(/<h2>(.*?)<\/h2>/g, '<h2 id="$1" class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/<h3>(.*?)<\/h3>/g, '<h3 id="$1" class="text-xl font-bold mt-6 mb-3">$1</h3>')
    // Preserve line breaks
    .replace(/\n\n/g, '<br>');
};

const BlogPreview = ({ post }: BlogPreviewProps) => {
  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <Card>
      <CardContent className="p-6">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title || "Untitled Post"}</h1>
          
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
          
          {post.image && (
            <div className="rounded-xl overflow-hidden mb-8 aspect-[2/1]">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t">
              <h3 className="text-lg font-medium mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </CardContent>
    </Card>
  );
};

export default BlogPreview;
