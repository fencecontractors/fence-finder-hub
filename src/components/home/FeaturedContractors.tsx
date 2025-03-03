
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useContractors } from "@/data";
import ContractorsList from "@/components/contractors/ContractorsList";

const FeaturedContractors = () => {
  const { data: contractors, isLoading } = useContractors();

  // Get top rated contractors (limit to 3)
  const featuredContractors = contractors
    ?.sort((a, b) => b.stars - a.stars || b.reviews - a.reviews)
    .slice(0, 3);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="section-title">Featured Contractors</h2>
            <p className="section-subtitle">Top-rated fence contractors with excellent reviews and service</p>
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

        {!isLoading && featuredContractors && (
          <ContractorsList contractors={featuredContractors} />
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
