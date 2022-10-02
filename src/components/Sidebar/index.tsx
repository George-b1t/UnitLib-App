import { Sidebar } from "primereact/sidebar";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AddAdministrator } from "../AddAdministrator";
import { CreateBookContent } from "../CreateBookContent";
import { PendingBooks } from "../PendingBooks";
import { ViewBook } from "../ViewBook";
import { SidebarTitle } from "./styles";

function AppSidebar() {
  const { currentSidebar, sidebarOpen, setSidebarOpen } =
    useContext(AppContext);

  return (
    <Sidebar
      onHide={() => setSidebarOpen(false)}
      visible={sidebarOpen}
      className="p-sidebar-sm"
      closeOnEscape={false}
    >
      <SidebarTitle>
        {currentSidebar === "new_book"
          ? "Novo livro"
          : currentSidebar === "pending_books"
          ? "Livros pendentes"
          : currentSidebar === "add_administrator"
          ? "Novo administrador"
          : currentSidebar === "edit_book"
          ? "Editando livro"
          : ""}
      </SidebarTitle>
      {currentSidebar === "new_book" ? (
        <CreateBookContent />
      ) : currentSidebar === "pending_books" ? (
        <PendingBooks />
      ) : currentSidebar === "add_administrator" ? (
        <AddAdministrator />
      ) : currentSidebar === "edit_book" ? (
        <ViewBook />
      ) : (
        ""
      )}
    </Sidebar>
  );
}

export { AppSidebar };
