import paw from "../../assets/images/paw.svg";
import logo from "../../assets/images/logo.svg";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-20">
      <div className="flex">
        <img src={paw} alt="" />
        <img src={logo} alt="" />
      </div>
      <nav>
        <div className="flex gap-[16px]">
          <button className="py-3 px-4 border border-black rounded-[4px]">
            Try it with Guest Mode
          </button>
          <button className="py-3 px-4 border border-black rounded-[4px]">
            Join To DRAW
          </button>
        </div>
      </nav>
    </nav>
  );
}
