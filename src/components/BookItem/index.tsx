import { Container, Information } from "./styles";

interface BookItemProps {
  name: string;
  genre: string;
  description: string;
}

function BookItem({ description, genre, name }: BookItemProps) {
  return (
    <Container>
      <i className="pi pi-book"></i>

      <Information>
        <strong>{name}</strong>
        <p>{genre}</p>
        <p>{description}</p>
      </Information>
    </Container>
  );
}

export { BookItem };
