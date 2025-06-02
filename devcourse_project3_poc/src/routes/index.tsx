import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import SoloGame from "./pages/SoloGame";
import Home2 from "./pages/Home2";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        // Component: Home,
        Component: Home2,
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
