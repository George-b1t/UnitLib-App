import { Toast } from "primereact/toast";
import { createContext, ReactNode, useRef } from "react";

export const AppContext = createContext({} as AppContextData);

interface AppContextData {
  toast: React.MutableRefObject<any>;
  makeToast: (value: ToastMaker) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

interface ToastMaker {
  type: "success" | "warn" | "info" | "error";
  content: string;
  detail: string;
}

export function AppProvider({ children }: AppProviderProps) {
  const toast = useRef(null as any);

  function makeToast({ content, detail, type }: ToastMaker) {
    toast.current.show({
      severity: type,
      summary: content,
      detail: detail,
    });
  }

  return (
    <>
      <Toast ref={toast} />
      <AppContext.Provider
        value={{
          toast,
          makeToast,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
