// Verifica se uma data está atrasada
export const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

// Verifica se vence hoje
export const isDueToday = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due.getTime() === today.getTime();
};

// Verifica se vence amanhã
export const isDueTomorrow = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due.getTime() === tomorrow.getTime();
};

// Calcula dias restantes
export const getDaysRemaining = (dueDate?: Date): number => {
  if (!dueDate) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Formata data para exibição
export const formatDueDate = (dueDate?: Date): string => {
  if (!dueDate) return '';
  
  const days = getDaysRemaining(dueDate);
  
  if (isOverdue(dueDate)) {
    return `Atrasada (${Math.abs(days)} ${Math.abs(days) === 1 ? 'dia' : 'dias'})`;
  }
  
  if (isDueToday(dueDate)) {
    return 'Vence hoje';
  }
  
  if (isDueTomorrow(dueDate)) {
    return 'Vence amanhã';
  }
  
  if (days <= 7) {
    return `${days} ${days === 1 ? 'dia' : 'dias'} restantes`;
  }
  
  return new Date(dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Retorna a cor/status baseado na data
export const getDueDateStatus = (dueDate?: Date): 'overdue' | 'urgent' | 'normal' | 'none' => {
  if (!dueDate) return 'none';
  
  if (isOverdue(dueDate)) {
    return 'overdue';
  }
  
  if (isDueToday(dueDate) || isDueTomorrow(dueDate)) {
    return 'urgent';
  }
  
  return 'normal';
};

// Formata data para input[type="date"]
export const formatDateForInput = (date?: Date): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};