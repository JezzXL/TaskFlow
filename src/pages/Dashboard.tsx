import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, LogOut, Moon, Sun, Search, CheckCircle2, Clock, Trash2, Sparkles } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Estatísticas
  const totalTasks = boards.reduce((acc, board) =>
    acc + board.lists.reduce((listAcc, list) => listAcc + list.tasks.length, 0), 0
  );

  const completedTasks = boards.reduce((acc, board) =>
    acc + board.lists
      .filter(list => list.title.toLowerCase().includes('done') || list.title.toLowerCase().includes('concluí'))
      .reduce((listAcc, list) => listAcc + list.tasks.length, 0), 0
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Logo e Saudação */}
            <div className="flex items-center gap-4">
              <div className="bg-linear-to-br from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
                <LayoutGrid className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Olá, {user?.name}! 👋
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-semibold"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar quadros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-400 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 font-medium"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-purple-100 dark:border-purple-900/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Total de Quadros</p>
                <p className="text-4xl font-black text-gray-900 dark:text-white">{boards.length}</p>
              </div>
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                <LayoutGrid className="text-purple-600 dark:text-purple-400" size={28} strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-900/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Total de Tarefas</p>
                <p className="text-4xl font-black text-gray-900 dark:text-white">{totalTasks}</p>
              </div>
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Clock className="text-blue-600 dark:text-blue-400" size={28} strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-green-100 dark:border-green-900/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Concluídas</p>
                <p className="text-4xl font-black text-gray-900 dark:text-white">{completedTasks}</p>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={28} strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles size={24} className="text-purple-500" />
              Seus Quadros
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
              {filteredBoards.length} {filteredBoards.length === 1 ? 'quadro encontrado' : 'quadros encontrados'}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} strokeWidth={2.5} />
            Novo Quadro
          </Button>
        </div>

        {/* Boards Grid */}
        {filteredBoards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
              <LayoutGrid size={48} className="text-purple-600 dark:text-purple-400" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {searchQuery ? 'Nenhum quadro encontrado' : 'Nenhum quadro criado ainda'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
              {searchQuery 
                ? 'Tente buscar com outros termos' 
                : 'Crie seu primeiro quadro para começar a organizar suas tarefas'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsModalOpen(true)} size="lg">
                <Plus size={22} className="mr-2" />
                Criar Primeiro Quadro
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoards.map((board, index) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="group cursor-pointer relative">
                  <div onClick={() => handleOpenBoard(board.id)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {board.title}
                        </h3>
                        {board.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                            {board.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Tem certeza que deseja excluir este quadro?')) {
                            deleteBoard(board.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-all ml-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-medium">
                        <LayoutGrid size={16} />
                        {board.lists.length} listas
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-medium">
                        <CheckCircle2 size={16} />
                        {board.lists.reduce((acc, list) => acc + list.tasks.length, 0)} tarefas
                      </span>
                    </div>
                  </div>
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
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Título *
            </label>
            <input
              type="text"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              placeholder="Ex: Projeto X"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all font-medium"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Descrição (opcional)
            </label>
            <textarea
              value={newBoardDesc}
              onChange={(e) => setNewBoardDesc(e.target.value)}
              placeholder="Descreva o objetivo deste quadro..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all resize-none font-medium"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleCreateBoard} 
              className="flex-1"
              disabled={!newBoardTitle.trim()}
            >
              <Plus size={20} className="mr-2" />
              Criar Quadro
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsModalOpen(false);
                setNewBoardTitle('');
                setNewBoardDesc('');
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