import { Outlet } from "react-router";
import Navbar from "../../components/common/Navbar";
import Navbar2 from "../../components/common/Navbar2";

export default function RootLayout() {
  return (
    <>
      {/* <div className="bg-[#FA5D29] min-h-screen"> */}
      <div className="bg-white min-h-screen w-full">
        {/* <Navbar /> */}
        <Navbar2 />
        <Outlet />
      </div>
    </>
  );
}
