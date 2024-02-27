import Board from "./components/Board";
import Header from "./components/Header";
import { tasks } from "./constants";

export default function App() {
  return (
    <div className="bg-blue-50">
      <div className="w-[70%] mx-auto py-12 h-screen">
        <Header />
        <div className="grid grid-cols-3 gap-12 shadow-sm py-12">
          {tasks.map((task) => (
            <Board task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
