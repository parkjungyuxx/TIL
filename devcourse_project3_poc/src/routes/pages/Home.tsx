import { ArrowRight } from "lucide-react";
import mainimg from "../../assets/images/mainimg.png";
export default function Main() {
  return (
    <div className="h-full w-screen flex justify-center items-center flex-col">
      <div className="text-[72px] text-center">
        Meet the <br />
        Pictionary Pros
      </div>
      <div className="flex border border-[#222222] rounded-[8px] py-2 px-4 mt-4 gap-2">
        <div>JOIN</div>
        <ArrowRight className="w-4" />
      </div>
      <img src={mainimg} alt="메인이미지" className="w-[1080px] " />
    </div>
  );
}
