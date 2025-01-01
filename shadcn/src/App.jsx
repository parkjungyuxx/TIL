import "./App.css";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function App() {
  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2 bg-slate-500">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </div>
      <button>ㅇㄹㄴㅇ</button>
    </div>
  );
}

export default App;
