import Input from "./components/Input";

export default function App() {
  return (
    <div className="flex flex-cols min-h-screen w-full bg-black justify-center items-center">
      <Input type="email" className="" placeholder="please enter email..." />
    </div>
  );
}
