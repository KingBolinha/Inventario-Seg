import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../hooks/useToast";

function Signup() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("visualiza"); // 👈 padrão "visualiza"
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErro(data.message || "Erro ao cadastrar usuário");
        return;
      }

      show({
        type: "success",
        title: "Cadastro concluído",
        message: "Usuário cadastrado com sucesso!",
      });
      navigate("/login");
    } catch (err) {
      setErro("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7fc8be] to-[#d5f3ef] p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-[#6ab3a8] rounded"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-white/80">Cadastre-se para acessar o sistema</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          {erro && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-center">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
                placeholder="Digite o nome"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
                  placeholder="Digite o email"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
                  placeholder="Digite a senha"
                  required
                />
              </div>
            </div>

            {/* Tipo de acesso */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Tipo de Acesso
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
              >
                <option value="visualiza" className="bg-gray-800 text-white">Visualizador</option>
                <option value="admin" className="bg-gray-800 text-white">Administrador</option>
              </select>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full py-3 bg-white text-[#6ab3a8] font-semibold rounded-xl shadow-lg hover:bg-white/90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Cadastrar
            </button>
          </form>

          {/* Link para voltar ao login */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Já tem conta?{" "}
              <Link
                to="/login"
                className="font-semibold text-white hover:text-white/80 transition-colors duration-200"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2024 Inventário System. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
