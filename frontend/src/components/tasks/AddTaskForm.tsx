import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateTask } from '@/hooks/useTasks';
import { CreateTaskInput } from '@/types/task';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
  onSuccess?: () => void;
}

export const AddTaskForm = ({ onSuccess }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const input: CreateTaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
    };

    createTask.mutate(input, {
      onSuccess: () => {
        setTitle('');
        setDescription('');
        setIsExpanded(false);
        onSuccess?.();
      },
    });
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="w-full mb-6"
        size="lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Task
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={createTask.isPending}
              autoFocus
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={createTask.isPending}
              rows={3}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!title.trim() || createTask.isPending}
            >
              {createTask.isPending ? 'Creating...' : 'Add Task'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={createTask.isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};