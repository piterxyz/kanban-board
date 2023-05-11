import { useState } from "react";

import Navbar from "./components/Navbar";
import LabelContainer from "./components/LabelContainer";
import ListContainer from "./components/ListContainer";
import BoardContext from './contexts/BoardContext';

import DefaultData from './assets/DefaultData.json';

export default function App() {
  const [tasks, setTasks] = useState(DefaultData.tasks);
  const [labels, setLabels] = useState(DefaultData.labels);
  const [lists, setLists] = useState(DefaultData.lists);
  const [editCard, setEditCard] = useState(undefined);

  return (
    <div className="flex flex-col h-screen">
      <BoardContext.Provider value={{ tasks, setTasks, labels, setLabels, lists, setLists, editCard, setEditCard }}>
        <Navbar />
        <LabelContainer />
        <ListContainer />
      </BoardContext.Provider>
    </div>
  )
}
