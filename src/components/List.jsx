import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import Card from './Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import BoardContext from '../contexts/BoardContext';

export default function List({ title, id, listTasks, filteredTasks, index }) {
    const { tasks, setTasks, lists, setLists, editCard, setEditCard } = useContext(BoardContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleAddTaskClick = (event) => {
        setMousePosition({ x: event.pageX, y: event.pageY });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleListDelete = () => {
        const updatedLists = lists.filter(list => list.id !== id);
        const updatedTasks = tasks.filter(task => task.listId !== id);
        setLists(updatedLists);
        setTasks(updatedTasks);
    }

    return (
        <div>
            <Draggable
                draggableId={`list-${id}`}
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
                                <textarea spellCheck="false" className='hover:cursor-pointer w-full my-auto resize-none h-6 min-h-5 max-h-40 overflow-hidden bg-transparent rounded-sm focus:outline-blue-500 focus:outline-none' defaultValue={title}></textarea>
                            </div>
                            <button
                                className='focus:outline-none hover:bg-gray-500 hover:text-white p-1 rounded-md duration-200 hover:text-red-400/70'
                                onClick={() => handleListDelete()}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                        <Droppable droppableId={`list-${id}`} type='card'>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="px-3 pt-1 overflow-y-auto flex-1"
                                >
                                    {listTasks.map((task, index) => {
                                        if (task.labelId != undefined && !filteredTasks.includes(task)) return;

                                        return (
                                            <div>
                                                <Card
                                                    id={task.id}
                                                    title={task.title}
                                                    labelId={task.labelId}
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
                                onClick={handleAddTaskClick}
                            >
                                <div className='h-4 w-4 flex items-center'><FaPlus /></div>
                                Create new card
                            </button>
                        </div>
                        {innerProvided.placeholder}
                    </div>
                )}
            </Draggable>
            {
                isModalOpen && (
                    <div className="fixed inset-0">
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center"
                            initial={{ scale: 0.5, x: mousePosition.x - window.innerWidth / 2, y: mousePosition.y - window.innerHeight / 2 }}
                            animate={{ scale: 1, x: 0, y: 0 }}
                            exit={{ scale: 0.5, x: mousePosition.x - window.innerWidth / 2, y: mousePosition.y - window.innerHeight / 2 }}
                            transition={{ type: 'spring', stiffness: 700, damping: 60 }}
                        >
                            <AddTaskModal onClose={handleCloseModal} listId={id} />
                        </motion.div>
                    </div>
                )
            }
            {
                editCard && (
                    <div className="fixed inset-0">
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center"
                            initial={{ scale: 0.5, x: mousePosition.x - window.innerWidth / 2, y: mousePosition.y - window.innerHeight / 2 }}
                            animate={{ scale: 1, x: 0, y: 0 }}
                            exit={{ scale: 0.5, x: mousePosition.x - window.innerWidth / 2, y: mousePosition.y - window.innerHeight / 2 }}
                            transition={{ type: 'spring', stiffness: 700, damping: 60 }}
                        >
                            <EditTaskModal onClose={() => setEditCard(undefined)} cardId={editCard} />
                        </motion.div>
                    </div>
                )
            }
        </div>
    )
}