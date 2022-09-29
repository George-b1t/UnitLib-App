import { Container, Information } from "./styles";

interface BookItemProps {
  cape_name: string;
  title: string;
  genre: string;
  description: string;
}

function BookItem({ cape_name, description, genre, title }: BookItemProps) {
  return (
    <Container cape_url={`http://localhost:3333/storage/cape/${cape_name}`}>
      <Information>
        <strong>{title}</strong>
        <p>{genre}</p>
        <p>{description}</p>
      </Information>
    </Container>
  );
}

export { BookItem };
