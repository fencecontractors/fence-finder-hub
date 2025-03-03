
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="group">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className={`relative h-52 w-full rounded-lg overflow-hidden mb-4 ${!imageLoaded ? 'image-shimmer' : ''}`}>
          <img
            src={post.image}
            alt={post.title}
            className={`h-full w-full object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>

      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Calendar className="h-4 w-4 mr-1" />
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        })}</time>
      </div>

      <Link to={`/blog/${post.slug}`} className="block group-hover:text-primary transition-colors">
        <h3 className="text-xl font-medium mb-2">{post.title}</h3>
      </Link>

      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default BlogPostCard;
