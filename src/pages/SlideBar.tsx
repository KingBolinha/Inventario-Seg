// src/components/Sidebar.tsx
import { useNavigate } from "react-router-dom";
import { Home, Box, BarChart, Settings } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-[#6ab3a8] text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}>
        <Box size={22} /> Inventário
      </h1>
      <nav className="space-y-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 hover:bg-[#5ca197] px-3 py-2 rounded-lg w-full text-left"
        >
          <Home size={18} /> Dashboard
        </button>
        <button
          onClick={() => navigate("/produtos")}
          className="flex items-center gap-2 hover:bg-[#5ca197] px-3 py-2 rounded-lg w-full text-left"
        >
          <Box size={18} /> Produtos
        </button>
        <button
          onClick={() => navigate("/relatorios")}
          className="flex items-center gap-2 hover:bg-[#5ca197] px-3 py-2 rounded-lg w-full text-left"
        >
          <BarChart size={18} /> Relatórios
        </button>
        <button
          onClick={() => navigate("/configuracoes")}
          className="flex items-center gap-2 hover:bg-[#5ca197] px-3 py-2 rounded-lg w-full text-left"
        >
          <Settings size={18} /> Configurações
        </button>
      </nav>
    </aside>
  );
}
