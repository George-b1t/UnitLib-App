import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FormEvent, useContext, useState } from "react";
import { Container, FormItem, ModalForm } from "./styles";
import { api } from "../../services/api";
import { AppContext } from "../../contexts/AppContext";

function AddAdministrator() {
  const { makeToast } = useContext(AppContext);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    api
      .post("/user/admin", {
        name,
      })
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: `O usuário ${name} agora é administrador!`,
        });

        setName("");
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar adicionar administrador!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container>
      <ModalForm onSubmit={handleSubmit}>
        <FormItem>
          <label htmlFor="name">Nome do administrador</label>
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <InputText
              name="book_name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do administrador"
              required
              style={{ width: "100%" }}
            />
          </span>
        </FormItem>

        <Button
          icon="pi pi-plus"
          label="Adicionar"
          type="submit"
          loading={loading}
        />
      </ModalForm>
    </Container>
  );
}

export { AddAdministrator };
