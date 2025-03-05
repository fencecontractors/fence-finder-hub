
import { Link } from "react-router-dom";
import { ChevronRight, Trophy } from "lucide-react";
import { useContractors } from "@/data";
import ContractorsList from "@/components/contractors/ContractorsList";

const TopRatedContractors = () => {
  const { data: allContractors, isLoading } = useContractors();
  
  // Get the top 6 rated contractors
  const topRatedContractors = allContractors
    ?.sort((a, b) => b.stars - a.stars || b.reviews - a.reviews)
    .slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="section-title text-3xl font-bold">Top Rated Contractors</h2>
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            <p className="section-subtitle text-muted-foreground">The highest-rated fence contractors based on customer reviews</p>
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
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

        {!isLoading && topRatedContractors && (
          <ContractorsList contractors={topRatedContractors} />
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

export default TopRatedContractors;
