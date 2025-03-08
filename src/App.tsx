
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Main Routes
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContractorsIndex from "./pages/ContractorsIndex";
import StateContractors from "./pages/StateContractors";
import CityContractors from "./pages/CityContractors";
import ContractorDetail from "./pages/ContractorDetail";
import BlogIndex from "./pages/BlogIndex";
import BlogPostDetail from "./pages/BlogPostDetail";
import SearchResults from "./pages/SearchResults";
import Sitemap from "./pages/Sitemap";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import ContactMessages from "./pages/admin/ContactMessages";

// Admin Routes
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManagement from "./pages/admin/blog/BlogManagement";
import BlogEditor from "./pages/admin/blog/BlogEditor";
import ContractorManagement from "./pages/admin/contractor/ContractorManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />


            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Contractors Routes */}
            <Route path="/contractors" element={<ContractorsIndex />} />
            <Route path="/contractors/:state" element={<StateContractors />} />
            <Route path="/contractors/:state/:city" element={<CityContractors />} />
            <Route path="/contractors/:state/:city/:id" element={<ContractorDetail />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            
            {/* Search Route */}
            <Route path="/search" element={<SearchResults />} />
            
            {/* Sitemap Route */}
            <Route path="/sitemap.xml" element={<Sitemap />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<BlogManagement />} />
              <Route path="blogs/create" element={<BlogEditor />} />
              <Route path="blogs/edit/:id" element={<BlogEditor />} />
              <Route path="contractors" element={<ContractorManagement />} />
             <Route path="contact-messages" element={<ContactMessages />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
