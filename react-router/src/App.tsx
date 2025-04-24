import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Community from "./pages/Community";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </>
  );
}
