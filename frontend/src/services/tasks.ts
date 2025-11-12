import { api } from '@/lib/api';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { mockTasks } from '@/data/mockData';

export const getTasks = async (): Promise<Task[]> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTasks;
  }
  
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};

export const getTask = async (id: string): Promise<Task> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise(resolve => setTimeout(resolve, 300));
    const task = mockTasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }
  
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTask: Task = {
      id: Date.now().toString(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newTask;
  }
  
  const response = await api.post<Task>('/tasks', input);
  return response.data;
};

export const updateTask = async (id: string, input: UpdateTaskInput): Promise<Task> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise(resolve => setTimeout(resolve, 400));
    const existingTask = mockTasks.find(t => t.id === id);
    if (!existingTask) {
      throw new Error('Task not found');
    }
    
    const updatedTask: Task = {
      ...existingTask,
      ...input,
      updatedAt: new Date().toISOString(),
    };
    return updatedTask;
  }
  
  const response = await api.patch<Task>(`/tasks/${id}`, input);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    await new Promise(resolve => setTimeout(resolve, 300));
    const taskExists = mockTasks.some(t => t.id === id);
    if (!taskExists) {
      throw new Error('Task not found');
    }
    return;
  }
  
  await api.delete(`/tasks/${id}`);
};