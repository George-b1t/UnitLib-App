import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { selectedUser, setUser } from "../../contexts/redux/slices/userSlice";
import { removeUserCookie } from "../../utils/UserCookies";
import { Container, Content } from "./styles";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectedUser);

  function logOut() {
    dispatch(setUser(null));
    removeUserCookie();

    navigate("/login");
  }

  return (
    <Container>
      <Header title={`Seja bem-vindo(a), ${user && user.name}`} />
      <Content>
        <Button
          label="Sair"
          className="p-button-danger"
          icon="pi pi-sign-out"
          onClick={logOut}
        />
      </Content>
    </Container>
  );
}

export { Dashboard };
