import Cookies from "js-cookie";
import { User } from "../contexts/redux/slices/userSlice";

function getUserCookie() {
  const userData = Cookies.get("user_data");

  if (!userData) return null;

  return JSON.parse(userData);
}

function setUserCookie(user: User) {
  Cookies.set("user_data", JSON.stringify(user));
}

export { getUserCookie, setUserCookie };
