// src/pages/admin/AdminDashboard.tsx

import { Link } from "react-router-dom";
import { useBlogPosts, useContractors, useContactMessages } from "@/data"; // Import useContactMessages
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, FileText, Plus, List, Mail } from "lucide-react"; // Import Mail icon
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { data: blogPosts = [] } = useBlogPosts();
  const { data: contractors = [] } = useContractors();
  const { data: messages = [] } = useContactMessages(); // Get messages

  const stats = [
    {
      title: "Blog Posts",
      value: blogPosts.length,
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-blue-500",
      link: "/admin/blogs",
    },
    {
      title: "Contractors",
      value: contractors.length,
      icon: <Users className="h-5 w-5" />,
      color: "text-green-500",
      link: "/admin/contractors",
    },
    {
      title: "Messages", // Add Messages stat
      value: messages.length,
      icon: <Mail className="h-5 w-5" />, // Add Mail icon
      color: "text-purple-500", // Choose a color
      link: "/admin/contact-messages",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.color}`}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to={stat.link}>
                  <List className="mr-2 h-4 w-4" />
                  Manage {stat.title}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Button asChild size="lg" className="w-full h-auto py-6">
            <Link to="/admin/blogs/create">
              <Plus className="mr-2 h-4 w-4" />
              Create New Blog Post
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full h-auto py-6">
            <Link to="/admin/blogs">
              <FileText className="mr-2 h-4 w-4" />
              Manage Existing Content
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;