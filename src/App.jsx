import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import LabelContainer from "./components/LabelContainer";
import ListContainer from "./components/ListContainer";
import EditCardModal from "./components/EditCardModal";
import AddCardModal from "./components/AddCardModal";
import BoardContext from './contexts/BoardContext';

import DefaultData from './assets/DefaultData.json';

export default function App() {
  const [labels, setLabels] = useState(DefaultData.labels);
  const [lists, setLists] = useState(DefaultData.lists);
  const [editCard, setEditCard] = useState(undefined);
  const [createCard, setCreateCard] = useState(undefined);

  return (
    <div className="flex flex-col h-screen">
      <BoardContext.Provider value={{ labels, setLabels, lists, setLists, editCard, setEditCard, createCard, setCreateCard }}>
        <Navbar />
        <LabelContainer />
        <ListContainer />
        <AnimatePresence>
          {createCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AddCardModal onClose={() => setCreateCard(undefined)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EditCardModal onClose={() => setEditCard(undefined)} />
            </motion.div>
          )}
        </AnimatePresence>
      </BoardContext.Provider>
    </div>
  )
}
