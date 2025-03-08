// pages/index.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeaturedContractors from "@/components/home/FeaturedContractors";
import TopRatedContractors from "@/components/home/TopRatedContractors";
import PageLayout from "@/components/layout/PageLayout";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              Find Trusted Fence Contractors
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in">
              Connect with the Best Fence Contractors in Your Area
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
              Browse our directory of top-rated fence contractors. Compare reviews, services, and get the perfect fence for your property.
            </p>
            
            <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto mb-8 animate-fade-in delay-200">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter your location or contractor name..."
                  className="pl-10 pr-4 h-12 rounded-l-lg rounded-r-none border-r-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="h-12 rounded-l-none px-6">
                Search
              </Button>
            </form>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Featured Contractors Section */}
      <FeaturedContractors />

      {/* Top Rated Contractors Section */}
      <TopRatedContractors />

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Search</h3>
              <p className="text-muted-foreground">Find fence contractors in your area by searching your city or state.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Compare</h3>
              <p className="text-muted-foreground">View detailed profiles, ratings, and reviews to compare contractors.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-muted-foreground">Connect directly with your chosen contractor to discuss your project.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
