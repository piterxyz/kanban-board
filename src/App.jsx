import { useState } from "react";
import Navbar from "./components/Navbar";
import LabelContainer from "./components/LabelContainer";
import ListContainer from "./components/ListContainer";

import BoardContext from './contexts/BoardContext';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Add user authentication',
      description: 'Implement user authentication using JWT tokens',
      labelId: 0,
      listId: 0
    },
    {
      id: 2,
      title: 'Refactor API endpoints',
      description: 'Simplify and optimize API endpoints for better performance',
      labelId: 1,
      listId: 0
    },
    {
      id: 3,
      title: 'Add light mode',
      description: 'Consider adding a light mode option to damage people\'s eyes',
      labelId: 2,
      listId: 1
    },
    {
      id: 4,
      title: 'Fix login page redirect',
      description: 'Fix issue where users are not redirected to the correct page after logging in',
      labelId: 3,
      listId: 2
    },
    {
      id: 5,
      title: 'Implement password hashing',
      description: 'Improve security by implementing password hashing for user passwords',
      labelId: 4,
      listId: 2
    },
  ]);

  const [labels, setLabels] = useState([
    {
      id: 0,
      text: 'feature',
      color: 'bg-green-400/80 shadow-green-400/80',
      active: true
    },
    {
      id: 1,
      text: 'refactor',
      color: 'bg-blue-400/80 shadow-blue-400/80',
      active: true
    },
    {
      id: 2,
      text: 'suggestion',
      color: 'bg-violet-400/80 shadow-violet-400/80',
      active: true
    },
    {
      id: 3,
      text: 'bug',
      color: 'bg-red-400/80 shadow-red-400/80',
      active: true
    },
    {
      id: 4,
      text: 'security',
      color: 'bg-yellow-500 shadow-yellow-500',
      active: true
    },
  ]);

  const [lists, setLists] = useState([
    {
      title: 'To Do',
      id: 0
    },
    {
      title: 'In Progress',
      id: 1
    },
    {
      title: 'Done',
      id: 2
    },
  ]);

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
