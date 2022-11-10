import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Container, FieldUpload, FormItem, ModalForm, RentInfo } from "./styles";
import { FormEvent, useContext, useRef, useState } from "react";
import { api } from "../../services/api";
import { AppContext } from "../../contexts/AppContext";
import { genres } from "../CreateBookContent";
import { FileUpload } from "primereact/fileupload";
import { useSelector } from "react-redux";
import { selectedUser } from "../../contexts/redux/slices/userSlice";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

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
  const [isLoadingRent, setIsLoadingRent] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [fileIconContent, setFileIconContent] = useState("pi pi-upload");
  const [fileIconCape, setFileIconCape] = useState("pi pi-upload");
  const fileRefContent: any = useRef(null as any);
  const fileRefCape: any = useRef(null as any);

  const [uploadingContent, setUploadingContent] = useState(false);
  const [uploadingCape, setUploadingCape] = useState(false);

  function handleUploadContent() {
    if (!currentEditingBook) return;

    setUploadingContent(true);

    api
      .post(
        "http://localhost:3333/book/upload/content",
        { file: fileRefContent.current.getFiles()[0] },
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

        fileRefContent.current.clear();

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
        setUploadingContent(false);
      });
  }

  function handleUploadCape() {
    if (!currentEditingBook) return;

    setUploadingCape(true);

    api
      .post(
        "http://localhost:3333/book/upload/cape",
        { file: fileRefCape.current.getFiles()[0] },
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
          detail: "A capa do livro foi salvo com sucesso!",
        });

        fileRefCape.current.clear();

        setSidebarOpen(false);
        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar salvar capa do livro!",
        });
      })
      .finally(() => {
        setUploadingCape(false);
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

  // function handleOpenBook() {
  //   window &&
  //     window
  //       .open(
  //         `http://localhost:3333/storage/content/${currentEditingBook?.pdf_location}.pdf`,
  //         "_blank"
  //       )
  //       ?.focus();
  // }

  function removeBook() {
    if (!currentEditingBook) return;

    setIsLoadingDelete(true);

    api
      .delete(`/book/delete/${currentEditingBook?.id}`)
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: "O livro foi removido com sucesso!",
        });

        setSidebarOpen(false);
        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar remover o livro!",
        });
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  }

  function confirmRemoveBook(event: any) {
    confirmPopup({
      target: event.currentTarget,
      message: `Tem certeza que deseja remover o livro ${currentEditingBook?.name}?`,
      icon: "pi pi-exclamation-triangle",
      accept: () => removeBook(),
      acceptLabel: "Sim",
      rejectLabel: "Não",
    });
  }

  function rentBook() {
    if (!currentEditingBook) return;

    setIsLoadingRent(true);

    api
      .post(`/rent/create`, {
        book_id: currentEditingBook.id,
        user_id: user?.id,
      })
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: "O livro foi alugado com sucesso!",
        });

        setSidebarOpen(false);
        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar alugar o livro!",
        });
      })
      .finally(() => {
        setIsLoadingRent(false);
      });
  }

  function unRentBook() {
    if (!currentEditingBook) return;

    setIsLoadingRent(true);

    api
      .delete(`/rent/delete/${currentEditingBook.Rent.find(e => e.user_id === user?.id)?.id}`)
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: "O livro foi desalugado com sucesso!",
        });

        setSidebarOpen(false);
        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar desalugar o livro!",
        });
      })
      .finally(() => {
        setIsLoadingRent(false);
      });
  }

  function isRented() {
    return !!currentEditingBook?.Rent.find(item => item.user_id === user?.id)
  }

  return (
    <Container>
      <ConfirmPopup />
      <ModalForm onSubmit={handleEditBook}>
        {user?.isAdm && (
          <FieldUpload>
            <FormItem>
              <label htmlFor="name">Selecionar conteúdo</label>
              <span style={{ display: "flex", gap: "5%" }}>
                <FileUpload
                  chooseOptions={{
                    icon: fileIconContent,
                  }}
                  chooseLabel="Selecionar"
                  mode="basic"
                  name="demo[]"
                  accept=".pdf"
                  maxFileSize={10000000}
                  ref={fileRefContent}
                  customUpload
                  uploadHandler={() => {
                    fileRefContent.current?.clear();
                    setFileIconContent("pi pi-upload");
                  }}
                />

                <Button
                  onClick={() => handleUploadContent()}
                  icon="pi pi-upload"
                  className="p-button-success"
                  loading={uploadingContent}
                />
              </span>
            </FormItem>

            <FormItem>
              <label htmlFor="name">Selecionar capa</label>
              <span style={{ display: "flex", gap: "5%" }}>
                <FileUpload
                  chooseOptions={{
                    icon: fileIconCape,
                  }}
                  chooseLabel="Selecionar"
                  mode="basic"
                  name="demo[]"
                  accept=".png"
                  maxFileSize={2000000}
                  ref={fileRefCape}
                  customUpload
                  uploadHandler={() => {
                    fileRefCape.current?.clear();
                    setFileIconCape("pi pi-upload");
                  }}
                />

                <Button
                  onClick={() => handleUploadCape()}
                  icon="pi pi-upload"
                  className="p-button-success"
                  loading={uploadingCape}
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

        {/* <Button
          className="p-button-warning"
          icon="pi pi-eye"
          label="Ver livro"
          type="button"
          onClick={handleOpenBook}
        /> */}

        {isRented() ? (
          <Button
            onClick={unRentBook}
            loading={isLoadingRent}
            label="Desalugar"
            type="button"
            className="p-button-danger"
            icon="pi pi-bookmark-fill"
          />
        ) : (
          <Button
            onClick={rentBook}
            loading={isLoadingRent}
            label="Alugar"
            type="button"
            className="p-button-warning"
            icon="pi pi-bookmark-fill"
            disabled={currentEditingBook?.Rent.length === currentEditingBook?.rent_limit}
          />
        )}
        
        <RentInfo>
          Alugados: {currentEditingBook?.Rent.length}/{currentEditingBook?.rent_limit}
        </RentInfo>

        {user?.isAdm && (
          <>
            <Button
              onClick={confirmRemoveBook}
              label="Remover livro"
              icon="pi pi-upload"
              type="button"
              className="p-button-danger"
              loading={isLoadingDelete}
            />
            <Button
              icon="pi pi-save"
              label="Salvar"
              type="submit"
              loading={isLoading}
            />
          </>
        )}
      </ModalForm>
    </Container>
  );
}

export { ViewBook };
