import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FormEvent, useContext, useState } from "react";
import { Container, FormItem, ModalForm } from "./styles";
import { Button } from "primereact/button";
import { api } from "../../services/api";
import { AppContext } from "../../contexts/AppContext";

export const genres = [
  { name: "Terror", code: "Terror" },
  { name: "Fantasia", code: "Fantasia" },
  { name: "Conto", code: "Conto" },
  { name: "Aventura", code: "Aventura" },
  { name: "Romance", code: "Romance" },
  { name: "Suspense", code: "Suspense" },
];

function CreateBookContent() {
  const { makeToast, setSidebarOpen } = useContext(AppContext);

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [genre, setGenre] = useState(null as any);
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleCreateBook(event: FormEvent) {
    event.preventDefault();

    if (!bookName || !authorName || !genre || !description) {
      return makeToast({
        type: "error",
        content: "Oops!",
        detail: "É necessário preencher todos os campos!",
      });
    }

    setIsLoading(true);

    api
      .post("/book/create", {
        name: bookName,
        author: authorName,
        genre: genre.code,
        description,
      })
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: "O livro foi criado com sucesso!",
        });

        setBookName("");
        setAuthorName("");
        setGenre(null);
        setDescription("");

        setSidebarOpen(false);
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar criar o livro!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Container>
      <ModalForm onSubmit={handleCreateBook}>
        <FormItem>
          <label htmlFor="name">Nome do livro</label>
          <span className="p-input-icon-left">
            <i className="pi pi-book" />
            <InputText
              name="book_name"
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Digite o nome do livro"
              required
              style={{ width: "100%" }}
            />
          </span>
        </FormItem>
        <FormItem>
          <label htmlFor="name">Nome do autor</label>
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <InputText
              name="author_name"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Digite o nome do autor"
              required
              style={{ width: "100%" }}
            />
          </span>
        </FormItem>
        <FormItem>
          <label htmlFor="name">Gênero</label>
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <Dropdown
              name="book_genre"
              value={genre}
              options={genres}
              optionLabel="name"
              onChange={(e) => setGenre(e.value)}
              placeholder="Selecione o gênero do livro"
              style={{ width: "100%" }}
            />
          </span>
        </FormItem>
        <FormItem>
          <label htmlFor="name">Descrição</label>
          <span className="p-input-icon-left">
            <i className="pi pi-align-left" />
            <InputTextarea
              name="book_description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição do livro"
              required
              style={{ width: "100%" }}
              autoResize
              rows={1}
            />
          </span>
        </FormItem>

        <Button
          icon="pi pi-plus"
          label="Criar"
          type="submit"
          loading={isLoading}
        />
      </ModalForm>
    </Container>
  );
}

export { CreateBookContent };
