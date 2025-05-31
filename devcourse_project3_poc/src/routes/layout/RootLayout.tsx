import { Outlet } from "react-router";
import Navbar from "../../components/common/Navbar";

export default function RootLayout() {
  return (
    <>
      <div className="bg-[#FA5D29] min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
