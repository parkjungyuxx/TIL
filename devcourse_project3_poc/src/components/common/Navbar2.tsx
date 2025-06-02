import { NavLink, useNavigate } from "react-router";
import draw from "../../assets/images/streamline_pen-draw-solid.svg";

export default function Navbar2() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="py-10">
        <div className="flex justify-center h-[62px]">
          <div className="flex bg-[#222222] p-2 rounded-[8px]">
            <div className="bg-[#ffffff] rounded-[8px] flex items-center justify-center w-[56px]">
              <img src={draw} alt="draw icon" />
            </div>
            <div className="text-white flex gap-4 justify-center items-center px-[20px] whitespace-nowrap">
              <NavLink
                to="/"
                className="bg-[#fdfaf226] h-full px-4 items-center flex justify-center rounded-[12px]"
              >
                Home
              </NavLink>
              <NavLink
                to="/"
                className="px-4 flex items-center justify-center h-full rounded-[12px] hover:bg-[#fdfaf226] transition-colors"
              >
                Community
              </NavLink>
              <NavLink
                to="/"
                className="px-4 flex items-center justify-center h-full rounded-[12px] hover:bg-[#fdfaf226] transition-colors"
              >
                About us
              </NavLink>
            </div>
          </div>
          <div
            className="flex border border-[#222222] bg-[#c7ff69] text-center items-center rounded-[8px] ml-[14px] px-[30px] cursor-pointer"
            onClick={() => navigate("game")}
          >
            Launch Game
          </div>
        </div>
      </nav>
    </>
  );
}
