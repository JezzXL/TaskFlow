import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Edit3, Trash2, Clock } from 'lucide-react';
import type { Task } from '../../types';
import { useStore } from '../../store/useStore';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTask, updateTask } = useStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = () => {
    if (editTitle.trim()) {
      updateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  // Formatar data
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={style}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`bg-white dark:bg-gray-800 rounded-lg p-3.5 border border-gray-200 dark:border-gray-700 group hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all ${
          isDragging ? 'opacity-50 shadow-xl scale-105' : ''
        }`}
      >
        <div className="flex items-start gap-2">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
          >
            <GripVertical size={16} strokeWidth={2} />
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5 break-words leading-tight">
              {task.title}
            </h4>
            
            {task.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 break-words leading-relaxed mb-2 line-clamp-3">
                {task.description}
              </p>
            )}

            {/* Task Metadata */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{formatDate(task.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Editar tarefa"
            >
              <Edit3 size={14} strokeWidth={2} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Excluir tarefa"
            >
              <Trash2 size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditTitle(task.title);
          setEditDescription(task.description || '');
        }}
        title="Editar Tarefa"
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Título da Tarefa *
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Digite o título da tarefa"
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-slate-500 dark:focus:border-slate-400 outline-none text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Adicione detalhes sobre a tarefa..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-slate-500 dark:focus:border-slate-400 outline-none resize-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pb-2">
            <Clock size={12} />
            <span>Criada em {formatDate(task.createdAt)}</span>
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <>
                <span>•</span>
                <span>Atualizada em {formatDate(task.updatedAt)}</span>
              </>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={handleUpdate} 
              disabled={!editTitle.trim()}
              className="flex-1"
            >
              Salvar Alterações
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsEditModalOpen(false);
                setEditTitle(task.title);
                setEditDescription(task.description || '');
              }} 
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};