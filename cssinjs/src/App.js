import logo from "./logo.svg";
import "./App.css";
import ButtonStyledComponent from "./ButtonStyledComponents";

function App() {
  return (
    <div className="App">
      <ButtonStyledComponent>버튼1</ButtonStyledComponent>
      <ButtonStyledComponent color="greenyellow">버튼2</ButtonStyledComponent>
      <div className="text-8xl">안녕</div>
      <button className="bg-blue-300 rounded px-4">Button</button>
    </div>
  );
}

export default App;
