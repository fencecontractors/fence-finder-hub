
import ContractorMap from "@/components/contractors/ContractorMap";
import { Contractor } from "@/types";

interface LocationMapSectionProps {
  contractor: Contractor;
}

const LocationMapSection = ({ contractor }: LocationMapSectionProps) => {
  return (
    <div className="bg-card rounded-xl shadow-sm p-6 border">
      <h2 className="text-xl font-bold mb-4">Location</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <ContractorMap contractor={contractor} />
      </div>
    </div>
  );
};

export default LocationMapSection;
