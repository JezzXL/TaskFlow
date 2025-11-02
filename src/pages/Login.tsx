import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Briefcase, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateId } from '../utils/helpers';

export const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState<'name' | 'email' | null>(null);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setUser({
        id: generateId(),
        name: name.trim(),
        email: email.trim(),
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 p-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="bg-slate-900 dark:bg-slate-800 p-4 rounded-xl shadow-lg">
                <Briefcase className="text-white" size={36} strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Sistema de Gestão Empresarial
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              Gerencie seus projetos com eficiência e precisão
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Plataforma completa para organização de tarefas, acompanhamento de projetos e gestão de equipes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg flex-shrink-0">
                <CheckCircle className="text-blue-700 dark:text-blue-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Gestão Centralizada</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Todos os projetos e tarefas em um único lugar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-950 rounded-lg flex-shrink-0">
                <CheckCircle className="text-green-700 dark:text-green-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Colaboração em Tempo Real</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Acompanhe o progresso da equipe instantaneamente
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg flex-shrink-0">
                <Shield className="text-purple-700 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Segurança Empresarial</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dados protegidos com criptografia de ponta a ponta
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="bg-slate-900 dark:bg-slate-800 p-3 rounded-xl">
                  <Briefcase className="text-white" size={28} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                    TaskFlow
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Sistema de Gestão Empresarial
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Acesso ao Sistema
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Digite suas credenciais para acessar a plataforma
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nome Completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Digite seu nome completo"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all text-sm font-medium ${
                    focusedInput === 'name'
                      ? 'border-slate-500 dark:border-slate-400 shadow-sm'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Corporativo
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="seu.email@empresa.com"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all text-sm font-medium ${
                    focusedInput === 'email'
                      ? 'border-slate-500 dark:border-slate-400 shadow-sm'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!name.trim() || !email.trim()}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-lg font-semibold text-white transition-all mt-6 ${
                  name.trim() && email.trim()
                    ? 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                }`}
              >
                <LogIn size={20} strokeWidth={2.5} />
                <span>Acessar Sistema</span>
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema em operação • Acesso seguro</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
                Autenticação simplificada para ambiente de demonstração
              </p>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 TaskFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};