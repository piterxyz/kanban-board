import { createContext } from 'react';

const BoardContext = createContext({
    labels: [],
    setLabels: (label) => {},
    lists: [],
    setLists: (list) => {},
    editCard: undefined,
    setEditCard: (edit) => {},
    createCard: undefined,
    setCreateCard: (create) => {},
});

export default BoardContext;