
import { Link } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Contractor } from "@/types";

interface ContractorHeaderProps {
  contractor: Contractor;
  state?: string;
  city?: string;
}

const ContractorHeader = ({ contractor, state, city }: ContractorHeaderProps) => {
  return (
    <>
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to={`/contractors/${state}/${city}`}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to {city}
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">{contractor.title}</h1>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
          <span className="font-bold mr-1">{contractor.stars}</span>
          <span className="text-muted-foreground">({contractor.reviews} reviews)</span>
        </div>
      </div>
    </>
  );
};

export default ContractorHeader;
