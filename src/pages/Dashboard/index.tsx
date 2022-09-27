import { useSelector } from "react-redux";
import { Header } from "../../components/Header";
import { selectedUser } from "../../contexts/redux/slices/userSlice";
import { Container } from "./styles";

function Dashboard() {
  const user = useSelector(selectedUser);

  return (
    <Container>
      {user && (
        <>
          <Header title={`Seja bem-vindo(a), ${user.name}`} />
        </>
      )}
    </Container>
  );
}

export { Dashboard };
