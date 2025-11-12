import { CheckSquare } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold">TaskFlow</h1>
        </div>
      </div>
    </header>
  );
};