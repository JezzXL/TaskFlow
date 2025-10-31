import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, LogOut, Moon, Sun, Search, CheckCircle2, Clock, Trash2, BarChart3, Briefcase } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/Button';
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

  const totalTasks = boards.reduce((acc, board) =>
    acc + board.lists.reduce((listAcc, list) => listAcc + list.tasks.length, 0), 0
  );

  const completedTasks = boards.reduce((acc, board) =>
    acc + board.lists
      .filter(list => list.title.toLowerCase().includes('done') || list.title.toLowerCase().includes('concluí'))
      .reduce((listAcc, list) => listAcc + list.tasks.length, 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header Empresarial */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 dark:bg-slate-800 p-2.5 rounded-lg">
                  <Briefcase className="text-white" size={22} strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    TaskFlow
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Sistema de Gestão de Projetos
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-yellow-500" />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Barra de Busca e Ação */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-slate-400 dark:focus:border-slate-600 outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 whitespace-nowrap">
            <Plus size={18} />
            Novo Projeto
          </Button>
        </div>

        {/* KPIs Empresariais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Projetos Ativos
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{boards.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total de quadros</p>
              </div>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <LayoutGrid className="text-slate-700 dark:text-slate-300" size={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Tarefas em Andamento
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{totalTasks}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Itens registrados</p>
              </div>
              <div className="p-2.5 bg-blue-100 dark:bg-blue-950 rounded-lg">
                <Clock className="text-blue-700 dark:text-blue-400" size={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Taxa de Conclusão
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{completedTasks} de {totalTasks} concluídas</p>
              </div>
              <div className="p-2.5 bg-green-100 dark:bg-green-950 rounded-lg">
                <CheckCircle2 className="text-green-700 dark:text-green-400" size={20} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 size={20} className="text-gray-500" />
              Seus Projetos
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {filteredBoards.length} {filteredBoards.length === 1 ? 'projeto ativo' : 'projetos ativos'}
            </p>
          </div>
        </div>

        {/* Boards Grid */}
        {filteredBoards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-16 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
              <LayoutGrid size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'Nenhum projeto encontrado' : 'Nenhum projeto cadastrado'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchQuery 
                ? 'Ajuste os termos de busca para encontrar outros projetos' 
                : 'Comece criando seu primeiro projeto para organizar as demandas da equipe'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus size={18} className="mr-2" />
                Criar Primeiro Projeto
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBoards.map((board, index) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleOpenBoard(board.id)}
                className="group bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {board.title}
                    </h3>
                    {board.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {board.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Tem certeza que deseja excluir este projeto?')) {
                        deleteBoard(board.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{board.lists.length} listas</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="font-medium">{board.lists.reduce((acc, list) => acc + list.tasks.length, 0)} tarefas</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Empresarial */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Novo Projeto">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nome do Projeto *
            </label>
            <input
              type="text"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              placeholder="Ex: Implementação ERP"
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-slate-500 dark:focus:border-slate-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              value={newBoardDesc}
              onChange={(e) => setNewBoardDesc(e.target.value)}
              placeholder="Descreva o objetivo e escopo do projeto..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-slate-500 dark:focus:border-slate-400 outline-none resize-none text-sm"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button onClick={handleCreateBoard} disabled={!newBoardTitle.trim()} className="flex-1">
              Criar Projeto
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