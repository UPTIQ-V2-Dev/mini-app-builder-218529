import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import { Task } from '@/types/task';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and review the project proposal for the new client',
    completed: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests from the development team',
    completed: true,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    title: 'Plan team meeting',
    description: 'Schedule and plan agenda for the weekly team meeting',
    completed: false,
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
  },
  {
    id: '4',
    title: 'Update documentation',
    completed: true,
    createdAt: '2024-01-12T11:20:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
  },
];
