import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Edit, Trash2, Plus, X } from "lucide-react";
import Layout from "../components/Layout";
import { useToast } from "../hooks/useToast";

interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Usuarios() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<"novo" | "editar" | "excluir" | null>(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const [formNome, setFormNome] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCargo, setFormCargo] = useState("user");
  const [formSenha, setFormSenha] = useState("");

  const role = localStorage.getItem("role"); // pega role do login

  const apiUrl = (import.meta.env?.VITE_API_URL as string) || "http://localhost:4000";

  const getHeaders = (): HeadersInit => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/users`, { headers: getHeaders() });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || `Erro ao carregar usuários (${res.status})`);
      }

      const data = await res.json();
      setUsuarios(data);
    } catch (err: any) {
      console.error("Erro ao carregar usuários:", err);
      alert(err.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      carregarUsuarios();
    }
  }, [navigate]);

  const abrirModal = (tipo: "novo" | "editar" | "excluir", usuario?: Usuario) => {
    if (tipo === "editar" && usuario) {
      setUsuarioSelecionado(usuario);
      setFormNome(usuario.name);
      setFormEmail(usuario.email);
      setFormCargo(usuario.role);
      setFormSenha("");
    } else if (tipo === "novo") {
      setUsuarioSelecionado(null);
      setFormNome("");
      setFormEmail("");
      setFormCargo("user");
      setFormSenha("");
    } else if (tipo === "excluir" && usuario) {
      setUsuarioSelecionado(usuario);
    }
    setModal(tipo);
  };

  const fecharModal = () => {
    setUsuarioSelecionado(null);
    setModal(null);
  };

  const salvarUsuario = async () => {
    if (!formNome || !formEmail) return alert("Preencha todos os campos");
    if (modal === "novo" && !formSenha) return alert("Defina uma senha");

    try {
      if (modal === "novo") {
        const res = await fetch(`${apiUrl}/admin/create-user`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            name: formNome,
            email: formEmail,
            password: formSenha,
            role: formCargo,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || "Não foi possível criar o usuário");
        }
        show({
          type: "success",
          title: "Usuário criado",
          message: `${formNome} foi adicionado com sucesso`,
        });
      } else if (modal === "editar" && usuarioSelecionado) {
        const res = await fetch(`${apiUrl}/admin/users/${usuarioSelecionado.id}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({
            name: formNome,
            email: formEmail,
            role: formCargo,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || "Não foi possível atualizar o usuário");
        }
        show({
          type: "success",
          title: "Usuário atualizado",
          message: `${formNome} foi atualizado com sucesso`,
        });
      }

      await carregarUsuarios();
      fecharModal();
    } catch (err: any) {
      alert(err.message || "Erro ao salvar usuário");
    }
  };

  const excluirUsuario = async () => {
    if (!usuarioSelecionado) return;
    try {
      const res = await fetch(`${apiUrl}/admin/users/${usuarioSelecionado.id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Não foi possível excluir o usuário");
      }
      await carregarUsuarios();
      show({
        type: "success",
        title: "Usuário excluído",
        message: `${usuarioSelecionado.name} foi removido com sucesso`,
      });
      fecharModal();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir usuário");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
          <Users size={22} className="text-[#6ab3a8]" />
          Usuários
        </h2>

        {role === "admin" && (
          <button
            onClick={() => abrirModal("novo")}
            className="flex items-center gap-2 bg-[#6ab3a8] hover:bg-[#5ca197] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
          >
            <Plus size={18} />
            Novo Usuário
          </button>
        )}
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-gray-200/50">
          <h3 className="text-xl font-semibold text-gray-800">Lista de Usuários</h3>
          <p className="text-gray-600 text-sm mt-1">Gerencie os usuários do sistema</p>
        </div>
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6ab3a8]"></div>
            <p className="text-gray-500 mt-2">Carregando usuários...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                  {role === "admin" && <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{usuario.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{usuario.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        usuario.role === "admin" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {usuario.role === "admin" ? "Administrador" : "Usuário"}
                      </span>
                    </td>
                    {role === "admin" && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            onClick={() => abrirModal("editar", usuario)}
                          >
                            <Edit size={16} />
                            Editar
                          </button>
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            onClick={() => abrirModal("excluir", usuario)}
                            title="Excluir usuário"
                          >
                            <Trash2 size={16} />
                            Excluir
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* modais iguais, só abrem se admin clicar */}
      {(modal === "novo" || modal === "editar") && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {modal === "novo" ? "Novo Usuário" : `Editar ${usuarioSelecionado?.name}`}
              </h3>
              <button 
                onClick={fecharModal} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                salvarUsuario();
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={formNome}
                  onChange={(e) => setFormNome(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6ab3a8]/30 focus:border-[#6ab3a8] transition-all duration-200"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6ab3a8]/30 focus:border-[#6ab3a8] transition-all duration-200"
                />
              </div>
              {modal === "novo" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                  <input
                    type="password"
                    value={formSenha}
                    onChange={(e) => setFormSenha(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6ab3a8]/30 focus:border-[#6ab3a8] transition-all duration-200"
                    placeholder="Defina uma senha"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                <select
                  value={formCargo}
                  onChange={(e) => setFormCargo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6ab3a8]/30 focus:border-[#6ab3a8] transition-all duration-200"
                >
                  <option value="admin">Administrador</option>
                  <option value="user">Usuário</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#6ab3a8] hover:bg-[#5ca197] text-white py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}

      {modal === "excluir" && usuarioSelecionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-white/20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Excluir Usuário
            </h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir{" "}
              <span className="font-semibold text-red-600">{usuarioSelecionado.name}</span>?
              <br />
              <span className="text-sm text-gray-500">Esta ação não pode ser desfeita.</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={fecharModal}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={excluirUsuario}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
