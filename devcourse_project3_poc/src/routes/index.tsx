import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import SoloGame from "./pages/SoloGame";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "game",
        Component: Game,
      },
      {
        path: "sologame",
        Component: SoloGame,
      },
    ],
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
