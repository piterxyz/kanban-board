import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar/Navbar";
import LabelContainer from "./components/LabelContainer/LabelContainer";
import ListsWrapper from "./components/ListsWrapper/ListsWrapper";
import Modal from "./components/Modal/Modal";
import { BoardProvider } from "./contexts/BoardContext";

import "./index.css";

function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <BoardProvider>
        <Navbar />
        <LabelContainer />
        <ListsWrapper />
        <Modal />
      </BoardProvider>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
