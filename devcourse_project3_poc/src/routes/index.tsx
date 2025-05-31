import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
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
