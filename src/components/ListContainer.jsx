import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';

import List from './List';
import BoardContext from '../contexts/BoardContext';

export default function ListContainer() {
    const { lists, setLists } = useContext(BoardContext);

    const handleCreateList = () => {
        const newList = {
            title: 'New List',
            id: lists.length + 1,
            cards: []
        };
        setLists([...lists, newList]);
    };

    const handleDragEnd = ({ destination, source, draggableId, type }) => {
        if (!destination) return;

        if (type === 'list') {
            const updatedLists = lists;
            const [removedList] = updatedLists.splice(source.index, 1);
            updatedLists.splice(destination.index, 0, removedList);
            setLists(updatedLists);
        }

        if (type === 'card') {
            const sourceListId = parseInt(source.droppableId.split('-')[1]);
            const destinationListId = parseInt(destination.droppableId.split('-')[1]);
            const cardId = parseInt(draggableId.split('-')[1]);
            const card = lists.filter(list => list.id == sourceListId)[0].cards.filter(card => card.id == cardId)[0];

            setLists(prevLists => {
                const updatedLists = prevLists.map(list => {
                    if (list.id == sourceListId && list.id == destinationListId) {
                        const updatedCards = list.cards;
                        updatedCards.splice(source.index, 1);
                        updatedCards.splice(destination.index, 0, card);
                        return {
                            ...list,
                            cards: updatedCards
                        }
                    }
                    if (list.id == sourceListId) {
                        return {
                            ...list,
                            cards: list.cards.filter(card => card.id !== cardId)
                        };
                    }
                    if (list.id == destinationListId) {
                        return {
                            ...list,
                            cards: [
                                ...list.cards.slice(0, destination.index),
                                card,
                                ...list.cards.slice(destination.index)
                            ]
                        };
                    }
                    return list;
                });

                return updatedLists;
            });
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='flex flex-row items-start overflow-x-auto max-w-screen px-3 py-2 max-h-screen'>
                <Droppable droppableId='list-container' type='list' direction='horizontal'>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex flex-row items-start h-full max-h-full"
                        >
                            {
                                lists.map((list, index) => (
                                    <List
                                        key={`list-${list.id}`}
                                        data={list}
                                        index={index}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <button
                    className="mx-2 min-w-[17rem] h-full text-2xl rounded-sm outline-dashed flex items-center justify-center duration-200 hover:outline hover:outline-blue-500 hover:cursor-pointer hover:bg-gray-800"
                    onClick={() => handleCreateList()}
                >
                    Create new list
                </button>
            </div>
        </DragDropContext>
    )
}