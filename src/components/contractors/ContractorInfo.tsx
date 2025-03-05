
import { MapPin, Phone, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contractor } from "@/types";

interface ContractorInfoProps {
  contractor: Contractor;
  imageSrc: string;
  setImageError: (value: boolean) => void;
}

const ContractorInfo = ({ contractor, imageSrc, setImageError }: ContractorInfoProps) => {
  return (
    <div className="bg-card rounded-xl shadow-sm p-6 border">
      <div className="mb-6">
        <img 
          src={imageSrc} 
          alt={`${contractor.title} - Fence contractor in ${contractor.city}, ${contractor.state}`}
          className="w-full h-auto object-cover rounded-lg"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Address</h3>
            <p className="text-muted-foreground">{contractor.formatted_address}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-muted-foreground">
              <a href={`tel:${contractor.phone}`} className="hover:text-primary transition-colors">
                {contractor.phone}
              </a>
            </p>
          </div>
        </div>
        
        {contractor.website && (
          <div className="flex items-start space-x-3">
            <Globe className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Website</h3>
              <p className="text-muted-foreground truncate">
                <a 
                  href={contractor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {contractor.website}
                </a>
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-start space-x-3">
          <Badge variant="outline" className="mt-0.5">
            {contractor.category}
          </Badge>
        </div>
      </div>
      
      <div className="mb-6">
        <Button asChild>
          <a href={contractor.link} target="_blank" rel="noopener noreferrer">
            View on Google Maps
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ContractorInfo;
