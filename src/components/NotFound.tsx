// src/components/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-gray-700 mb-6">Página não encontrada</p>
      <Link
        to="/"
        className="px-4 py-2 bg-[#7fc8be] text-white rounded-lg hover:bg-[#6ab3a8]"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
