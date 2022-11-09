import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { api } from "../../services/api";
import { Container, FieldUpload, Header } from "./styles";

export interface Book {
  id: number;
  name: string;
  description: string;
  author: string;
  genre: string;
  pdf_location: string;
  rent_limit: number;
  Rent: {
    id: number;
    user_id: number;
  }[]
}

interface BookItem {
  book: Book;
  onUpload: () => void;
}

function PendingBookItem({ book, onUpload }: BookItem) {
  const { makeToast, searchBooks } = useContext(AppContext);

  const [fileIcon, setFileIcon] = useState("pi pi-upload");
  const fileRef: any = useRef(null as any);

  const [uploading, setUploading] = useState(false);

  function handleUpload() {
    setUploading(true);

    api
      .post(
        "http://localhost:3333/book/upload",
        { file: fileRef.current.getFiles()[0] },
        {
          headers: {
            "book-id": book.id,
            "file-name": `${book.name}-${book.id}`,
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

        onUpload();

        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar salvar conteúdo do livro!",
        });
      })
      .finally(() => setUploading(false));
  }

  return (
    <Container>
      <Header>
        <h3>{book.name}</h3>

        <p>{book.author}</p>
      </Header>

      <FieldUpload>
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
      </FieldUpload>
    </Container>
  );
}

export { PendingBookItem };
