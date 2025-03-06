
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import ContractorCard from "@/components/contractors/ContractorCard";
import { useContractors } from "@/data";
import { Contractor } from "@/types";
import { formatStateForUrl, formatCityForUrl } from "@/utils";

const RESULTS_PER_PAGE = 12;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<Contractor[]>([]);
  const [displayedResults, setDisplayedResults] = useState<Contractor[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { data: contractors = [], isLoading } = useContractors();
  
  useEffect(() => {
    // Set the search input value to the query parameter
    setSearchQuery(query);
    
    // Filter contractors based on the search query
    if (query && contractors.length > 0) {
      const filteredResults = contractors.filter(contractor => 
        contractor.title.toLowerCase().includes(query.toLowerCase()) ||
        contractor.city.toLowerCase().includes(query.toLowerCase()) ||
        contractor.state.toLowerCase().includes(query.toLowerCase()) ||
        contractor.formatted_address.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
      setDisplayedResults(filteredResults.slice(0, RESULTS_PER_PAGE));
      setPage(1);
    } else {
      setResults([]);
      setDisplayedResults([]);
      setPage(1);
    }
  }, [query, contractors]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const loadMoreResults = () => {
    setIsLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextPage = page + 1;
      const nextResults = results.slice(0, nextPage * RESULTS_PER_PAGE);
      setDisplayedResults(nextResults);
      setPage(nextPage);
      setIsLoadingMore(false);
    }, 500);
  };
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <p>Loading...</p>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="page-container">
        <h1 className="text-4xl font-bold mb-8 text-center">Search Results</h1>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search contractors by name, city, or state..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </div>
        </form>
        
        {query && (
          <div className="mb-8">
            <p className="text-lg text-center">
              {results.length === 0 
                ? "No results found" 
                : `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`}
            </p>
          </div>
        )}
        
        {displayedResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedResults.map(contractor => (
              <Link 
                key={contractor.unique_id}
                to={`/contractors/${formatStateForUrl(contractor.state)}/${formatCityForUrl(contractor.city)}/${contractor.unique_id}`}
              >
                <ContractorCard contractor={contractor} />
              </Link>
            ))}
          </div>
        )}
        
        {displayedResults.length > 0 && displayedResults.length < results.length && (
          <div className="mt-8 text-center">
            <Button 
              onClick={loadMoreResults} 
              disabled={isLoadingMore}
              variant="outline" 
              size="lg"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                `Load More (${results.length - displayedResults.length} remaining)`
              )}
            </Button>
          </div>
        )}
        
        {results.length === 0 && query && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-4">No contractors found matching your search</h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search query or browse our directory by state and city
            </p>
            <Button asChild>
              <Link to="/contractors">
                Browse All Contractors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default SearchResults;
