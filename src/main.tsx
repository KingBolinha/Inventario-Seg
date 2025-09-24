import React from "react";
import ReactDOM from "react-dom/client"; // ✅ importa o ReactDOM
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastProvider } from "./hooks/useToast";
import { ThemeProvider } from "./hooks/useTheme";
import ToastContainer from "./components/ToastContainer";
import "./index.css"; // se você tiver estilos globais

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <App />
          <ToastContainer />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
