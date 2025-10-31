import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { boards, user, theme, addBoard, deleteBoard, setCurrentBoard, logout, toggleTheme } = useStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');

  const handleCreateBoard = () => {
    if (newBoardTitle.trim()) {
      addBoard(newBoardTitle, newBoardDesc);
      setNewBoardTitle('');
      setNewBoardDesc('');
      setIsModalOpen(false);
    }
  };

  const handleOpenBoard = (boardId: string) => {
    setCurrentBoard(boardId);
    navigate(`/board/${boardId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Meus Quadros
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Olá, {user?.name}! 👋
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Novo Quadro
          </Button>
        </div>

        {/* Boards Grid */}
        {boards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum quadro criado ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Crie seu primeiro quadro para começar a organizar suas tarefas
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus size={20} className="mr-2" />
              Criar Primeiro Quadro
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board, index) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="cursor-pointer group relative">
                  <div onClick={() => handleOpenBoard(board.id)}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {board.title}
                    </h3>
                    {board.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {board.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{board.lists.length} listas</span>
                      <span>
                        {board.lists.reduce((acc, list) => acc + list.tasks.length, 0)} tarefas
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Deseja realmente excluir este quadro?')) {
                        deleteBoard(board.id);
                      }
                    }}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Criar Quadro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Criar Novo Quadro"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              placeholder="Ex: Projeto X"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição (opcional)
            </label>
            <textarea
              value={newBoardDesc}
              onChange={(e) => setNewBoardDesc(e.target.value)}
              placeholder="Descreva o objetivo deste quadro..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreateBoard} className="flex-1">
              Criar Quadro
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};