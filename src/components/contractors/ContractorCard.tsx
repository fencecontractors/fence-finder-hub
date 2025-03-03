
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Phone } from "lucide-react";
import { formatCityName, formatStateForUrl, formatCityForUrl, generateContractorImageAlt } from "@/utils";
import { Contractor } from "@/types";

interface ContractorCardProps {
  contractor: Contractor;
}

const ContractorCard = ({ contractor }: ContractorCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const stateUrl = formatStateForUrl(contractor.state);
  const cityUrl = formatCityForUrl(contractor.city);
  const detailUrl = `/contractors/${stateUrl}/${cityUrl}/${contractor.unique_id}`;
  
  // Use local image path if available, otherwise use the updated_image
  const imageSrc = contractor.local_image_path 
    ? `/images/${contractor.unique_id}.jpg` 
    : imageError 
      ? contractor.photo_url 
      : contractor.updated_image;

  return (
    <div className="contractor-card overflow-hidden">
      <Link to={detailUrl} className="block">
        <div className={`relative h-48 w-full ${!imageLoaded ? 'image-shimmer' : ''}`}>
          <img
            src={imageSrc}
            alt={generateContractorImageAlt(contractor)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={detailUrl} className="block">
          <h3 className="text-lg font-medium mb-1 hover:text-primary transition-colors">
            {contractor.title}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium mr-1">{contractor.stars}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({Math.round(contractor.reviews)} reviews)
          </span>
        </div>

        <div className="flex items-start space-x-2 text-sm mb-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <span className="text-muted-foreground">{contractor.formatted_address}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <a 
            href={`tel:${contractor.phone}`} 
            className="text-primary hover:underline"
          >
            {contractor.phone}
          </a>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            to={detailUrl}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
          <span className="chip">
            {contractor.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard;
