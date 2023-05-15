import { useContext, useState } from 'react';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import BoardContext from '../contexts/BoardContext';
import Card from './Card';

export default function List({ data, index }) {
    const { labels, lists, setLists, setCreateCard } = useContext(BoardContext);

    const handleTitleChange = (event) => {
        setLists(lists.map(list => {
            if (list.id == data.id) {
                return {
                    ...list,
                    title: event.target.value
                }
            }
            return list;
        }))
    }

    const handleListDelete = () => {
        setLists(
            lists.filter(list => list.id !== data.id)
        )
    }

    const filteredCards = data.cards.filter(card =>
        labels.filter(label =>
            label.active && label.id == card.labelId
        ).length
    )

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
                        className="overflow-y-auto mx-2 bg-gray-800 ring-1 ring-slate-600/50 rounded-lg shadow-md min-w-[17rem] max-w-[17rem] flex flex-col h-full max-h-[80vh]"
                    >
                        <div className="px-3 py-2 w-full flex justify-between items-center">
                            <div className='flex items-center'>
                                <textarea onChange={handleTitleChange} spellCheck="false" className='hover:cursor-pointer w-full my-auto resize-none h-6 min-h-5 max-h-40 overflow-hidden bg-transparent rounded-sm focus:outline-blue-500 focus:outline-none' defaultValue={data.title}></textarea>
                            </div>
                            <button
                                className='focus:outline-none hover:bg-gray-500 hover:text-white p-1 rounded-md duration-200 hover:text-red-400/70'
                                onClick={() => handleListDelete()}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                        <Droppable droppableId={`list-${data.id}`} type='card'>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="px-3 pt-1 overflow-y-auto flex-1"
                                >
                                    {data.cards.map((card, index) => {
                                        if (card.labelId !== undefined && !filteredCards.includes(card)) return;

                                        return (
                                            <div key={`card-${card.id}`}>
                                                <Card
                                                    data={card}
                                                    index={index}
                                                />
                                            </div>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <div className="px-3 pb-3">
                            <button
                                className="w-full text-start text-sm shadow-md rounded-md bg-gray-700 text-gray-100 py-2 px-3 duration-200 hover:bg-gray-700/60 focus:outline-none flex items-center gap-1 hover:ring-1 ring-slate-600/50"
                                onClick={() => setCreateCard(data.id)}
                            >
                                <div className='h-4 w-4 flex items-center'><FaPlus /></div>
                                Create new card
                            </button>
                        </div>
                        {innerProvided.placeholder}
                    </div>
                )}
            </Draggable>
        </div>
    )
}