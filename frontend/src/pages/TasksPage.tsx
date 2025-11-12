import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AddTaskForm } from '@/components/tasks/AddTaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTasks } from '@/hooks/useTasks';
import { TaskFilter } from '@/types/task';
import { Loader2 } from 'lucide-react';

export const TasksPage = () => {
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchParams] = useSearchParams();
  const { data: tasks, isLoading, error } = useTasks();

  // Auto-expand add form if ?add=true in URL
  const shouldAutoAdd = searchParams.get('add') === 'true';

  const getTaskCounts = () => {
    if (!tasks) return { all: 0, active: 0, completed: 0 };
    
    return {
      all: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
    };
  };

  const counts = getTaskCounts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load tasks. Please try again.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your tasks and stay organized
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {counts.active} active, {counts.completed} completed
          </div>
        </div>
      </div>

      <AddTaskForm />

      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className="flex items-center gap-2"
        >
          All Tasks
          <Badge variant="secondary">{counts.all}</Badge>
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          className="flex items-center gap-2"
        >
          Active
          <Badge variant="secondary">{counts.active}</Badge>
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          className="flex items-center gap-2"
        >
          Completed
          <Badge variant="secondary">{counts.completed}</Badge>
        </Button>
      </div>

      <TaskList
        tasks={tasks || []}
        filter={filter}
      />
    </div>
  );
};