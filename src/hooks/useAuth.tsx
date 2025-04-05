
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { loginStart, loginSuccess, loginFailed, logout } from '@/lib/redux/authSlice';
import { useLoginMutation } from '@/lib/redux/api';
import { LoginCredentials } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);
  const [loginApi, { isLoading: isLoginLoading }] = useLoginMutation();
  const { toast } = useToast();

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(loginStart());
      
      // In a real app, this would call the loginApi endpoint
      // For this demo, we'll mock a successful login
      
      // Uncomment this for real API integration:
      // const result = await loginApi(credentials).unwrap();
      // dispatch(loginSuccess(result));

      // Mock login for demonstration
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        dispatch(loginSuccess({ 
          user: { 
            id: '1', 
            email: credentials.email, 
            name: 'Admin User',
            role: 'admin' 
          },
          token: 'mock-jwt-token-admin' 
        }));
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        });
        return true;
      } else if (credentials.email === 'employee@example.com' && credentials.password === 'password') {
        dispatch(loginSuccess({ 
          user: { 
            id: '2', 
            email: credentials.email, 
            name: 'Employee User',
            role: 'employee' 
          },
          token: 'mock-jwt-token-employee' 
        }));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return true;
      } else {
        dispatch(loginFailed('Invalid email or password'));
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Login failed';
      dispatch(loginFailed(errorMessage));
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return { 
    user, 
    isAuthenticated, 
    isLoading: isLoading || isLoginLoading, 
    error, 
    login, 
    logout: logoutUser,
    isAdmin: user?.role === 'admin',
    isEmployee: user?.role === 'employee',
  };
};
