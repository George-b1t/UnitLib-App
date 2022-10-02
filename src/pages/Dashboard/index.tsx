import { useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [search, setSearch] = useState("");

  const [firstSearch, setFirstSearch] = useState(true);

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
    searchBooks(!firstSearch);
    setFirstSearch(false);
  }, [search]);

  function searchBooks(fromSearch: boolean = false) {
    if (fromSearch) {
      setLoadingSearch(true);
    } else {
      setLoading(true);
    }

    api
      .post("/book/search", {
        value: search,
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
    <Container>
      <Header
        title={`Seja bem-vindo(a), ${user && user.name}`}
        showMenu
        isAdm={user?.isAdm}
      />
      <AppSidebar />
      <Content>
        <Carousel
          value={loading ? [1, 1, 1, 1, 1, 1, 1, 1] : books}
          itemTemplate={(e) => (
            <BookItem
              id={e.id}
              author={e.author}
              pdf_location={e.pdf_location}
              description={e.description}
              genre={e.genre}
              name={e.name}
              skeleton={loading}
            />
          )}
          numVisible={8}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          showIndicators={false}
          header={<Title>Meus livros</Title>}
        />
        <FieldSearch>
          <FieldInputSearch>
            <Title>Pesquisar Livro</Title>
            <span className="p-input-icon-left">
              <i
                className={`pi ${
                  loadingSearch ? "pi-spin pi-spinner" : "pi-search"
                }`}
              />
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </span>
          </FieldInputSearch>
        </FieldSearch>
      </Content>
    </Container>
  );
}

export { Dashboard };
