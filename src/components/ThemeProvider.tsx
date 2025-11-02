import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useStore((state) => state.theme);
  const loadData = useStore((state) => state.loadData);

  // Carrega dados e tema ao montar
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Aplica o tema ao document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove ambas as classes primeiro
    root.classList.remove('light', 'dark');
    
    // Adiciona a classe do tema atual
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }

    // Log para debug (remova depois)
    console.log('Tema aplicado:', theme);
  }, [theme]);

  return <>{children}</>;
};