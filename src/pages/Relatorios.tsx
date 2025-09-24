// src/pages/Relatorios.tsx
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout"; // importa seu Layout

function Card({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 ring-1 ring-black/5">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-800">{value}</div>
      {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  const name = item.name ?? label;
  const value = item.value;
  const color = item.color || item.fill;
  return (
    <div className="rounded-lg bg-white/95 backdrop-blur px-3 py-2 shadow-xl ring-1 ring-black/10">
      <div className="text-xs font-medium text-gray-500">{name}</div>
      <div className="mt-0.5 flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm" style={{ background: color }} />
        <span className="text-sm font-semibold text-gray-800">{value}</span>
      </div>
    </div>
  );
}

export default function Relatorios() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const porSetor = [
    { setor: "Recepção", qtd: 9 },
    { setor: "Ambiental", qtd: 6 },
    { setor: "Comercial", qtd: 2 },
    { setor: "Financeiro", qtd: 3 },
    { setor: "Segurança", qtd: 7 },
    { setor: "Exames", qtd: 7 },
    { setor: "Rede Interna (TI)", qtd: 10 },
  ];

  const porCategoria = [
    { categoria: "PC", qtd: 8 },
    { categoria: "Notebook", qtd: 4 },
    { categoria: "Monitor", qtd: 12 },
    { categoria: "Impressora", qtd: 5 },
    { categoria: "Switch", qtd: 2 },
    { categoria: "AP", qtd: 4 },
    { categoria: "BG", qtd: 2 },
    { categoria: "Servidor", qtd: 1 },
    { categoria: "DVR", qtd: 1 },
  ];

  const porEtiqueta = [
    { status: "Etiquetado", qtd: 0 },
    { status: "Não Etiquetado", qtd: 40 },
  ];

  const COLORS = ["#7fc8be", "#ff6b6b", "#ffa94d", "#4dabf7", "#845ef7", "#82c91e", "#ffd43b", "#62b6cb", "#646cff"];

  const kpis = useMemo(() => {
    const totalSetores = porSetor.length;
    const totalEquipamentos = porSetor.reduce((acc, s) => acc + s.qtd, 0);
    const totalCategorias = porCategoria.length;
    const etiquetados = porEtiqueta.find((e) => e.status === "Etiquetado")?.qtd ?? 0;
    const percEtiquetados = totalEquipamentos > 0 ? Math.round((etiquetados / totalEquipamentos) * 100) : 0;
    return { totalSetores, totalEquipamentos, totalCategorias, etiquetados, percEtiquetados };
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">📊 Relatórios de Inventário</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Total de equipamentos" value={String(kpis.totalEquipamentos)} sub="Somatório em todos os setores" />
        <Card title="Setores monitorados" value={String(kpis.totalSetores)} />
        <Card title="Categorias" value={String(kpis.totalCategorias)} />
        <Card title="Etiquetados" value={`${kpis.percEtiquetados}%`} sub={`${kpis.etiquetados} itens`} />
      </div>

      {/* 1 - Resumo por setor */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 ring-1 ring-black/5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Equipamentos por setor</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={porSetor} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7fc8be" stopOpacity={1} />
                <stop offset="100%" stopColor="#5ca197" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="setor" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="qtd" name="Quantidade" fill="url(#barFill)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 2 - Resumo por categoria */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 ring-1 ring-black/5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Equipamentos por categoria</h2>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={porCategoria}
              dataKey="qtd"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={2}
            >
              {porCategoria.map((entry, index) => (
                <Cell key={`cell-cat-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 3 - Etiquetas */}
      <div className="bg-white p-6 rounded-xl shadow-md ring-1 ring-black/5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Equipamentos etiquetados</h2>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={porEtiqueta}
              dataKey="qtd"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              startAngle={90}
              endAngle={-270}
            >
              {porEtiqueta.map((entry, index) => (
                <Cell key={`cell-tag-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}
