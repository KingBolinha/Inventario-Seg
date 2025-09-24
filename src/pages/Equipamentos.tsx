import Layout from "../components/Layout";
import { Box } from "lucide-react";

export default function Equipamentos() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          <Box size={22} className="text-[#6ab3a8]" /> Equipamentos
        </h2>
        <div className="bg-white rounded-xl shadow p-6 text-gray-700">
          Em breve: gestão de equipamentos.
        </div>
      </div>
    </Layout>
  );
}
