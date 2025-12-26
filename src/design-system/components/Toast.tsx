/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

type ToastItem = { id: number; title?: React.ReactNode; description?: React.ReactNode; variant?: "info"|"success"|"warning"|"danger" };

type ToastContextType = {
  show: (t: Omit<ToastItem, 'id'>) => void;
};

const ToastCtx = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(1);
  const show = (t: Omit<ToastItem, 'id'>) => {
    const id = idRef.current++;
    setItems((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3500);
  };
  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="ds-ToastViewport" aria-live="polite" aria-atomic="true">
        {items.map((i) => (
          <div key={i.id} className="ds-Toast" data-variant={i.variant || 'info'}>
            {i.title && <div className="ds-ToastTitle">{i.title}</div>}
            {i.description && <div className="ds-ToastDescription">{i.description}</div>}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
