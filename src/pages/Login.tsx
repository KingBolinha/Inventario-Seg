import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(""); // limpa mensagem anterior

    try {
      const res = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!res.ok) {
        setErro("❌ Acesso negado: email ou senha inválidos");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setErro("❌ Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#7fc8be] to-[#d5f3ef]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-[#7fc8be] mb-6 text-center">
          Bem-vindo ao Inventário
        </h1>

        {erro && (
          <div className="mb-4 text-center text-red-600 font-semibold">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7fc8be] transition"
                placeholder="Digite seu email"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7fc8be] transition"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#7fc8be] py-2 text-white font-semibold shadow-md hover:bg-[#6ab3a8] hover:shadow-lg transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
