import { CheckCircle, Info, X, XCircle } from "lucide-react";
import { useToast } from "../hooks/useToast";

export default function ToastContainer() {
  const { toasts, remove } = useToast();

  const base =
    "pointer-events-auto w-full max-w-sm rounded-xl shadow-2xl ring-1 backdrop-blur bg-white/95 ring-black/10 p-4 flex gap-3 items-start";

  const byType: Record<string, string> = {
    success: "border-l-4 border-green-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-blue-500",
  };

  const iconByType: Record<string, JSX.Element> = {
    success: <CheckCircle className="text-green-600" size={20} />,
    error: <XCircle className="text-red-600" size={20} />,
    info: <Info className="text-blue-600" size={20} />,
  };

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div key={t.id} className={`${base} ${byType[t.type]}`}>
          <div className="mt-0.5">{iconByType[t.type]}</div>
          <div className="flex-1">
            {t.title && (
              <div className="text-sm font-semibold text-gray-900">{t.title}</div>
            )}
            <div className="text-sm text-gray-700">{t.message}</div>
          </div>
          <button
            className="pointer-events-auto ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => remove(t.id)}
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}


