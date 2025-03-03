
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
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
          
          <div className="flex justify-center space-x-4 sm:space-x-8 animate-fade-in delay-300">
            <Button variant="ghost" className="group" asChild>
              <a href="/contractors">
                Browse All Contractors
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="ghost" className="group" asChild>
              <a href="/blog">
                Read Our Blog
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;
