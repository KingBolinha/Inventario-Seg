import { LogOut, Shield, UserCog, Moon, Sun } from "lucide-react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useTheme } from "../hooks/useTheme";

export default function Configuracoes() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    show({ type: "info", title: "Sessão encerrada", message: "Você saiu da sua conta." });
    navigate("/login");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-6 flex items-center gap-2">
          <UserCog size={22} className="text-[#6ab3a8]" /> Configurações
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Tema */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Aparência</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Personalize a aparência do sistema.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                {theme === "dark" ? (
                  <Moon size={18} className="text-[#6ab3a8]" />
                ) : (
                  <Sun size={18} className="text-[#6ab3a8]" />
                )}
                <span>Modo {theme === "dark" ? "Escuro" : "Claro"}</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  theme === "dark" ? "bg-[#6ab3a8]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Conta */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Conta</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Gerencie sua sessão e preferências.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Shield size={18} className="text-[#6ab3a8]" />
                <span>Sessão ativa</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md ring-2 ring-red-300/60 hover:ring-red-400 transition"
              >
                <LogOut size={18} /> Sair
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
