
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { formatCityName, formatStateForUrl, formatCityForUrl } from "@/utils";

interface CitiesListProps {
  state: string;
  cities: string[];
}

const CitiesList = ({ state, cities }: CitiesListProps) => {
  if (cities.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No cities found for this state.</p>
      </div>
    );
  }

  const stateUrl = formatStateForUrl(state);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cities.map((city) => (
        <Link
          key={city}
          to={`/contractors/${stateUrl}/${formatCityForUrl(city)}`}
          className="group"
        >
          <div className="bg-card border border-border/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20 group-hover:scale-[1.02]">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-medium">{formatCityName(city)}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CitiesList;
