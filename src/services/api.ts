export type User = {
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = "users";

// Buscar usuários salvos
function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// Salvar usuário novo
export function register(user: User): boolean {
  const users = getUsers();

  // se já existe email cadastrado
  if (users.find((u) => u.email === user.email)) {
    return false;
  }

  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

// Login
export function login(email: string, password: string): boolean {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  return !!user;
}
