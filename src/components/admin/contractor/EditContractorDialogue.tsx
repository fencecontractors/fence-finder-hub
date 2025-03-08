// src/components/admin/contractor/EditContractorDialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Contractor } from "@/types";
import { updateContractor } from "@/data"; // Import updateContractor
import { useToast } from "@/components/ui/use-toast";

interface EditContractorDialogProps {
  contractor: Contractor | null;
  open: boolean;
  onClose: () => void;
}

const EditContractorDialog = ({
  contractor,
  open,
  onClose,
}: EditContractorDialogProps) => {
  const [editedContractor, setEditedContractor] = useState<Contractor | null>(
    null
  );
  const { toast } = useToast();

  // Initialize editedContractor when the contractor prop changes
  useEffect(() => {
    if (contractor) {
      setEditedContractor(contractor);
    }
  }, [contractor]);

  const handleInputChange = (
    field: keyof Contractor,
    value: string | number
  ) => {
    if (editedContractor) {
      setEditedContractor({
        ...editedContractor,
        [field]: value,
      });
    }
  };

  const handleSave = async () => {
    if (editedContractor) {
      try {
        await updateContractor(editedContractor); // Use updateContractor
        toast({
          title: "Contractor Updated",
          description: "The contractor has been updated successfully.",
        });
        onClose(); // Close the dialog
      } catch (error) {
        console.error("Error updating contractor:", error);
        toast({
          title: "Update Failed",
          description: "Failed to update the contractor.",
          variant: "destructive",
        });
      }
    }
  };

  if (!contractor) {
    return null; // Don't render if no contractor is selected
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contractor</DialogTitle>
          <DialogDescription>
            Make changes to the contractor details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={editedContractor?.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              value={editedContractor?.city || ""}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input
              id="state"
              value={editedContractor?.state || ""}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stars" className="text-right">
              Stars
            </Label>
            <Input
              id="stars"
              type="number"
              value={editedContractor?.stars || 0}
              onChange={(e) =>
                handleInputChange("stars", parseInt(e.target.value, 10))
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reviews" className="text-right">
              Reviews
            </Label>
            <Input
              id="reviews"
              type="number"
              value={editedContractor?.reviews || 0}
              onChange={(e) =>
                handleInputChange("reviews", parseInt(e.target.value, 10))
              }
              className="col-span-3"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={editedContractor?.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="col-span-3"
            />
          </div>
          {/* Add input fields for other properties as needed */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContractorDialog;