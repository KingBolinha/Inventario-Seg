// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Configuracoes";
import Equipamentos from "./pages/Equipamentos";

// 🔒 Componente de rota privada
function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Página inicial → redireciona para login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Rotas privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/relatorios"
        element={
          <PrivateRoute>
            <Relatorios />
          </PrivateRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <Usuarios />
          </PrivateRoute>
        }
      />

      <Route
        path="/configuracoes"
        element={
          <PrivateRoute>
            <Configuracoes />
          </PrivateRoute>
        }
      />

      <Route
        path="/equipamentos"
        element={
          <PrivateRoute>
            <Equipamentos />
          </PrivateRoute>
        }
      />

      {/* retrocompatibilidade */}
      <Route path="/produtos" element={<Navigate to="/equipamentos" replace />} />

      {/* Qualquer rota inexistente → redireciona para login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
