
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Users,
  XCircle,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequestStatusBadge } from "@/components/dashboard/RequestStatusBadge";
import { format } from "date-fns";

// Mock data - in a real app would come from API
const mockVacationRequests = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "Sarah Johnson",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    reason: "Summer vacation",
    status: "approved" as const,
    createdAt: "2025-04-01T10:30:00Z",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Michael Chen",
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    reason: "Family event",
    status: "pending" as const,
    createdAt: "2025-04-03T14:20:00Z",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Jessica Martinez",
    startDate: "2025-09-05",
    endDate: "2025-09-10",
    reason: "Personal time",
    status: "rejected" as const,
    createdAt: "2025-04-05T09:15:00Z",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "David Kim",
    startDate: "2025-05-20",
    endDate: "2025-05-25",
    reason: "Conference",
    status: "pending" as const,
    createdAt: "2025-04-10T11:45:00Z",
  },
];

const chartData = [
  {
    month: "Jan",
    approved: 5,
    pending: 2,
    rejected: 1,
  },
  {
    month: "Feb",
    approved: 8,
    pending: 3,
    rejected: 2,
  },
  {
    month: "Mar",
    approved: 12,
    pending: 0,
    rejected: 3,
  },
  {
    month: "Apr",
    approved: 7,
    pending: 4,
    rejected: 1,
  },
  {
    month: "May",
    approved: 15,
    pending: 6,
    rejected: 2,
  },
  {
    month: "Jun",
    approved: 18,
    pending: 0,
    rejected: 0,
  },
];

const AdminDashboard = () => {
  const [vacationRequests] = useState(mockVacationRequests);

  // Calculate stats
  const approved = vacationRequests.filter((r) => r.status === "approved").length;
  const pending = vacationRequests.filter((r) => r.status === "pending").length;
  const rejected = vacationRequests.filter((r) => r.status === "rejected").length;
  const totalEmployees = 42; // Mock data

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of all vacation requests and team stats
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          description="Active team members"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Approved Requests"
          value={approved}
          description="Vacation requests"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatCard
          title="Pending Requests"
          value={pending}
          description="Awaiting approval"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Rejected Requests"
          value={rejected}
          description="Declined requests"
          icon={<XCircle className="h-4 w-4" />}
        />
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Vacation Request Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#10b981" name="Approved" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
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
                    <TableCell className="font-medium">
                      {request.employeeName}
                    </TableCell>
                    <TableCell>
                      {format(new Date(request.startDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(request.endDate), "MMM dd, yyyy")}
                    </TableCell>
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

export default AdminDashboard;
