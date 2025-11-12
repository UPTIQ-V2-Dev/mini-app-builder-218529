import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask } from '@/services/tasks';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTask,
    onSuccess: (newTask: Task) => {
      queryClient.setQueryData(['tasks'], (oldData: Task[] | undefined) => {
        return oldData ? [newTask, ...oldData] : [newTask];
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      updateTask(id, input),
    onSuccess: (updatedTask: Task) => {
      queryClient.setQueryData(['tasks'], (oldData: Task[] | undefined) => {
        return oldData?.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ) || [];
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, deletedId: string) => {
      queryClient.setQueryData(['tasks'], (oldData: Task[] | undefined) => {
        return oldData?.filter(task => task.id !== deletedId) || [];
      });
    },
  });
};