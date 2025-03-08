// src/components/search/SearchModal.tsx


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search as SearchIcon, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContractors, useLocationData } from "@/data";
import { formatCityName, formatStateForUrl, formatCityForUrl } from "@/utils";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: contractors } = useContractors();
  const { data: locationData } = useLocationData();
  const [results, setResults] = useState<{
    contractors: Array<{ id: string; name: string; city: string; state: string }>;
    locations: Array<{ city?: string; state: string }>;
  }>({
    contractors: [],
    locations: [],
  });

  useEffect(() => {
    if (!query || !contractors || !locationData) {
      setResults({ contractors: [], locations: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Filter contractors
    const matchingContractors = contractors
      .filter(c => 
        c.title.toLowerCase().includes(lowerQuery) ||
        c.city.toLowerCase().includes(lowerQuery) ||
        c.state.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3)
      .map(c => ({
        id: c.unique_id,
        name: c.title,
        city: c.city,
        state: c.state
      }));

    // Filter locations
    const matchingStates = locationData.states
      .filter(state => state.toLowerCase().includes(lowerQuery))
      .map(state => ({ state }));

    const matchingCities: Array<{ city: string; state: string }> = [];
    Object.entries(locationData.citiesByState).forEach(([state, cities]) => {
      cities
        .filter(city => city.toLowerCase().includes(lowerQuery) || state.toLowerCase().includes(lowerQuery))
        .slice(0, 3)
        .forEach(city => matchingCities.push({ city, state }));
    });

    setResults({
      contractors: matchingContractors,
      locations: [...matchingStates, ...matchingCities.slice(0, 3)]
    });
  }, [query, contractors, locationData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleContractorClick = (id: string, state: string, city: string) => {
    navigate(`/contractors/${formatStateForUrl(state)}/${formatCityForUrl(city)}/${id}`);
    onClose();
  };

  const handleLocationClick = (state: string, city?: string) => {
    if (city) {
      navigate(`/contractors/${formatStateForUrl(state)}/${formatCityForUrl(city)}`);
    } else {
      navigate(`/contractors/${formatStateForUrl(state)}`);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search for contractors</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4 py-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              className="pl-10 pr-4"
              placeholder="Search by location or contractor name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          
          {query && (
            <div className="space-y-4">
              {results.contractors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contractors</h3>
                  <ul className="space-y-2">
                    {results.contractors.map((contractor) => (
                      <li key={contractor.id}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-start"
                          onClick={() => handleContractorClick(contractor.id, contractor.state, contractor.city)}
                        >
                          <SearchIcon className="h-4 w-4 mr-2 mt-1" />
                          <div>
                            <div className="font-medium">{contractor.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatCityName(contractor.city)}, {contractor.state}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.locations.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Locations</h3>
                  <ul className="space-y-2">
                    {results.locations.map((location, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-start"
                          onClick={() => handleLocationClick(location.state, location.city)}
                        >
                          <MapPin className="h-4 w-4 mr-2 mt-1" />
                          <div>
                            {location.city 
                              ? <div className="font-medium">{formatCityName(location.city)}, {location.state}</div> 
                              : <div className="font-medium">{location.state}</div>}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.contractors.length === 0 && results.locations.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No results found</p>
                  <p className="text-sm mt-1">Try searching for a different location or contractor name.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
