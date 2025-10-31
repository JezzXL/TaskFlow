import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent, } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ArrowLeft, Plus, Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BoardList } from '../features/boards/BoardList';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import type { Task } from '../types';

export const Board = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { boards, theme, toggleTheme, addList, moveTask } = useStore();

  const [board, setBoard] = useState(boards.find((b) => b.id === boardId));
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const updatedBoard = boards.find((b) => b.id === boardId);
    if (!updatedBoard) {
      navigate('/dashboard');
    } else {
      setBoard(updatedBoard);
    }
  }, [boards, boardId, navigate]);

  if (!board) return null;

  const handleAddList = () => {
    if (newListTitle.trim() && boardId) {
      addList(boardId, newListTitle.trim());
      setNewListTitle('');
      setIsAddListModalOpen(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = board.lists
      .flatMap((list) => list.tasks)
      .find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeList = board.lists.find((list) =>
      list.tasks.some((t) => t.id === activeId)
    );
    const overList = board.lists.find(
      (list) => list.id === overId || list.tasks.some((t) => t.id === overId)
    );

    if (!activeList || !overList) return;

    if (activeList.id !== overList.id) {
      const activeTaskIndex = activeList.tasks.findIndex((t) => t.id === activeId);
      const overTaskIndex = overList.tasks.findIndex((t) => t.id === overId);

      const newIndex = overTaskIndex >= 0 ? overTaskIndex : overList.tasks.length;
      
      if (activeTaskIndex !== -1) {
        moveTask(activeId as string, overList.id, newIndex);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeList = board.lists.find((list) =>
      list.tasks.some((t) => t.id === activeId)
    );

    if (!activeList) return;

    const oldIndex = activeList.tasks.findIndex((t) => t.id === activeId);
    const newIndex = activeList.tasks.findIndex((t) => t.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedTasks = arrayMove(activeList.tasks, oldIndex, newIndex);
      reorderedTasks.forEach((task, index) => {
        if (task.order !== index) {
          moveTask(task.id, activeList.id, index);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {board.title}
                </h1>
                {board.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {board.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddListModalOpen(true)}
              >
                <Plus size={20} className="mr-2" />
                Nova Lista
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Board Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {board.lists.map((list) => (
              <BoardList key={list.id} list={list} />
            ))}

            {board.lists.length === 0 && (
              <div className="flex items-center justify-center w-full min-h-[400px]">
                <div className="text-center">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Nenhuma lista criada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Crie sua primeira lista para começar
                  </p>
                  <Button onClick={() => setIsAddListModalOpen(true)}>
                    <Plus size={20} className="mr-2" />
                    Criar Lista
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="bg-white dark:bg-dark-card rounded-lg p-3 shadow-xl border-2 border-primary rotate-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {activeTask.title}
                </h4>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Add List Modal */}
      <Modal
        isOpen={isAddListModalOpen}
        onClose={() => setIsAddListModalOpen(false)}
        title="Criar Nova Lista"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título da Lista *
            </label>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Ex: A Fazer, Em Progresso, Concluído"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddList();
              }}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddList} className="flex-1">
              Criar Lista
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsAddListModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};