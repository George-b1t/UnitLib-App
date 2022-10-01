import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { api } from "../../services/api";
import { Book, PendingBookItem } from "../PendingBookItem";
import { Container, ModalContent } from "./styles";
import { Skeleton } from "primereact/skeleton";

function PendingBooks() {
  const { makeToast } = useContext(AppContext);

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function searchBooks() {
    setIsLoading(true);

    api
      .get("/book/pending")
      .then((res) => {
        setBooks(res.data.data.books);
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar carregar os livros pendentes!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    searchBooks();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {[1, 1].map(() => (
            <div style={{ margin: "1rem 0 1rem 0", flex: 1 }}>
              <Skeleton width="100%" height="169px">
                <div style={{ margin: "1.3rem" }}>
                  <Skeleton width="70%" height="25px" />
                </div>
              </Skeleton>
            </div>
          ))}
        </div>
      ) : (
        <ModalContent>
          {books.length > 0 ? (
            books.map((book) => (
              <PendingBookItem onUpload={searchBooks} book={book} />
            ))
          ) : (
            <p>Nenhum livro pendente.</p>
          )}
        </ModalContent>
      )}
    </Container>
  );
}

export { PendingBooks };
