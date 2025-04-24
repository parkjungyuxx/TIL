import { Outlet } from "react-router";
import Nav from "../pages/Nav";

export default function RootLayout() {
  return (
    <>
      <header>header</header>
      <Nav />
      <Outlet />
      <footer>footer</footer>
    </>
  );
}
