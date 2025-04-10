
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./lib/redux/store";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import EmployeeDashboard from "./pages/employee/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

// Placeholder for HR pages - in a real app, create these components
const HRPersonalDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">HR Personal Dashboard</h1></div>;
const HRPersonalRequests = () => <div className="p-6"><h1 className="text-2xl font-bold">HR Personal Requests</h1></div>;
const HRPersonalProfile = () => <div className="p-6"><h1 className="text-2xl font-bold">HR Personal Profile</h1></div>;

const HROfficeDashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">HR Office Dashboard</h1></div>;
const HROfficeUsers = () => <div className="p-6"><h1 className="text-2xl font-bold">HR User Management</h1></div>;
const HROfficeRequests = () => <div className="p-6"><h1 className="text-2xl font-bold">HR Office Requests</h1></div>;
const HROfficeCalendar = () => <div className="p-6"><h1 className="text-2xl font-bold">HR Office Calendar</h1></div>;

const App = () => (
  <ReduxProvider store={store}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* Employee Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['employee']}>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<EmployeeDashboard />} />
            <Route path="requests" element={<EmployeeDashboard />} />
            <Route path="calendar" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeDashboard />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="employees" element={<AdminDashboard />} />
            <Route path="requests" element={<AdminDashboard />} />
            <Route path="calendar" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
          </Route>
          
          {/* HR Routes - Personal */}
          <Route path="/hr/personal" element={
            <ProtectedRoute allowedRoles={['hr']}>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<HRPersonalDashboard />} />
            <Route path="requests" element={<HRPersonalRequests />} />
            <Route path="profile" element={<HRPersonalProfile />} />
          </Route>
          
          {/* HR Routes - Office */}
          <Route path="/hr/office" element={
            <ProtectedRoute allowedRoles={['hr']}>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<HROfficeDashboard />} />
            <Route path="users" element={<HROfficeUsers />} />
            <Route path="requests" element={<HROfficeRequests />} />
            <Route path="calendar" element={<HROfficeCalendar />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ReduxProvider>
);

export default App;
