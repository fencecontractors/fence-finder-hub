// src/pages/admin/contractor/ContractorManagement.tsx

import { useState, useEffect, useMemo } from "react";
import {
  useContractors,
  useToggleContractorFeatured,
  updateContractor,
} from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption, // Import TableCaption
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Search, FileEdit, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Contractor } from "@/types";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditContractorDialog from "@/components/admin/contractor/EditContractorDialogue";

const ContractorManagement = () => {
  const { data: contractors = [], isLoading, refetch } = useContractors();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>(
    []
  );
  const toggleFeatured = useToggleContractorFeatured();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "reviews">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(
    null
  );
  const [groupByFeatured, setGroupByFeatured] = useState(false); // New state for grouping

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (contractors.length > 0) {
      let filtered = searchQuery
        ? contractors.filter(
            (contractor) =>
              contractor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              contractor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
              contractor.state.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [...contractors];

      if (sortBy === "rating") {
        filtered = [...filtered].sort((a, b) => {
          const aStars = a.stars ?? null;
          const bStars = b.stars ?? null;

          if (aStars === null && bStars === null) return 0;
          if (aStars === null) return 1;
          if (bStars === null) return -1;

          return sortOrder === "asc" ? aStars - bStars : bStars - aStars;
        });
      } else if (sortBy === "reviews") {
        filtered = [...filtered].sort((a, b) => {
          const aReviews = a.reviews ?? null;
          const bReviews = b.reviews ?? null;

          if (aReviews === null && bReviews === null) return 0;
          if (aReviews === null) return 1;
          if (bReviews === null) return -1;

          return sortOrder === "asc" ? aReviews - bReviews : bReviews - aReviews;
        });
      } else {
        filtered = [...filtered].sort((a, b) =>
          sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
      }
      setFilteredContractors(filtered);
    }
  }, [searchQuery, contractors, sortBy, sortOrder]);

  const handleToggleFeatured = (contractorId: string, isFeatured: boolean) => {
    toggleFeatured.mutate(
      { contractorId, featured: isFeatured },
      {
        onSuccess: () => {
          toast({
            title: isFeatured
              ? "Contractor marked as featured"
              : "Contractor removed from featured",
            description: "The featured status has been updated successfully.",
          });
          refetch();
        },
        onError: () => {
          toast({
            title: "Error",
            description:
              "Failed to update the featured status. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

    // Grouping logic (before pagination)
    const groupedContractors = useMemo(() => {
    if (groupByFeatured) {
      return {
        featured: filteredContractors.filter((c) => c.featured),
        notFeatured: filteredContractors.filter((c) => !c.featured),
      };
    }
    return { all: filteredContractors }; // Return as a single group if not grouping
  }, [filteredContractors, groupByFeatured]);


  // Pagination logic (applied to each group)
  const paginatedContractors = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    if (groupByFeatured) {
      // Paginate each group separately
      return {
        featured: groupedContractors.featured?.slice(startIndex, endIndex),
        notFeatured: groupedContractors.notFeatured?.slice(startIndex, endIndex),
      };
    }
    // Paginate the single "all" group
    return { all: groupedContractors.all?.slice(startIndex, endIndex) };
  }, [groupedContractors, currentPage, pageSize, groupByFeatured]);

    const totalPages = useMemo(() => {
        if(groupByFeatured) {
            return Math.max(
                Math.ceil((groupedContractors.featured?.length ?? 0) / pageSize),
                Math.ceil((groupedContractors.notFeatured?.length ?? 0) / pageSize)
            )
        }
        return Math.ceil((groupedContractors.all?.length ?? 0) / pageSize)
    }, [groupedContractors, pageSize, groupByFeatured])


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (contractor: Contractor) => {
    setEditingContractor(contractor);
  };

  const handleCloseEditDialog = () => {
    setEditingContractor(null);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Contractors Directory</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between gap-4">
              <span>
                All Contractors (
                {groupByFeatured
                  ? (groupedContractors.featured?.length ?? 0) +
                    (groupedContractors.notFeatured?.length ?? 0)
                  : groupedContractors.all?.length ?? 0}
                )
              </span>
              <div className="flex items-center gap-4">
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(value as "name" | "rating" | "reviews")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="reviews">Reviews</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSortOrder((prevOrder) =>
                      prevOrder === "asc" ? "desc" : "asc"
                    )
                  }
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                  <span className="sr-only">Toggle Sort Order</span>
                </Button>

                {/* Group by Featured Toggle */}
                <Button
                  variant={groupByFeatured ? "default" : "outline"}
                  onClick={() => setGroupByFeatured((prev) => !prev)}
                >
                  {groupByFeatured ? "Ungroup" : "Group by Featured"}
                </Button>

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
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading contractors...</div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                {groupByFeatured ? (
                  <>
                    {/* Featured Contractors */}
                    {paginatedContractors.featured?.length > 0 && (
                      <>
                        <TableCaption>Featured Contractors</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Reviews</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedContractors.featured.map((contractor) => (
                            <TableRow key={contractor.unique_id}>
                              <TableCell className="font-medium max-w-[240px] truncate">
                                {contractor.title}
                              </TableCell>
                              <TableCell>
                                {contractor.city}, {contractor.state}
                              </TableCell>
                              <TableCell>
                                {contractor.stars != null
                                  ? `${contractor.stars} ★`
                                  : "N/A"}
                              </TableCell>
                              <TableCell>
                                {contractor.reviews != null
                                  ? String(contractor.reviews)
                                  : "N/A"}
                              </TableCell>
                              <TableCell>
                                <Checkbox
                                  checked={!!contractor.featured}
                                  onCheckedChange={(checked) =>
                                    handleToggleFeatured(
                                      contractor.unique_id,
                                      checked as boolean
                                    )
                                  }
                                  id={`featured-${contractor.unique_id}`}
                                  aria-label="Toggle featured"
                                />
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link
                                      to={`/contractors/${contractor.state}/${contractor.city}/${contractor.unique_id}`}
                                      target="_blank"
                                    >
                                      <Eye className="h-4 w-4" />
                                      <span className="sr-only">View</span>
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(contractor)}
                                  >
                                    <FileEdit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    )}

                    {/* Non-Featured Contractors */}
                    {paginatedContractors.notFeatured?.length > 0 && (
                      <>
                        <TableCaption>Non-Featured Contractors</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Reviews</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedContractors.notFeatured.map(
                            (contractor) => (
                              <TableRow key={contractor.unique_id}>
                                <TableCell className="font-medium max-w-[240px] truncate">
                                  {contractor.title}
                                </TableCell>
                                <TableCell>
                                  {contractor.city}, {contractor.state}
                                </TableCell>
                                <TableCell>
                                  {contractor.stars != null
                                    ? `${contractor.stars} ★`
                                    : "N/A"}
                                </TableCell>
                                <TableCell>
                                  {contractor.reviews != null
                                    ? String(contractor.reviews)
                                    : "N/A"}
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    checked={!!contractor.featured}
                                    onCheckedChange={(checked) =>
                                      handleToggleFeatured(
                                        contractor.unique_id,
                                        checked as boolean
                                      )
                                    }
                                    id={`featured-${contractor.unique_id}`}
                                    aria-label="Toggle featured"
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                      <Link
                                        to={`/contractors/${contractor.state}/${contractor.city}/${contractor.unique_id}`}
                                        target="_blank"
                                      >
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View</span>
                                      </Link>
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEdit(contractor)}
                                    >
                                      <FileEdit className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* All Contractors (Not Grouped) */}
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedContractors.all?.map((contractor) => (
                        <TableRow key={contractor.unique_id}>
                          <TableCell className="font-medium max-w-[240px] truncate">
                            {contractor.title}
                          </TableCell>
                          <TableCell>
                            {contractor.city}, {contractor.state}
                          </TableCell>
                          <TableCell>
                            {contractor.stars != null
                              ? `${contractor.stars} ★`
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            {contractor.reviews != null
                              ? String(contractor.reviews)
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              checked={!!contractor.featured}
                              onCheckedChange={(checked) =>
                                handleToggleFeatured(
                                  contractor.unique_id,
                                  checked as boolean
                                )
                              }
                              id={`featured-${contractor.unique_id}`}
                              aria-label="Toggle featured"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  to={`/contractors/${contractor.state}/${contractor.city}/${contractor.unique_id}`}
                                  target="_blank"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(contractor)}
                              >
                                <FileEdit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </>
                )}
              </Table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <div className="mx-2 flex items-center">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <EditContractorDialog
        contractor={editingContractor}
        open={!!editingContractor}
        onClose={handleCloseEditDialog}
      />
    </div>
  );
};

export default ContractorManagement;