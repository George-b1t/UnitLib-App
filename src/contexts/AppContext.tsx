import { Toast } from "primereact/toast";
import { createContext, ReactNode, useRef, useState } from "react";
import { Book } from "../components/PendingBookItem";
import { api } from "../services/api";

export const AppContext = createContext({} as AppContextData);

interface AppContextData {
  toast: React.MutableRefObject<any>;
  makeToast: (value: ToastMaker) => void;

  searchBooks: (fromSearch?: boolean) => void;

  books: Book[];
  setBooks: (value: Book[]) => void;

  search: string;
  setSearch: (value: string) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  loadingSearch: boolean;
  setLoadingSearch: (value: boolean) => void;

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

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSidebar, setCurrentSidebar] = useState("");

  const [books, setBooks] = useState<Book[]>([]);

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

  function searchBooks(fromSearch: boolean = false) {
    if (fromSearch) {
      setLoadingSearch(true);
    } else {
      setLoading(true);
    }

    api
      .post("/book/search", {
        value: fromSearch ? search : "",
      })
      .then((res) => {
        setBooks(res.data.data.books);
      })
      .finally(() => {
        if (fromSearch) {
          setLoadingSearch(false);
        } else {
          setLoading(false);
        }
      });
  }

  return (
    <>
      <Toast ref={toast} />
      <AppContext.Provider
        value={{
          toast,
          makeToast,
          search,
          setSearch,
          searchBooks,
          loading,
          loadingSearch,
          setLoading,
          setLoadingSearch,
          books,
          setBooks,
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
