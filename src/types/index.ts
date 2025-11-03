export type Priority = 'high' | 'medium' | 'low' | 'none';

export interface Task {
  id: string;
  title: string;
  description?: string;
  listId: string;
  order: number;
  priority: Priority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  order: number;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  lists: List[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type Theme = 'light' | 'dark';

// Helper para configuração de prioridades
export const PRIORITY_CONFIG = {
  high: {
    label: 'Alta',
    color: 'red',
    bgClass: 'bg-red-100 dark:bg-red-950',
    textClass: 'text-red-700 dark:text-red-400',
    borderClass: 'border-red-300 dark:border-red-800',
    icon: '🔴'
  },
  medium: {
    label: 'Média',
    color: 'yellow',
    bgClass: 'bg-yellow-100 dark:bg-yellow-950',
    textClass: 'text-yellow-700 dark:text-yellow-400',
    borderClass: 'border-yellow-300 dark:border-yellow-800',
    icon: '🟡'
  },
  low: {
    label: 'Baixa',
    color: 'green',
    bgClass: 'bg-green-100 dark:bg-green-950',
    textClass: 'text-green-700 dark:text-green-400',
    borderClass: 'border-green-300 dark:border-green-800',
    icon: '🟢'
  },
  none: {
    label: 'Nenhuma',
    color: 'gray',
    bgClass: 'bg-gray-100 dark:bg-gray-800',
    textClass: 'text-gray-600 dark:text-gray-400',
    borderClass: 'border-gray-300 dark:border-gray-700',
    icon: '⚪'
  }
} as const;