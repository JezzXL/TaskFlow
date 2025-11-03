import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Edit3, Trash2, Calendar, AlertCircle } from 'lucide-react';
import type { Task, Priority } from '../../types';
import { PRIORITY_CONFIG } from '../../types';
import { useStore } from '../../store/useStore';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { formatDueDate, getDueDateStatus, formatDateForInput } from '../../utils/dateHelpers';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTask, updateTask } = useStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const [editDueDate, setEditDueDate] = useState(formatDateForInput(task.dueDate));

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
        priority: editPriority,
        dueDate: editDueDate ? new Date(editDueDate) : undefined,
      });
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={style}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`bg-white dark:bg-gray-800 rounded-lg p-3 border-2 group hover:shadow-md transition-all ${
          isDragging ? 'opacity-50 shadow-xl scale-105' : ''
        } ${
          task.priority !== 'none' ? priorityConfig.borderClass : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
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
              <p className="text-xs text-gray-600 dark:text-gray-400 break-words leading-relaxed mb-2 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Task Metadata */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {/* Prioridade */}
              {task.priority !== 'none' && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.bgClass} ${priorityConfig.textClass}`}>
                  <span>{priorityConfig.icon}</span>
                  <span>{priorityConfig.label}</span>
                </span>
              )}

              {/* Data de Vencimento */}
              {task.dueDate && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                  dueDateStatus === 'overdue' 
                    ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                    : dueDateStatus === 'urgent'
                    ? 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                  <Calendar size={12} />
                  <span>{formatDueDate(task.dueDate)}</span>
                </span>
              )}
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
          setEditPriority(task.priority);
          setEditDueDate(formatDateForInput(task.dueDate));
        }}
        title="Editar Tarefa"
      >
        <div className="space-y-4">
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
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-slate-500 dark:focus:border-slate-400 outline-none resize-none text-sm"
            />
          </div>

          {/* Prioridade */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <AlertCircle size={14} />
              Prioridade
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setEditPriority(priority)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                    editPriority === priority
                      ? `${PRIORITY_CONFIG[priority].bgClass} ${PRIORITY_CONFIG[priority].textClass} ring-2 ring-offset-2 ${PRIORITY_CONFIG[priority].borderClass.replace('border', 'ring')}`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="text-base mb-0.5">{PRIORITY_CONFIG[priority].icon}</div>
                  <div>{PRIORITY_CONFIG[priority].label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Data de Vencimento */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <Calendar size={14} />
              Data de Vencimento
            </label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-slate-500 dark:focus:border-slate-400 outline-none text-sm"
            />
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
                setEditPriority(task.priority);
                setEditDueDate(formatDateForInput(task.dueDate));
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