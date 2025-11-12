import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Plus, List } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <CheckSquare className="h-16 w-16 mx-auto text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to TaskFlow
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A simple and efficient task management app to help you stay organized and productive.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Manage Tasks
            </CardTitle>
            <CardDescription>
              View, add, edit, and delete your tasks in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/tasks">
              <Button className="w-full">
                Go to Tasks
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Add
            </CardTitle>
            <CardDescription>
              Jump straight to adding a new task to your list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/tasks?add=true">
              <Button variant="outline" className="w-full">
                Add New Task
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Start organizing your tasks today and boost your productivity!
        </p>
      </div>
    </div>
  );
};