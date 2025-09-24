import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  show: (input: Omit<ToastItem, "id">, timeoutMs?: number) => void;
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((input: Omit<ToastItem, "id">, timeoutMs = 3500) => {
    const id = Math.random().toString(36).slice(2, 10);
    const item: ToastItem = { id, ...input };
    setToasts((prev) => [item, ...prev]);
    if (timeoutMs > 0) {
      window.setTimeout(() => remove(id), timeoutMs);
    }
  }, [remove]);

  const value = useMemo(() => ({ toasts, show, remove }), [toasts, show, remove]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}


