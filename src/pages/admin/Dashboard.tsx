
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Users,
  XCircle,
  BarChart3,
  ArrowUpRight,
  TrendingUp,
  Activity,
  AlertCircle,
  Award,
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

const pieData = [
  { name: "Vacation", value: 55, color: "#10B981" },
  { name: "Sick Leave", value: 25, color: "#F59E0B" },
  { name: "Personal", value: 15, color: "#6366F1" },
  { name: "Other", value: 5, color: "#EC4899" },
];

const lineData = [
  { month: "Jan", requests: 8 },
  { month: "Feb", requests: 12 },
  { month: "Mar", requests: 15 },
  { month: "Apr", requests: 10 },
  { month: "May", requests: 22 },
  { month: "Jun", requests: 18 },
];

// Mock top departments data
const topDepartments = [
  { id: "1", name: "Engineering", count: 28, percentage: 35 },
  { id: "2", name: "Sales", count: 21, percentage: 26 },
  { id: "3", name: "Marketing", count: 15, percentage: 19 },
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of all vacation requests and team stats
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          description="Active team members"
          icon={<Users />}
          variant="purple"
        />
        <StatCard
          title="Approved Requests"
          value={approved}
          description="Vacation requests"
          icon={<CheckCircle />}
          variant="green"
        />
        <StatCard
          title="Pending Requests"
          value={pending}
          description="Awaiting approval"
          icon={<Clock />}
          variant="amber"
        />
        <StatCard
          title="Rejected Requests"
          value={rejected}
          description="Declined requests"
          icon={<XCircle />}
          variant="red"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Request Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-500" />
              Leave Types
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => entry.name}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full">
        <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20">
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-sky-500" />
            Monthly Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#10b981" name="Approved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20">
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-500" />
              Top Departments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topDepartments.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-vacay-600 mr-2"></div>
                    <span>{dept.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{dept.count}</span>
                    <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                      {dept.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-slate-500" />
              Recent Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Days</TableHead>
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
    </div>
  );
};

export default AdminDashboard;
