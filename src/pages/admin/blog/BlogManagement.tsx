// src/pages/admin/blog/BlogManagement.tsx


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  FileEdit, 
  Trash2,
  Eye
} from "lucide-react";
import { BlogPost } from "@/types";
import { format } from "date-fns";
import DeleteBlogDialog from "@/components/admin/blog/DeleteBlogDialog";

const BlogManagement = () => {
  const { data: blogPosts = [], isLoading } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (blogPosts.length > 0) {
      const filtered = searchQuery
        ? blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : blogPosts;
      
      setFilteredPosts(filtered);
    }
  }, [searchQuery, blogPosts]);

  const handleOpenDeleteDialog = (post: BlogPost) => {
    setPostToDelete(post);
  };

  const handleCloseDeleteDialog = () => {
    setPostToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button asChild>
          <Link to="/admin/blogs/create">
            <Plus className="mr-2 h-4 w-4" />
            New Blog Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <span>All Posts ({filteredPosts.length})</span>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading blog posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-4">
              {searchQuery ? "No posts found matching your search." : "No blog posts yet."}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium max-w-[240px] truncate">
                        {post.title}
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{format(new Date(post.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/admin/blogs/edit/${post.id}`}>
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleOpenDeleteDialog(post)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteBlogDialog 
        post={postToDelete} 
        isOpen={postToDelete !== null}
        onClose={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default BlogManagement;
