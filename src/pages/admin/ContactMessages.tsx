// src/pages/admin/ContactMessages.tsx
import { useState, useEffect } from "react";
import { useContactMessages } from "@/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Trash2, Eye, CheckCircle } from "lucide-react"; // Import icons
import { useToast } from "@/components/ui/use-toast";
import { deleteContactMessage, markMessageAsRead } from "@/data"; // Import markMessageAsRead


interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean; // Add read property
}

const ContactMessages = () => {
  const { data: messages = [], isLoading, refetch } = useContactMessages();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();

    const handleMarkAsRead = async (messageId: string) => {
    try {
      await markMessageAsRead(messageId);
      toast({
        title: "Marked as read",
        description: "The message has been marked as read.",
      });
      refetch(); // Refresh after marking as read
    } catch (error) {
      console.error("Error marking as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark the message as read.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteContactMessage(messageId);
        toast({
          title: "Message deleted",
          description: "The message has been successfully deleted",
        });
        refetch(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting message:", error);
        toast({
          title: "Deletion failed",
          description:
            "An error occurred while trying to delete the message.",
          variant: "destructive",
        });
      }
    }
  };

  return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Messages ({messages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-4">No messages yet.</div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message.id} className={message.read ? "" : "font-bold"}>
                        <TableCell>{format(new Date(message.date), 'MMM d, yyyy hh:mm a')}</TableCell>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell className="max-w-[300px] truncate">
                          {message.message}
                        </TableCell>
                        <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                            {!message.read && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMarkAsRead(message.id)}
                            >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Mark as Read</span>
                            </Button>
                            )}
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-500"
                            >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
};

export default ContactMessages;