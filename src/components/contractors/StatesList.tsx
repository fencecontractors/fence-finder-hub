
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { formatStateForUrl } from "@/utils";

interface StatesListProps {
  states: string[];
  filterQuery?: string;
}

const StatesList = ({ states, filterQuery = "" }: StatesListProps) => {
  // Filter states based on search query if provided
  const filteredStates = filterQuery 
    ? states.filter(state => 
        state.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : states;

  if (filteredStates.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No states found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredStates.map((state) => (
        <Link
          key={state}
          to={`/contractors/${formatStateForUrl(state)}`}
          className="group"
        >
          <div className="bg-card border border-border/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20 group-hover:scale-[1.02]">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-medium">{state}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StatesList;
