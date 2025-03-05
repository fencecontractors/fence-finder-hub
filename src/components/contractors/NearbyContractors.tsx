
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Contractor } from "@/types";

interface NearbyContractorsProps {
  neighborContractors: Contractor[];
  state?: string;
  city?: string;
}

const NearbyContractors = ({ neighborContractors, state, city }: NearbyContractorsProps) => {
  if (neighborContractors.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-card rounded-xl shadow-sm p-6 border">
      <h2 className="text-xl font-bold mb-4">Nearby Contractors</h2>
      <div className="space-y-4">
        {neighborContractors.map(neighbor => {
          const neighborImageSrc = neighbor.local_image_path 
            ? `/images/${neighbor.unique_id}.jpg` 
            : neighbor.photo_url;
          
          return (
            <Card key={neighbor.unique_id} className="p-4 hover:border-primary transition-colors">
              <Link to={`/contractors/${state}/${city}/${neighbor.unique_id}`}>
                <div className="flex items-start space-x-3">
                  <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={neighborImageSrc} 
                      alt={neighbor.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = neighbor.photo_url;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1">{neighbor.title}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-xs font-medium mr-1">{neighbor.stars}</span>
                      <span className="text-xs text-muted-foreground">({neighbor.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NearbyContractors;
