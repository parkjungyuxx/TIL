import mainimg from "../../assets/images/mainimg1.png";
export default function Main() {
  return (
    <div className="h-full w-screen flex justify-center items-center flex-col">
      <div className="text-[72px] text-center">
        Meet the <br />
        Pictionary Pros
      </div>
      <img src={mainimg} alt="메인이미지" className="w-[1080px] " />
    </div>
  );
}
