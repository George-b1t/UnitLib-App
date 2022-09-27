import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedUser } from "../../contexts/redux/slices/userSlice";
import { Container } from "./styles";

function Dashboard() {
  const navigate = useNavigate();

  const user = useSelector(selectedUser);

  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);

  return (
    <Container>
      {user && (
        <>
          <p>Id: {user.id}</p>
          <p>Nome: {user.name}</p>
          <p>isAdm: {user.isAdm ? "Sim" : "Não"}</p>
          <p>token: {user.token}</p>
        </>
      )}
    </Container>
  );
}

export { Dashboard };
