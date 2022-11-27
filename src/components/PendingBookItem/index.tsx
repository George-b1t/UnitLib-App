import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { api } from "../../services/api";
import { Container, FieldUpload, FieldUploadWithTitle, Header, UploadTitle } from "./styles";

export interface Book {
  id: number;
  name: string;
  description: string;
  author: string;
  genre: string;
  pdf_location: string;
  cape_location: string;
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

  const [fileIconContent, setFileIconContent] = useState("pi pi-upload");
  const [fileIconCape, setFileIconCape] = useState("pi pi-upload");
  const contentRef: any = useRef(null as any);
  const capeRef: any = useRef(null as any);

  const [uploadingContent, setUploadingContent] = useState(false);
  const [uploadingCape, setUploadingCape] = useState(false);

  function handleUploadContent() {
    setUploadingContent(true);

    api
      .post(
        "http://localhost:3333/book/upload/content",
        { file: contentRef.current.getFiles()[0] },
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
      .finally(() => setUploadingContent(false));
  }

  function handleUploadCape() {
    setUploadingCape(true);

    api
      .post(
        "http://localhost:3333/book/upload/cape",
        { file: capeRef.current.getFiles()[0] },
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
          detail: "A capa do livro foi salvo com sucesso!",
        });

        onUpload();

        searchBooks();
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar salvar capa do livro!",
        });
      })
      .finally(() => setUploadingCape(false));
  }

  return (
    <Container>
      <Header>
        <h3>{book.name}</h3>

        <p>{book.author}</p>
      </Header>

      {
        !book.pdf_location && (
          <FieldUploadWithTitle>
            <UploadTitle>Conteúdo</UploadTitle>
            <FieldUpload>
              <FileUpload
                chooseOptions={{
                  icon: fileIconContent,
                }}
                chooseLabel="Selecionar"
                mode="basic"
                name="demo[]"
                accept=".pdf"
                maxFileSize={10000000}
                ref={contentRef}
                customUpload
                uploadHandler={() => {
                  contentRef.current?.clear();
                  setFileIconContent("pi pi-save");
                }}
              />

              <Button
                onClick={() => handleUploadContent()}
                icon="pi pi-upload"
                className="p-button-success"
                loading={uploadingContent}
              />
            </FieldUpload>
          </FieldUploadWithTitle>
        )
      }

      {
        !book.cape_location && (
          <FieldUploadWithTitle>
            <UploadTitle>Capa</UploadTitle>
            <FieldUpload>
              <FileUpload
                chooseOptions={{
                  icon: fileIconCape,
                }}
                chooseLabel="Selecionar"
                mode="basic"
                name="demo[]"
                accept="image/*"
                maxFileSize={2000000}
                ref={capeRef}
                customUpload
                uploadHandler={() => {
                  capeRef.current?.clear();
                  setFileIconCape("pi pi-upload");
                }}
              />

              <Button
                onClick={() => handleUploadCape()}
                icon="pi pi-upload"
                className="p-button-success"
                loading={uploadingCape}
              />
            </FieldUpload>
          </FieldUploadWithTitle>
        )
      }
    </Container>
  );
}

export { PendingBookItem };
