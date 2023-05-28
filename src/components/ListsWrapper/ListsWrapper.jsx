import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import List from '../List/List';
import CreateListButton from './CreateListButton';
import { useBoard } from '../../contexts/BoardContext';

export default function ListsWrapper() {
    const { lists, listChangePos, cardCreateAfter, cardRemove } = useBoard();

    const handleDragEnd = ({ destination, source, draggableId, type }) => {
        if (!destination) return;

        if (type === 'list') listChangePos(source.index, destination.index);

        if (type === 'card') {
            const sourceListId = parseInt(source.droppableId.split('-')[1]);
            const destinationListId = parseInt(destination.droppableId.split('-')[1]);
            const cardId = parseInt(draggableId.split('-')[1]);
            const card = lists.filter(list => list.id == sourceListId)[0].cards.filter(card => card.id == cardId)[0];

            cardRemove(sourceListId, cardId);
            cardCreateAfter(destinationListId, card, destination.index);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='flex flex-row items-center overflow-auto max-w-screen py-1 px-3 min-h-[10vh] max-h-screen'>
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
                <CreateListButton />
            </div>
        </DragDropContext>
    )
}