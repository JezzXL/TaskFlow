import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Trash2 } from 'lucide-react';
import type { List } from '../../types';
import { useStore } from '../../store/useStore';
import { TaskCard } from '../tasks/TaskCard';
import { Button } from '../../components/Button';

interface BoardListProps {
  list: List;
}

export const BoardList = ({ list }: BoardListProps) => {
  const { addTask, deleteList, updateList } = useStore();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);

  const { setNodeRef } = useDroppable({ id: list.id });

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(list.id, newTaskTitle.trim());
      setNewTaskTitle('');
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
    if (confirm(`Deseja realmente excluir a lista "${list.title}"?`)) {
      deleteList(list.id);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 w-80 flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 group">
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
            className="flex-1 px-2 py-1 rounded bg-white dark:bg-dark-bg border border-primary text-sm font-semibold text-gray-900 dark:text-white focus:outline-none"
            autoFocus
          />
        ) : (
          <h3
            onClick={() => setIsEditingTitle(true)}
            className="flex-1 text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-primary transition-colors px-2 py-1"
          >
            {list.title}
          </h3>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleDeleteList}
            className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div
        ref={setNodeRef}
        className="space-y-2 min-h-[100px] mb-2"
      >
        <SortableContext items={list.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {list.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      {/* Add Task */}
      {isAddingTask ? (
        <div className="space-y-2">
          <textarea
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Digite o título da tarefa..."
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddTask();
              }
              if (e.key === 'Escape') {
                setIsAddingTask(false);
                setNewTaskTitle('');
              }
            }}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddTask}>
              Adicionar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsAddingTask(false);
                setNewTaskTitle('');
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Adicionar tarefa
        </button>
      )}
    </div>
  );
};