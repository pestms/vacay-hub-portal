
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginCredentials, LoginResponse, VacationRequest, VacationBalance } from '../types';
import { RootState } from './store';

// Create an API with endpoints
export const vacayApi = createApi({
  reducerPath: 'vacayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Vacations', 'Balance'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Vacation requests endpoints
    getEmployeeVacations: builder.query({
      query: (employeeId: string) => `/vacations/employee/${employeeId}`,
      providesTags: ['Vacations'],
    }),
    
    getAllVacations: builder.query({
      query: () => '/vacations',
      providesTags: ['Vacations'],
    }),
    
    createVacationRequest: builder.mutation({
      query: (request: Partial<VacationRequest>) => ({
        url: '/vacations',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['Vacations'],
    }),
    
    updateVacationRequest: builder.mutation({
      query: ({ id, ...patch }: Partial<VacationRequest> & { id: string }) => ({
        url: `/vacations/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Vacations'],
    }),
    
    // Vacation balance endpoints
    getVacationBalance: builder.query({
      query: (employeeId: string) => `/balance/${employeeId}`,
      providesTags: ['Balance'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useGetEmployeeVacationsQuery,
  useGetAllVacationsQuery,
  useCreateVacationRequestMutation,
  useUpdateVacationRequestMutation,
  useGetVacationBalanceQuery,
} = vacayApi;
