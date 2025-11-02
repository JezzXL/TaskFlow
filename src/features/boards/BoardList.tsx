import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, GripVertical, MoreVertical } from 'lucide-react';
import type { List } from '../../types';
import { useStore } from '../../store/useStore';
import { TaskCard } from '../tasks/TaskCard';

interface BoardListProps {
  list: List;
}

export const BoardList = ({ list }: BoardListProps) => {
  const { addTask, deleteList, updateList } = useStore();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);

  const { setNodeRef } = useDroppable({ id: list.id });

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(list.id, newTaskTitle.trim(), newTaskDescription.trim());
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsAddingTask(false);
    }
  };

  const handleUpdateTitle = () => {
    if (editedTitle.trim() && editedTitle !== list.title) {
      updateList(list.id, editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleDeleteList = () => {
    if (confirm(`Tem certeza que deseja excluir a lista "${list.title}"?\n\nTodas as ${list.tasks.length} tarefas serão perdidas.`)) {
      deleteList(list.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 w-80 flex-shrink-0 flex flex-col max-h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 group">
        <div className="flex items-center gap-2 flex-1">
          <GripVertical size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
          
          {isEditingTitle ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleUpdateTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdateTitle();
                if (e.key === 'Escape') {
                  setEditedTitle(list.title);
                  setIsEditingTitle(false);
                }
              }}
              className="flex-1 px-2 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border-2 border-slate-500 dark:border-slate-400 text-sm font-bold text-gray-900 dark:text-white outline-none"
              autoFocus
            />
          ) : (
            <h3
              onClick={() => setIsEditingTitle(true)}
              className="flex-1 text-sm font-bold text-gray-900 dark:text-white cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors px-2 py-1"
            >
              {list.title}
              <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                ({list.tasks.length})
              </span>
            </h3>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 top-8 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1 min-w-[160px]">
                <button
                  onClick={() => {
                    setIsEditingTitle(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Renomear lista
                </button>
                <button
                  onClick={() => {
                    handleDeleteList();
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Excluir lista
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className="flex-1 space-y-2.5 overflow-y-auto mb-3 pr-1"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent' 
        }}
      >
        <SortableContext items={list.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {list.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {list.tasks.length === 0 && !isAddingTask && (
          <div className="flex items-center justify-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Nenhuma tarefa
            </p>
          </div>
        )}
      </div>

      {/* Add Task Section */}
      {isAddingTask ? (
        <div className="space-y-2 border-t border-gray-200 dark:border-gray-800 pt-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Título da tarefa..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-slate-500 dark:focus:border-slate-400"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddTask();
              }
              if (e.key === 'Escape') {
                setIsAddingTask(false);
                setNewTaskTitle('');
                setNewTaskDescription('');
              }
            }}
          />
          <textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Descrição (opcional)..."
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-slate-500 dark:focus:border-slate-400 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              disabled={!newTaskTitle.trim()}
              className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                newTaskTitle.trim()
                  ? 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Adicionar
            </button>
            <button
              onClick={() => {
                setIsAddingTask(false);
                setNewTaskTitle('');
                setNewTaskDescription('');
              }}
              className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border-t border-gray-200 dark:border-gray-800 pt-3"
        >
          <Plus size={16} />
          Adicionar tarefa
        </button>
      )}
    </div>
  );
};