
import { Contractor } from "@/types";
import ContractorCard from "./ContractorCard";

interface ContractorsListProps {
  contractors: Contractor[];
  emptyMessage?: string;
}

const ContractorsList = ({ 
  contractors, 
  emptyMessage = "No contractors found for this location." 
}: ContractorsListProps) => {
  if (contractors.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contractors.map((contractor) => (
        <ContractorCard key={contractor.unique_id} contractor={contractor} />
      ))}
    </div>
  );
};

export default ContractorsList;
