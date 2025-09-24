import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Home, BarChart, Settings, Users } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/equipamentos", icon: Box, label: "Equipamentos" },
    { path: "/usuarios", icon: Users, label: "Usuários" },
    { path: "/relatorios", icon: BarChart, label: "Relatórios" },
    { path: "/configuracoes", icon: Settings, label: "Configurações" },
  ];

  return (
    <div className={`flex h-screen ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-[#7fc8be] to-[#d5f3ef]"
    }`}>
      {/* Sidebar */}
      <aside className={`w-72 backdrop-blur-md border-r p-6 flex flex-col shadow-2xl ${
        theme === "dark"
          ? "bg-gray-800/90 border-gray-700 text-white"
          : "bg-white/10 border-white/20 text-white"
      }`}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              theme === "dark" ? "bg-[#6ab3a8]/20" : "bg-white/20"
            }`}>
              <Box size={24} className="text-[#6ab3a8]" />
            </div>
            Inventário
          </h1>
          <p className={`text-sm mt-2 ${
            theme === "dark" ? "text-gray-300" : "text-white/70"
          }`}>Sistema de Gestão</p>
        </div>
        
        <nav className="space-y-2 flex-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200 group ${
                  isActive
                    ? theme === "dark"
                      ? "bg-[#6ab3a8]/20 text-white shadow-lg"
                      : "bg-white/20 text-white shadow-lg"
                    : theme === "dark"
                      ? "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                      : "hover:bg-white/10 text-white/80 hover:text-white"
                }`}
              >
                <Icon size={20} className={`transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-105"
                }`} />
                <span className="font-medium">{label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-[#6ab3a8] rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        <div className={`mt-auto pt-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-white/20"
        }`}>
          <div className={`text-xs text-center ${
            theme === "dark" ? "text-gray-400" : "text-white/60"
          }`}>
            © 2024 Inventário System
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
