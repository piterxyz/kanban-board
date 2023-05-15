import { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';

import BoardContext from '../contexts/BoardContext';

export default function Card({ data, index }) {
    const { labels, setEditCard } = useContext(BoardContext);

    return (
        <div>
            <Draggable
                key={`card-${data.id}`}
                draggableId={`card-${data.id}`}
                index={index}
                isDragDisabled={labels.filter(l => !l.active).length >= 1}
            >
                {(innerProvided) => (
                    <div
                        ref={innerProvided.innerRef}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                        className="mb-2 bg-gray-700 rounded-md shadow-lg p-2 w-full"
                    >
                        <div className="flex items-start justify-between">
                            <h2 className="text-gray-200 w-11/12 break-words">{data.title}</h2>
                            <div>
                                <button
                                    className="focus:outline-none hover:bg-gray-500 hover:text-white p-1 rounded-md duration-200"
                                    onClick={() => setEditCard(data)}
                                >
                                    <FaPencilAlt />
                                </button>
                            </div>
                        </div>
                        {data.labelId !== undefined && (
                            <div className="flex items-center mt-2">
                                {labels
                                    .filter((label) => label.id === data.labelId)
                                    .map((label) => (
                                        <span
                                            key={label.text}
                                            className={`px-3 py-0.5 rounded-md text-sm text-white font-semibold shadow-sm ${label.color}`}
                                        >
                                            {label.text.toUpperCase()}
                                        </span>
                                    ))}
                            </div>
                        )}
                        {innerProvided.placeholder}
                    </div>
                )}
            </Draggable>
        </div>
    )
}