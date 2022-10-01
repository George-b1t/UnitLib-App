import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { setUser } from "../../contexts/redux/slices/userSlice";
import { removeUserCookie } from "../../utils/UserCookies";
import { Container, Logo, Separator, Title } from "./styles";

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  isAdm?: boolean;
}

function Header({ title, showMenu, isAdm }: HeaderProps) {
  const { setCurrentSidebar, setSidebarOpen } = useContext(AppContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = useRef(null as any);

  function handleSidebar(name: string) {
    setCurrentSidebar(name);

    setSidebarOpen(true);
  }

  function logOut() {
    dispatch(setUser(null));
    removeUserCookie();

    navigate("/login");
  }

  const admOptions = isAdm
    ? [
        {
          label: "Novo livro",
          icon: "pi pi-plus",
          command: () => {
            handleSidebar("new_book");
          },
        },
        {
          label: "Livros pendentes",
          icon: "pi pi-bookmark",
          command: () => {
            handleSidebar("pending_books");
          },
        },
        {
          label: "Novo adm",
          icon: "pi pi-user-plus",
          command: () => {
            handleSidebar("add_administrator");
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
    </Container>
  );
}

export { Header };
