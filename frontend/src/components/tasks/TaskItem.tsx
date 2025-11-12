import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types/task';
import { Trash2, Edit } from 'lucide-react';
import { useUpdateTask, useDeleteTask } from '@/hooks/useTasks';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export const TaskItem = ({ task, onEdit }: TaskItemProps) => {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleToggleComplete = (checked: boolean) => {
    updateTask.mutate({
      id: task.id,
      input: { completed: checked }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask.mutate(task.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className={`transition-all duration-200 ${task.completed ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            disabled={updateTask.isPending}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={task.completed ? 'secondary' : 'default'}>
                {task.completed ? 'Completed' : 'Active'}
              </Badge>
              <span className="text-xs text-gray-500">
                Created {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                disabled={updateTask.isPending}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleteTask.isPending}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};