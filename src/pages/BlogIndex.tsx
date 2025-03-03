
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { blogPosts } from "@/data";

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <PageLayout>
      <div className="page-container">
        <h1 className="text-4xl font-bold mb-8 text-center">Fencing Blog</h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Expert advice, industry insights, and helpful guides for all your fencing projects.
        </p>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.id}>
                <BlogPostCard post={post} />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogIndex;
