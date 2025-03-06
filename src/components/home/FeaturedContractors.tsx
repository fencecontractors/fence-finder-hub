
import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { useContractors, useFeaturedContractors } from "@/data";
import ContractorsList from "@/components/contractors/ContractorsList";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const FeaturedContractors = () => {
  const queryClient = useQueryClient();
  const { data: allContractors, isLoading: isAllLoading } = useContractors();
  const { data: featuredContractors, isLoading: isFeaturedLoading, refetch } = useFeaturedContractors();
  
  // Force refetch on mount to ensure we have the latest data
  useEffect(() => {
    // Invalidate the featured contractors query to ensure we get fresh data
    queryClient.invalidateQueries({ queryKey: ["contractors", "featured"] });
    refetch();
  }, [queryClient, refetch]);
  
  // If there are no explicitly featured contractors, fall back to top rated ones
  const isLoading = isAllLoading || isFeaturedLoading;
  const displayContractors = featuredContractors?.length 
    ? featuredContractors 
    : allContractors
        ?.sort((a, b) => b.stars - a.stars || b.reviews - a.reviews)
        .slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="section-title text-3xl font-bold">Featured Contractors</h2>
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            </div>
            <p className="section-subtitle text-muted-foreground">Top-rated fence contractors with excellent reviews and service</p>
          </div>
          <Link 
            to="/contractors" 
            className="text-primary font-medium hover:underline flex items-center group hidden md:flex"
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border/50">
                <div className="h-48 w-full bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && displayContractors && (
          <>
            <ContractorsList contractors={displayContractors} />
            {featuredContractors?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center mt-4">
                <em>Showing top-rated contractors. Visit the admin panel to mark contractors as featured.</em>
              </p>
            )}
          </>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link 
            to="/contractors" 
            className="text-primary font-medium hover:underline flex items-center justify-center group"
          >
            View All Contractors
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContractors;
