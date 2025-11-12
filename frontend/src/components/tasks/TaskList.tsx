import { useMemo } from 'react';
import { TaskItem } from './TaskItem';
import { Task, TaskFilter } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onEditTask?: (task: Task) => void;
}

export const TaskList = ({ tasks, filter, onEditTask }: TaskListProps) => {
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Sort by completion status first (incomplete tasks first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredTasks]);

  if (sortedTasks.length === 0) {
    const messages = {
      all: 'No tasks yet. Create your first task to get started!',
      active: 'No active tasks. All done! 🎉',
      completed: 'No completed tasks yet.',
    };

    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{messages[filter]}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};