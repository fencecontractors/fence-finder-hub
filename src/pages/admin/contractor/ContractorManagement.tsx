
import { useState, useEffect } from "react";
import { useContractors, useToggleContractorFeatured } from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  FileEdit, 
  Eye,
  Star
} from "lucide-react";
import { Contractor } from "@/types";
import { Link } from "react-router-dom";

const ContractorManagement = () => {
  const { data: contractors = [], isLoading } = useContractors();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);
  const toggleFeatured = useToggleContractorFeatured();
  const { toast } = useToast();

  useEffect(() => {
    if (contractors.length > 0) {
      const filtered = searchQuery
        ? contractors.filter(contractor => 
            contractor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contractor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contractor.state.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : contractors;
      
      setFilteredContractors(filtered);
    }
  }, [searchQuery, contractors]);

  const handleToggleFeatured = (contractorId: string, isFeatured: boolean) => {
    toggleFeatured.mutate(
      { contractorId, featured: isFeatured },
      {
        onSuccess: () => {
          toast({
            title: isFeatured ? "Contractor marked as featured" : "Contractor removed from featured",
            description: "The featured status has been updated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update the featured status. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Contractors Directory</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <span>All Contractors ({filteredContractors.length})</span>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search contractors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading contractors...</div>
          ) : filteredContractors.length === 0 ? (
            <div className="text-center py-4">
              {searchQuery ? "No contractors found matching your search." : "No contractors in the directory."}
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContractors.slice(0, 50).map((contractor) => (
                    <TableRow key={contractor.unique_id}>
                      <TableCell className="font-medium max-w-[240px] truncate">
                        {contractor.title}
                      </TableCell>
                      <TableCell>{contractor.city}, {contractor.state}</TableCell>
                      <TableCell>{contractor.stars} ★ ({contractor.reviews})</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={contractor.featured}
                          onCheckedChange={(checked) => 
                            handleToggleFeatured(contractor.unique_id, checked as boolean)
                          }
                          id={`featured-${contractor.unique_id}`}
                          aria-label="Toggle featured"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/contractors/${contractor.state}/${contractor.city}/${contractor.unique_id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" disabled>
                            <FileEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredContractors.length > 50 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Showing first 50 of {filteredContractors.length} contractors
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractorManagement;
