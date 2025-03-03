
import { Link } from "react-router-dom";
import { Contractor } from "@/types";
import ContractorCard from "./ContractorCard";
import { formatStateForUrl, formatCityForUrl } from "@/utils";

interface ContractorsListProps {
  contractors: Contractor[];
  emptyMessage?: string;
  searchQuery?: string;
  state?: string;
  city?: string;
}

const ContractorsList = ({ 
  contractors, 
  emptyMessage = "No contractors found for this location.",
  searchQuery = "",
  state,
  city
}: ContractorsListProps) => {
  // Filter contractors based on search query if provided
  const filteredContractors = searchQuery 
    ? contractors.filter(contractor => 
        contractor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contractor.formatted_address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contractors;

  if (filteredContractors.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredContractors.map((contractor) => (
        <Link 
          key={contractor.unique_id}
          to={`/contractors/${state || formatStateForUrl(contractor.state)}/${city || formatCityForUrl(contractor.city)}/${contractor.unique_id}`}
        >
          <ContractorCard contractor={contractor} />
        </Link>
      ))}
    </div>
  );
};

export default ContractorsList;
