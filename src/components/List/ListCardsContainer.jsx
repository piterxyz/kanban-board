import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useBoard } from '../../contexts/BoardContext';

import Card from '../Card/Card';

export default function ListCardsContainer({ listId, cards }) {
    const { labels, modalUpdate } = useBoard();

    const filteredCards = cards.filter(card =>
        labels.filter(label =>
            label.active && label.id == card.labelId
        ).length
    )

    return (
        <Droppable droppableId={`list-${listId}`} type='card'>
            {(provided) => (
                <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="px-3 pt-1 overflow-y-auto flex-1"
                >
                    {
                        cards.map((card, index) => {
                            if (card.labelId !== undefined && !filteredCards.includes(card)) return;

                            return (
                                <Draggable
                                    key={`card-${card.id}`}
                                    draggableId={`card-${card.id}`}
                                    index={index}
                                >
                                    {(innerProvided) => (
                                        <li 
                                            key={`card-${card.id}`}
                                            ref={innerProvided.innerRef}
                                            {...innerProvided.draggableProps}
                                            {...innerProvided.dragHandleProps}
                                            className='mb-2'
                                        >
                                            <Card
                                                data={card}
                                                onEdit={() => modalUpdate({ listId, ...card })}
                                            />
                                            {innerProvided.placeholder}
                                        </li>
                                    )}
                                </Draggable>
                            )
                        })
                    }
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    )
}