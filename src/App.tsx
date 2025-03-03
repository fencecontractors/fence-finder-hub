
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContractorsIndex from "./pages/ContractorsIndex";
import StateContractors from "./pages/StateContractors";
import CityContractors from "./pages/CityContractors";
import ContractorDetail from "./pages/ContractorDetail";
import BlogIndex from "./pages/BlogIndex";
import BlogPostDetail from "./pages/BlogPostDetail";
import SearchResults from "./pages/SearchResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
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
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
