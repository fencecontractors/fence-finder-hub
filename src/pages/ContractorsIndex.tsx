
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import StatesList from "@/components/contractors/StatesList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ContractorsIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <PageLayout>
      <div className="page-container">
        <h1 className="text-4xl font-bold mb-8">Fence Contractors Directory</h1>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Filter states..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <StatesList filterQuery={searchQuery} />
      </div>
    </PageLayout>
  );
};

export default ContractorsIndex;
