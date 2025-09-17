// src/hooks/useAuth.ts
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  users: User[];
  registerUser: (name: string, email: string, password: string) => boolean;
  loginUser: (email: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const registerUser = (name: string, email: string, password: string) => {
    if (users.find((u) => u.email === email)) return false;
    setUsers([...users, { name, email, password }]);
    return true;
  };

  const loginUser = (email: string, password: string) => {
    return users.some((u) => u.email === email && u.password === password);
  };

  return (
    <AuthContext.Provider value={{ users, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
}
