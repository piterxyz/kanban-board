import { createContext } from 'react';

const BoardContext = createContext({
    tasks: [],
    setTasks: (task) => {},
    labels: [],
    setLabels: (label) => {},
    lists: [],
    setLists: (list) => {},
    editCard: undefined,
    setEditCard: (edit) => {}
});

export default BoardContext;