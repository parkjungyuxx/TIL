import Filtering from "./Filtering";
import Form from "./Form";
import TodoList from "./TodoList";

const Main = () => {
  return (
    <>
      <div className="w-4/12 flex-col">
        <header className="flex justify-between content-center">
          <button>DarkMode</button>
          <div>
            <Filtering />
          </div>
        </header>
        <TodoList />
        <Form />
      </div>
    </>
  );
};

export default Main;
