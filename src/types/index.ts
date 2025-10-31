export interface Task {
  id: string;
  title: string;
  description?: string;
  listId: string;
  order: number;
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