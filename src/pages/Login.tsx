
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { isAuthenticated, user } = useAuth();
  
  // If user is already authenticated, redirect to appropriate dashboard
  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
        <div className="w-[350px] mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <div>Use these demo accounts:</div>
            <div>Admin: admin@example.com</div>
            <div>Employee: employee@example.com</div>
            <div>Password: password</div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center p-8">
        <div className="max-w-md space-y-6 text-center">
          <div className="flex justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-vacay-400"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" y1="8" x2="12" y2="8" />
              <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
              <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome To Holiday Management System
          </h1>
          <p className="text-lg text-gray-300">
            Streamline your leave requests and approvals with our easy-to-use platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
