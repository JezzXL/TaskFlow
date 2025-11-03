import { create } from 'zustand';
import type { Board, List, Task, User, Theme, Priority } from '../types';
import { generateId, saveToLocalStorage, loadFromLocalStorage } from '../utils/helpers';

interface AppState {
  // Estado
  boards: Board[];
  currentBoard: Board | null;
  user: User | null;
  theme: Theme;

  // Ações - Boards
  addBoard: (title: string, description?: string) => void;
  deleteBoard: (boardId: string) => void;
  updateBoard: (boardId: string, updates: Partial<Board>) => void;
  setCurrentBoard: (boardId: string) => void;

  // Ações - Lists
  addList: (boardId: string, title: string) => void;
  deleteList: (listId: string) => void;
  updateList: (listId: string, title: string) => void;
  reorderLists: (boardId: string, lists: List[]) => void;

  // Ações - Tasks (ATUALIZADO)
  addTask: (listId: string, title: string, description?: string, priority?: Priority, dueDate?: Date) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  moveTask: (taskId: string, newListId: string, newOrder: number) => void;

  // Ações - User & Theme
  setUser: (user: User) => void;
  logout: () => void;
  toggleTheme: () => void;

  // Persistência
  loadData: () => void;
  saveData: () => void;
}

const STORAGE_KEY = 'taskflow-data';

export const useStore = create<AppState>((set, get) => ({
  // Estado inicial
  boards: [],
  currentBoard: null,
  user: null,
  theme: 'light',

  // Boards
  addBoard: (title, description) => {
    const newBoard: Board = {
      id: generateId(),
      title,
      description,
      lists: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ boards: [...state.boards, newBoard] }));
    get().saveData();
  },

  deleteBoard: (boardId) => {
    set((state) => ({
      boards: state.boards.filter((b) => b.id !== boardId),
      currentBoard: state.currentBoard?.id === boardId ? null : state.currentBoard,
    }));
    get().saveData();
  },

  updateBoard: (boardId, updates) => {
    set((state) => ({
      boards: state.boards.map((b) =>
        b.id === boardId ? { ...b, ...updates, updatedAt: new Date() } : b
      ),
    }));
    get().saveData();
  },

  setCurrentBoard: (boardId) => {
    const board = get().boards.find((b) => b.id === boardId);
    set({ currentBoard: board || null });
  },

  // Lists
  addList: (boardId, title) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id === boardId) {
          const newList: List = {
            id: generateId(),
            title,
            boardId,
            order: board.lists.length,
            tasks: [],
          };
          return { ...board, lists: [...board.lists, newList] };
        }
        return board;
      }),
    }));
    get().saveData();
  },

  deleteList: (listId) => {
    set((state) => ({
      boards: state.boards.map((board) => ({
        ...board,
        lists: board.lists.filter((l) => l.id !== listId),
      })),
    }));
    get().saveData();
  },

  updateList: (listId, title) => {
    set((state) => ({
      boards: state.boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId ? { ...list, title } : list
        ),
      })),
    }));
    get().saveData();
  },

  reorderLists: (boardId, lists) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId ? { ...board, lists } : board
      ),
    }));
    get().saveData();
  },

  // Tasks (ATUALIZADO COM PRIORIDADE E DATA)
  addTask: (listId, title, description, priority = 'none', dueDate) => {
    set((state) => ({
      boards: state.boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => {
          if (list.id === listId) {
            const newTask: Task = {
              id: generateId(),
              title,
              description,
              listId,
              order: list.tasks.length,
              priority,
              dueDate,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            return { ...list, tasks: [...list.tasks, newTask] };
          }
          return list;
        }),
      })),
    }));
    get().saveData();
  },

  deleteTask: (taskId) => {
    set((state) => ({
      boards: state.boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((t) => t.id !== taskId),
        })),
      })),
    }));
    get().saveData();
  },

  updateTask: (taskId, updates) => {
    set((state) => ({
      boards: state.boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => ({
          ...list,
          tasks: list.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
          ),
        })),
      })),
    }));
    get().saveData();
  },

  moveTask: (taskId, newListId, newOrder) => {
    set((state) => {
      let taskToMove: Task | null = null;

      // Encontrar e remover a task da lista atual
      const boardsWithoutTask = state.boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => {
          const task = list.tasks.find((t) => t.id === taskId);
          if (task) {
            taskToMove = { ...task, listId: newListId };
            return { ...list, tasks: list.tasks.filter((t) => t.id !== taskId) };
          }
          return list;
        }),
      }));

      if (!taskToMove) return state;

      // Adicionar task na nova lista
      const finalBoards = boardsWithoutTask.map((board) => ({
        ...board,
        lists: board.lists.map((list) => {
          if (list.id === newListId) {
            const updatedTasks = [...list.tasks];
            updatedTasks.splice(newOrder, 0, taskToMove!);
            return { ...list, tasks: updatedTasks };
          }
          return list;
        }),
      }));

      return { boards: finalBoards };
    });
    get().saveData();
  },

  // User & Theme
  setUser: (user) => {
    set({ user });
    saveToLocalStorage('taskflow-user', user);
  },

  logout: () => {
    set({ user: null, currentBoard: null });
    localStorage.removeItem('taskflow-user');
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      saveToLocalStorage('taskflow-theme', newTheme);
      return { theme: newTheme };
    });
  },

  // Persistência
  loadData: () => {
    const savedBoards = loadFromLocalStorage<Board[]>(STORAGE_KEY);
    const savedUser = loadFromLocalStorage<User>('taskflow-user');
    const savedTheme = loadFromLocalStorage<Theme>('taskflow-theme');

    // Migração de dados antigos: adicionar prioridade e converter datas
    const migratedBoards = savedBoards?.map(board => ({
      ...board,
      createdAt: new Date(board.createdAt),
      updatedAt: new Date(board.updatedAt),
      lists: board.lists.map(list => ({
        ...list,
        tasks: list.tasks.map(task => {
          // Tipo para tasks antigas que podem não ter priority/dueDate
          interface LegacyTask extends Omit<Task, 'priority' | 'dueDate'> {
            priority?: Priority;
            dueDate?: Date | string;
          }
          
          const legacyTask = task as unknown as LegacyTask;
          
          return {
            ...task,
            priority: legacyTask.priority || 'none',
            dueDate: legacyTask.dueDate ? new Date(legacyTask.dueDate) : undefined,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          };
        })
      }))
    }));

    set({
      boards: migratedBoards || [],
      user: savedUser,
      theme: savedTheme || 'light',
    });
  },

  saveData: () => {
    const { boards } = get();
    saveToLocalStorage(STORAGE_KEY, boards);
  },
}));