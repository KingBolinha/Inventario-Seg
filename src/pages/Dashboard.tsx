// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Bell, User, TrendingUp, AlertTriangle, Package, Activity } from "lucide-react";
import Layout from "../components/Layout";
import { useTheme } from "../hooks/useTheme";

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // se não tiver token, volta pro login
    }
  }, [navigate]);

  const stats = [
    {
      title: "Equipamentos cadastrados",
      value: "43",
      icon: Package,
      color: "text-[#6ab3a8]",
      bgColor: "bg-[#6ab3a8]/10",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Estoque baixo",
      value: "5",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      change: "-2%",
      changeType: "negative"
    },
    {
      title: "Setores ativos",
      value: "7",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      change: "+0%",
      changeType: "neutral"
    },
    {
      title: "Crescimento mensal",
      value: "8.2%",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      change: "+1.2%",
      changeType: "positive"
    }
  ];

  const equipamentos = [
    { nome: "PCs", categoria: "Eletrônicos", estoque: 8, status: "normal" },
    { nome: "Impressoras", categoria: "Eletrônicos", estoque: 6, status: "normal" },
    { nome: "Redes de Internet", categoria: "Infraestrutura", estoque: 10, status: "normal" },
    { nome: "Monitores", categoria: "Eletrônicos", estoque: 14, status: "normal" },
    { nome: "Notebooks", categoria: "Eletrônicos", estoque: 5, status: "baixo" },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Dashboard</h1>
          <p className={`mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Visão geral do sistema de inventário</p>
        </div>
        <div className="flex items-center gap-4">
          <button className={`p-3 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
            theme === "dark" 
              ? "bg-gray-800/80 hover:bg-gray-700/80" 
              : "bg-white/80 hover:bg-white/90"
          }`}>
            <Bell className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} size={20} />
          </button>
          <button className={`p-3 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
            theme === "dark" 
              ? "bg-gray-800/80 hover:bg-gray-700/80" 
              : "bg-white/80 hover:bg-white/90"
          }`}>
            <User className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} size={20} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
            theme === "dark" 
              ? "bg-gray-800/80 border-gray-700" 
              : "bg-white/80 border-white/20"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' ? 'bg-green-100 text-green-700' :
                stat.changeType === 'negative' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{stat.value}</h3>
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Equipamentos Table */}
      <div className={`backdrop-blur-sm rounded-2xl shadow-lg border mb-8 overflow-hidden ${
        theme === "dark" 
          ? "bg-gray-800/80 border-gray-700" 
          : "bg-white/80 border-white/20"
      }`}>
        <div className={`p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200/50"
        }`}>
          <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Equipamentos Recentes</h3>
          <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Lista dos equipamentos cadastrados</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === "dark" ? "bg-gray-700/50" : "bg-gray-50/50"}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>Nome</th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>Categoria</th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>Estoque</th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}>Status</th>
              </tr>
            </thead>
            <tbody className={theme === "dark" ? "divide-y divide-gray-700" : "divide-y divide-gray-200/50"}>
              {equipamentos.map((equipamento, index) => (
                <tr key={index} className={`transition-colors duration-200 ${
                  theme === "dark" ? "hover:bg-gray-700/30" : "hover:bg-gray-50/50"
                }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{equipamento.nome}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {equipamento.categoria}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {equipamento.estoque}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      equipamento.status === 'baixo' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {equipamento.status === 'baixo' ? 'Estoque Baixo' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`backdrop-blur-sm p-6 rounded-2xl shadow-lg border ${
          theme === "dark" 
            ? "bg-gray-800/80 border-gray-700" 
            : "bg-white/80 border-white/20"
        }`}>
          <h4 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Distribuição por Categoria</h4>
          <div className="h-48 bg-gradient-to-br from-[#6ab3a8]/20 to-[#7fc8be]/20 rounded-xl flex items-center justify-center">
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Gráfico em desenvolvimento</p>
          </div>
        </div>
        <div className={`backdrop-blur-sm p-6 rounded-2xl shadow-lg border ${
          theme === "dark" 
            ? "bg-gray-800/80 border-gray-700" 
            : "bg-white/80 border-white/20"
        }`}>
          <h4 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Tendência Mensal</h4>
          <div className="h-48 bg-gradient-to-br from-[#6ab3a8]/20 to-[#7fc8be]/20 rounded-xl flex items-center justify-center">
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Gráfico em desenvolvimento</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
