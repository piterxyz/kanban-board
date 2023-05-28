import { Draggable } from 'react-beautiful-dnd';

import ListHeader from './ListHeader';
import ListCardsContainer from './ListCardsContainer';
import ListCreateCardButton from './ListCreateCardButton';

export default function List({ data, index }) {
    return (
        <div>
            <Draggable
                draggableId={`list-${data.id}`}
                index={index}
            >
                {(innerProvided) => (
                    <div
                        ref={innerProvided.innerRef}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                        className="focus:outline-blue-500 focus:outline-none overflow-y-auto mx-2 bg-gray-800 ring-1 ring-slate-600/50 rounded-lg shadow-md min-w-[17rem] max-w-[17rem] flex flex-col h-full max-h-[80vh]"
                    >
                        <ListHeader listId={data.id} title={data.title} />
                        <ListCardsContainer listId={data.id} cards={data.cards} />
                        <ListCreateCardButton listId={data.id} />
                        {innerProvided.placeholder}
                    </div>
                )}
            </Draggable>
        </div>
    )
}