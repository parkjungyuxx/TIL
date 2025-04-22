import Button from "./components/html/Button";
import Input from "./components/html/Input";

export default function App() {
  return (
    <div className="flex flex-cols min-h-screen w-full bg-black justify-center items-center">
      {/* <Input type="email" className="" placeholder="please enter email..." /> */}
      <Button state="outline">Button</Button>
    </div>
  );
}
