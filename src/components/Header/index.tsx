import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../../contexts/redux/slices/userSlice";
import { removeUserCookie } from "../../utils/UserCookies";
import { Container, Logo, Separator, SidebarTitle, Title } from "./styles";
import { CreateBookContent } from "../CreateBookContent";

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  isAdm?: boolean;
}

function Header({ title, showMenu, isAdm }: HeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = useRef(null as any);

  function logOut() {
    dispatch(setUser(null));
    removeUserCookie();

    navigate("/login");
  }

  const admOptions = isAdm
    ? [
        {
          label: "Novo livro",
          icon: "pi pi-book",
          command: () => {
            setSidebarOpen(true);
          },
        },
        {
          label: "Novo adm",
          icon: "pi pi-user-plus",
          command: () => {
            alert("OPA");
          },
        },
      ]
    : [];

  const items = [
    {
      label: "Menu",
      items: [
        ...admOptions,
        {
          label: "Sair",
          icon: "pi pi-sign-out",
          command: logOut,
        },
      ],
    },
  ];

  return (
    <Container>
      <div>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Logo>
            Unit<span>Lib</span>
          </Logo>
        </NavLink>
        <Separator />
        <Title>{title}</Title>
      </div>
      <div>
        <Menu model={items} popup ref={menu} id="popup_menu" />
        {showMenu && (
          <Button
            icon="pi pi-bars"
            onClick={(event) => menu.current.toggle(event)}
            aria-controls="popup_menu"
            aria-haspopup
          />
        )}
      </div>

      <Sidebar
        onHide={() => setSidebarOpen(false)}
        visible={sidebarOpen}
        className="p-sidebar-sm"
        closeOnEscape={false}
      >
        <SidebarTitle>Criar Livro</SidebarTitle>
        <CreateBookContent />
      </Sidebar>
    </Container>
  );
}

export { Header };
