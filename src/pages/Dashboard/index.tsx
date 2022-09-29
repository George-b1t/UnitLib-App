import { useRef, useState } from "react";
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
  FilterPanelContent,
} from "./styles";
import { Checkbox } from "primereact/checkbox";

interface FilterOpntions {
  value: any;
  checked: boolean;
}

function Dashboard() {
  const filterSearchMenu = useRef(null as any);
  const [search, setSearch] = useState("");

  const [filterSearchOptions, setFilterSearchOptions] = useState(["name"]);

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

  const books = [
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro 1",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
    {
      cape_name: "agatha_book.jpeg",
      title: "Título do livro",
      genre: "Suspense",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cum consequuntur at et amet esse blanditiis facilis eos fugit. Numquam iure hic ducimus sequi molestias libero ab officia, doloribus ex!",
    },
  ];

  const user = useSelector(selectedUser);

  function onFilterChange(e: FilterOpntions) {
    let selectedCities = [...filterSearchOptions];

    if (e.checked) selectedCities.push(e.value);
    else selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setFilterSearchOptions(selectedCities);
  }

  return (
    <Container>
      <Header
        title={`Seja bem-vindo(a), ${user && user.name}`}
        showMenu
        isAdm={user?.isAdm}
      />
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
              <OverlayPanel ref={filterSearchMenu}>
                <FilterPanelContent>
                  <div>
                    <Checkbox
                      inputId="name"
                      name="filterOption"
                      value="name"
                      onChange={onFilterChange}
                      checked={filterSearchOptions.indexOf("name") !== -1}
                    />
                    <label htmlFor="name">Nome</label>
                  </div>
                  <div>
                    <Checkbox
                      inputId="author"
                      name="filterOption"
                      value="author"
                      onChange={onFilterChange}
                      checked={filterSearchOptions.indexOf("author") !== -1}
                    />
                    <label htmlFor="author">Autor</label>
                  </div>
                  <div>
                    <Checkbox
                      inputId="genre"
                      name="filterOption"
                      value="genre"
                      onChange={onFilterChange}
                      checked={filterSearchOptions.indexOf("genre") !== -1}
                    />
                    <label htmlFor="genre">Gênero</label>
                  </div>
                </FilterPanelContent>
              </OverlayPanel>
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
