
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ContractorsList from "@/components/contractors/ContractorsList";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { fenceContractors } from "@/data";

const CityContractors = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [formattedState, setFormattedState] = useState("");
  const [formattedCity, setFormattedCity] = useState("");
  
  useEffect(() => {
    if (state) {
      // Convert URL format (texas) to display format (Texas)
      setFormattedState(state.charAt(0).toUpperCase() + state.slice(1));
    }
    if (city) {
      // Convert URL format (fortworth) to display format (Fort Worth)
      // This is simplistic and might need more sophisticated formatting depending on your data
      setFormattedCity(
        city
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters if camelCase
          .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      );
    }
  }, [state, city]);

  // Check if city exists in data for the given state
  const cityExists = fenceContractors.some(
    contractor => 
      contractor.state.toLowerCase() === state?.toLowerCase() &&
      contractor.city.toLowerCase() === city?.toLowerCase()
  );
  
  if (!cityExists) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <h1 className="text-4xl font-bold mb-8">City Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find any fence contractors in this city.</p>
          <Button asChild>
            <Link to={`/contractors/${state}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {formattedState}
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="page-container">
        <div className="flex items-center mb-8">
          <div className="flex items-center mr-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/contractors/${state}`}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                {formattedState}
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl font-bold">Fence Contractors in {formattedCity}</h1>
        </div>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search contractors..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ContractorsList 
          state={state || ""} 
          city={city || ""} 
          searchQuery={searchQuery} 
        />
      </div>
    </PageLayout>
  );
};

export default CityContractors;
