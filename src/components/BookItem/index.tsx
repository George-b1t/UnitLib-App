import { Skeleton } from "primereact/skeleton";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Container, Content, Information } from "./styles";

interface BookItemProps {
  id: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  pdf_location: string;
  skeleton?: boolean;
  rent_limit: number;
  Rent: {
    id: number;
    user_id: number;
  }[]
}

function BookItem({
  description,
  genre,
  name,
  skeleton,
  id,
  author,
  pdf_location,
  rent_limit,
  Rent
}: BookItemProps) {
  const { setCurrentEditingBook, setCurrentSidebar, setSidebarOpen } =
    useContext(AppContext);

  function handleViewBook() {
    setCurrentEditingBook({
      id,
      author,
      description,
      genre,
      name,
      pdf_location,
      rent_limit,
      Rent
    });
    setCurrentSidebar("edit_book");
    setSidebarOpen(true);
  }

  return (
    <Container>
      {skeleton ? (
        <Skeleton />
      ) : (
        <Content onClick={handleViewBook}>
          <i className="pi pi-book"></i>

          <Information className="BookItem-fieldInformation">
            <strong>{name}</strong>
            <p>{genre}</p>
            <p>{description}</p>
          </Information>
        </Content>
      )}
    </Container>
  );
}

export { BookItem };
