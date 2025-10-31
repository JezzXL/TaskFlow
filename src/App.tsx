import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { ThemeProvider } from './components/ThemeProvider';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Board } from './pages/Board';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  const loadData = useStore((state) => state.loadData);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/board/:boardId"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;