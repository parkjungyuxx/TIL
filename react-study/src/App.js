import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>home</>,
    errorElement: <>Not Found🤔</>,
  },
  {
    path: "/detail",
    element: <>detail</>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
