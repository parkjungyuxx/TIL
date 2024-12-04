import logo from "./logo.svg";
import "./App.css";
import ButtonStyledComponent from "./ButtonStyledComponents";

function App() {
  return (
    <div className="App">
      <ButtonStyledComponent>버튼1</ButtonStyledComponent>
      <ButtonStyledComponent color="greenyellow">버튼2</ButtonStyledComponent>
    </div>
  );
}

export default App;
