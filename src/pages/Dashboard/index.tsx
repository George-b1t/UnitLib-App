import { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { BookItem } from "../../components/BookItem";
import { Header } from "../../components/Header";
import { selectedUser } from "../../contexts/redux/slices/userSlice";
import {
  Title,
  Container,
  Content,
  FieldSearch,
  FieldInputSearch,
} from "./styles";
import { AppSidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { Book } from "../../components/PendingBookItem";

function Dashboard() {
  const filterSearchMenu = useRef(null as any);
  const [search, setSearch] = useState("");

  const [books, setBooks] = useState<Book[]>([]);

  const responsiveOptions = [
    {
      breakpoint: "1550px",
      numVisible: 6,
      numScroll: 1,
    },
    {
      breakpoint: "1200px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "850px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "680px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "500px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const user = useSelector(selectedUser);

  useEffect(() => {
    searchBooks();
  }, [search]);

  function searchBooks() {
    api
      .post("/book/search", {
        value: search,
      })
      .then((res) => {
        setBooks(res.data.data.books);
      });
  }

  return (
    <Container>
      <Header
        title={`Seja bem-vindo(a), ${user && user.name}`}
        showMenu
        isAdm={user?.isAdm}
      />
      <AppSidebar />
      <Content>
        <Carousel
          value={books}
          itemTemplate={BookItem}
          numVisible={8}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          showIndicators={false}
          header={<Title>Meus livros</Title>}
        />
        <FieldSearch>
          <FieldInputSearch>
            <Title>Pesquisar Livro</Title>
            <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
              </span>
              <Button
                icon="pi pi-sliders-h"
                onClick={(event) => filterSearchMenu.current.toggle(event)}
                aria-controls="popup_menu"
                aria-haspopup
              />
            </div>
          </FieldInputSearch>
        </FieldSearch>
      </Content>
    </Container>
  );
}

export { Dashboard };
