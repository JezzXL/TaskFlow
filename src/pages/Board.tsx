import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ArrowLeft, Plus, Moon, Sun, LayoutGrid, Briefcase } from 'lucide-react';
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

  const totalTasks = board.lists.reduce((acc, list) => acc + list.tasks.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header Corporativo */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 dark:bg-slate-800 p-2 rounded-lg">
                  <Briefcase className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {board.title}
                  </h1>
                  {board.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {board.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Stats rápidos */}
              <div className="hidden sm:flex items-center gap-4 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {board.lists.length} listas
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {totalTasks} tarefas
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsAddListModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-sm font-semibold"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Nova Lista</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-yellow-500" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Board Content */}
      <main className="p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-5 overflow-x-auto pb-4">
            {board.lists.map((list) => (
              <BoardList key={list.id} list={list} />
            ))}

            {board.lists.length === 0 && (
              <div className="flex items-center justify-center w-full min-h-[500px]">
                <div className="text-center max-w-md">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
                    <LayoutGrid size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Nenhuma lista criada
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Organize seu projeto criando listas como "A Fazer", "Em Progresso" e "Concluído"
                  </p>
                  <button
                    onClick={() => setIsAddListModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors font-semibold"
                  >
                    <Plus size={20} />
                    Criar Primeira Lista
                  </button>
                </div>
              </div>
            )}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-2xl border-2 border-slate-400 dark:border-slate-600 rotate-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {activeTask.title}
                </h4>
                {activeTask.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {activeTask.description}
                  </p>
                )}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Modal Corporativo */}
      <Modal
        isOpen={isAddListModalOpen}
        onClose={() => {
          setIsAddListModalOpen(false);
          setNewListTitle('');
        }}
        title="Criar Nova Lista"
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nome da Lista *
            </label>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Ex: A Fazer, Em Progresso, Concluído"
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-slate-500 dark:focus:border-slate-400 outline-none text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddList();
              }}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Dica: Use nomes claros como "Backlog", "Sprint Atual" ou "Entregues"
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleAddList} disabled={!newListTitle.trim()} className="flex-1">
              Criar Lista
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAddListModalOpen(false);
                setNewListTitle('');
              }}
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