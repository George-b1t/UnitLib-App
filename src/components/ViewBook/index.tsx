import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Container, FieldUpload, FormItem, ModalForm } from "./styles";
import { FormEvent, useContext, useRef, useState } from "react";
import { api } from "../../services/api";
import { AppContext } from "../../contexts/AppContext";
import { genres } from "../CreateBookContent";
import { FileUpload } from "primereact/fileupload";
import { useSelector } from "react-redux";
import { selectedUser } from "../../contexts/redux/slices/userSlice";

function ViewBook() {
  const user = useSelector(selectedUser);

  const { makeToast, currentEditingBook, setSidebarOpen, searchBooks } =
    useContext(AppContext);

  const [bookName, setBookName] = useState(currentEditingBook?.name);
  const [authorName, setAuthorName] = useState(currentEditingBook?.author);
  const [genre, setGenre] = useState<any>({
    name: currentEditingBook?.genre,
    code: currentEditingBook?.genre,
  });
  const [description, setDescription] = useState(
    currentEditingBook?.description
  );

  const [isLoading, setIsLoading] = useState(false);

  const [fileIcon, setFileIcon] = useState("pi pi-upload");
  const fileRef: any = useRef(null as any);

  const [uploading, setUploading] = useState(false);

  function handleUpload() {
    if (!currentEditingBook) return;

    setUploading(true);

    api
      .post(
        "http://localhost:3333/book/upload",
        { file: fileRef.current.getFiles()[0] },
        {
          headers: {
            "book-id": currentEditingBook.id,
            "file-name": `${currentEditingBook.name}-${currentEditingBook.id}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: "O conteúdo do livro foi salvo com sucesso!",
        });

        fileRef.current.clear();

        setSidebarOpen(false);
        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar salvar conteúdo do livro!",
        });
      })
      .finally(() => {
        setUploading(false);
      });
  }

  function handleEditBook(event: FormEvent) {
    if (!currentEditingBook) return;

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
      .post("/book/update", {
        id: currentEditingBook.id,
        name: bookName,
        author: authorName,
        genre: genre.code,
        description,
      })
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: "O livro foi editado com sucesso!",
        });

        setBookName("");
        setAuthorName("");
        setGenre(null);
        setDescription("");

        setSidebarOpen(false);
        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar editar o livro!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleOpenBook() {
    window &&
      window
        .open(
          `http://localhost:3333/storage/content/${currentEditingBook?.pdf_location}.pdf`,
          "_blank"
        )
        ?.focus();
  }

  return (
    <Container>
      <ModalForm onSubmit={handleEditBook}>
        {user?.isAdm && (
          <FieldUpload>
            <FormItem>
              <label htmlFor="name">Selecionar conteúdo</label>
              <span style={{ display: "flex", gap: "5%" }}>
                <FileUpload
                  chooseOptions={{
                    icon: fileIcon,
                  }}
                  chooseLabel="Selecionar"
                  mode="basic"
                  name="demo[]"
                  accept=".pdf"
                  maxFileSize={10000000}
                  ref={fileRef}
                  customUpload
                  uploadHandler={() => {
                    fileRef.current?.clear();
                    setFileIcon("pi pi-times");
                  }}
                />

                <Button
                  onClick={() => handleUpload()}
                  icon="pi pi-upload"
                  className="p-button-success"
                  loading={uploading}
                />
              </span>
            </FormItem>
          </FieldUpload>
        )}
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
              disabled={!user?.isAdm}
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
              disabled={!user?.isAdm}
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
              required
              disabled={!user?.isAdm}
              style={
                user?.isAdm
                  ? { width: "100%" }
                  : { width: "100%", paddingLeft: 28 }
              }
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
              disabled={!user?.isAdm}
              autoResize
              rows={1}
            />
          </span>
        </FormItem>

        <Button
          className="p-button-warning"
          icon="pi pi-eye"
          label="Ver livro"
          type="button"
          onClick={handleOpenBook}
        />

        {user?.isAdm && (
          <Button
            icon="pi pi-pencil"
            label="Editar"
            type="submit"
            loading={isLoading}
          />
        )}
      </ModalForm>
    </Container>
  );
}

export { ViewBook };
