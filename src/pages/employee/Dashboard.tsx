
import { useState } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  PlusCircle,
  XCircle,
  AlertTriangle,
  Briefcase,
  BarChart3,
  ArrowDownRight,
  ArrowUpRight,
  Users,
  Trophy,
  Star,
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
import { format, addDays } from "date-fns";
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

// Mock upcoming time off
const upcomingTimeOff = [
  {
    id: "1",
    date: addDays(new Date(), 15),
    duration: "7 days",
    type: "Vacation",
  },
  {
    id: "2",
    date: addDays(new Date(), 45),
    duration: "1 day",
    type: "Personal Day",
  },
];

// Mock team absences
const teamAbsences = [
  {
    id: "1",
    name: "Maria Johnson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    startDate: addDays(new Date(), 5),
    endDate: addDays(new Date(), 12),
  },
  {
    id: "2",
    name: "Alex Chen",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    startDate: addDays(new Date(), 20),
    endDate: addDays(new Date(), 25),
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            Manage your vacation requests and view your stats
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-vacay-600 hover:bg-vacay-700">
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
          icon={<CalendarIcon />}
          variant="blue"
        />
        <StatCard
          title="Approved"
          value={approved}
          description="Vacation requests"
          icon={<CheckCircle />}
          variant="green"
        />
        <StatCard
          title="Pending"
          value={pending}
          description="Awaiting approval"
          icon={<Clock />}
          variant="amber"
        />
        <StatCard
          title="Rejected"
          value={rejected}
          description="Declined requests"
          icon={<XCircle />}
          variant="red"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20">
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
              Upcoming Time Off
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {upcomingTimeOff.length > 0 ? (
              <div className="space-y-4">
                {upcomingTimeOff.map((timeOff) => (
                  <div key={timeOff.id} className="flex items-center p-3 rounded-lg bg-muted/50">
                    <div className="bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300 p-2 rounded-full mr-3">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{format(timeOff.date, "MMMM dd, yyyy")}</p>
                      <p className="text-sm text-muted-foreground">{timeOff.duration} - {timeOff.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">No upcoming time off</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-500" />
              Team Absences
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {teamAbsences.length > 0 ? (
              <div className="space-y-4">
                {teamAbsences.map((absence) => (
                  <div key={absence.id} className="flex items-center p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-muted">
                      <img
                        src={absence.avatarUrl}
                        alt={absence.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{absence.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(absence.startDate, "MMM dd")} - {format(absence.endDate, "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">No team absences</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-slate-500" />
            Recent Requests
          </CardTitle>
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
