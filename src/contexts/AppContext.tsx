import { Toast } from "primereact/toast";
import { createContext, ReactNode, useRef, useState } from "react";
import { Book } from "../components/PendingBookItem";

export const AppContext = createContext({} as AppContextData);

interface AppContextData {
  toast: React.MutableRefObject<any>;
  makeToast: (value: ToastMaker) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;

  currentSidebar: string;
  setCurrentSidebar: (value: string) => void;

  currentEditingBook: Book | null;
  setCurrentEditingBook: (value: Book | null) => void;
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSidebar, setCurrentSidebar] = useState("");

  const [currentEditingBook, setCurrentEditingBook] = useState<Book | null>(
    null
  );

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
          currentSidebar,
          setCurrentSidebar,
          setSidebarOpen,
          sidebarOpen,
          currentEditingBook,
          setCurrentEditingBook,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
