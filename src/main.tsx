import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // importa o Tailwind
import { AuthProvider } from "./hooks/useAuth"; //  importa o provider

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>   {}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
