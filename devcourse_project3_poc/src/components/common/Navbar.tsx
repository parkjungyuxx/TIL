import draw from "../../assets/images/streamline_pen-draw-solid.svg";

export default function Navbar() {
  return (
    <>
      <nav className="py-10">
        <div className="flex justify-center h-[72px]">
          <div className="flex bg-[#222222] p-2 rounded-[8px]">
            <div className="bg-[#FA5D29] rounded-[8px] flex items-center justify-center w-[56px]">
              <img src={draw} alt="draw icon" />
            </div>
            <div className="text-white flex gap-4 justify-center items-center ml-[50px] mr-[50px]">
              <a href="">Home</a>
              <a href="">Community</a>
              <a href="">About us</a>
            </div>
          </div>
          <div className="flex border border-[#222222] bg-[#E6FF42] text-center items-center rounded-[8px] ml-[14px] px-[30px]">
            Launch Game
          </div>
        </div>
      </nav>
    </>
  );
}
