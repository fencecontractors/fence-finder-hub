import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Globe, Star, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import ContractorMap from "@/components/contractors/ContractorMap";
import { useContractor, useNeighboringContractors } from "@/data";
import { Contractor } from "@/types";

const ContractorDetail = () => {
  const { state, city, id } = useParams<{ state: string; city: string; id: string }>();
  const { data: contractor, isLoading: isLoadingContractor } = useContractor(id || "");
  const [neighborIds, setNeighborIds] = useState<string[]>([]);
  const { data: neighborContractors = [], isLoading: isLoadingNeighbors } = useNeighboringContractors(neighborIds);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (contractor?.neighbors) {
      setNeighborIds(contractor.neighbors);
    }
  }, [contractor]);

  if (isLoadingContractor) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <p>Loading contractor details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!contractor) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <h1 className="text-4xl font-bold mb-8">Contractor Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the contractor you're looking for.</p>
          <Button asChild>
            <Link to={`/contractors/${state}/${city}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {city}
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const imageSrc = contractor.local_image_path 
    ? `/images/${contractor.unique_id}.jpg` 
    : imageError 
      ? contractor.photo_url 
      : contractor.updated_image;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": contractor.title,
    "image": imageSrc,
    "telephone": contractor.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contractor.address,
      "addressLocality": contractor.city,
      "addressRegion": contractor.state
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": contractor.latitude,
      "longitude": contractor.longitude
    },
    "url": contractor.website,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": contractor.stars,
      "reviewCount": contractor.reviews
    }
  };

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="page-container">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to={`/contractors/${state}/${city}`}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to {city}
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-xl shadow-sm p-6 border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">{contractor.title}</h1>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-bold mr-1">{contractor.stars}</span>
                  <span className="text-muted-foreground">({contractor.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="mb-6">
                <img 
                  src={imageSrc} 
                  alt={`${contractor.title} - Fence contractor in ${contractor.city}, ${contractor.state}`}
                  className="w-full h-auto object-cover rounded-lg"
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
            
            <div className="bg-card rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <ContractorMap contractor={contractor} />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {neighborContractors.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContractorDetail;
