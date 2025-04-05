
import { useState } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  PlusCircle,
  XCircle,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RequestStatusBadge } from "@/components/dashboard/RequestStatusBadge";
import { VacationRequestForm } from "@/components/dashboard/VacationRequestForm";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

// Mock data - in a real app would come from API
const mockVacationRequests = [
  {
    id: "1",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    reason: "Summer vacation",
    status: "approved" as const,
    createdAt: "2025-04-01T10:30:00Z",
  },
  {
    id: "2",
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    reason: "Family event",
    status: "pending" as const,
    createdAt: "2025-04-03T14:20:00Z",
  },
  {
    id: "3",
    startDate: "2025-09-05",
    endDate: "2025-09-10",
    reason: "Personal time",
    status: "rejected" as const, 
    createdAt: "2025-04-05T09:15:00Z",
  },
];

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [vacationRequests] = useState(mockVacationRequests);

  // Calculate stats
  const approved = vacationRequests.filter(r => r.status === "approved").length;
  const pending = vacationRequests.filter(r => r.status === "pending").length;
  const rejected = vacationRequests.filter(r => r.status === "rejected").length;
  
  const totalDays = 25;
  const usedDays = 12;
  const remainingDays = totalDays - usedDays;

  const handleRequestSuccess = () => {
    setOpenDialog(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            Manage your vacation requests and view your stats
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>New Vacation Request</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit a new vacation request.
              </DialogDescription>
            </DialogHeader>
            <VacationRequestForm onSuccess={handleRequestSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vacation Balance"
          value={`${remainingDays} days`}
          description={`of ${totalDays} available days`}
          icon={<CalendarIcon className="h-4 w-4" />}
        />
        <StatCard
          title="Approved"
          value={approved}
          description="Vacation requests"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatCard
          title="Pending"
          value={pending}
          description="Awaiting approval"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Rejected"
          value={rejected}
          description="Declined requests"
          icon={<XCircle className="h-4 w-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacationRequests.map((request) => {
                const start = new Date(request.startDate);
                const end = new Date(request.endDate);
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                return (
                  <TableRow key={request.id}>
                    <TableCell>{format(new Date(request.startDate), "MMM dd, yyyy")}</TableCell>
                    <TableCell>{format(new Date(request.endDate), "MMM dd, yyyy")}</TableCell>
                    <TableCell>{diffDays} days</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      <RequestStatusBadge status={request.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
