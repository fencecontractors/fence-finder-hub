
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import CitiesList from "@/components/contractors/CitiesList";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLocationData } from "@/data";

const StateContractors = () => {
  const { state } = useParams<{ state: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [formattedState, setFormattedState] = useState("");
  const { data: locationData, isLoading } = useLocationData();
  const [cities, setCities] = useState<string[]>([]);
  const [stateExists, setStateExists] = useState(false);
  
  useEffect(() => {
    if (state) {
      // Convert URL format (texas) to display format (Texas)
      setFormattedState(state.charAt(0).toUpperCase() + state.slice(1));
    }

    if (locationData && state) {
      // Check if state exists in data
      const foundState = locationData.states.find(
        s => s.toLowerCase() === state.toLowerCase()
      );
      
      if (foundState) {
        setStateExists(true);
        setCities(locationData.citiesByState[foundState] || []);
      } else {
        setStateExists(false);
        setCities([]);
      }
    }
  }, [state, locationData]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <p>Loading...</p>
        </div>
      </PageLayout>
    );
  }
  
  if (!stateExists) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <h1 className="text-4xl font-bold mb-8">State Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find any fence contractors in this state.</p>
          <Button asChild>
            <Link to="/contractors">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to All States
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
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/contractors">
              <ChevronLeft className="mr-1 h-4 w-4" />
              All States
            </Link>
          </Button>
          <h1 className="text-4xl font-bold">Fence Contractors in {formattedState}</h1>
        </div>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Filter cities..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <CitiesList state={state || ""} cities={cities} filterQuery={searchQuery} />
      </div>
    </PageLayout>
  );
};

export default StateContractors;
