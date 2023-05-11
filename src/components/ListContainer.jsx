import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';

import List from './List';
import BoardContext from '../contexts/BoardContext';

export default function ListContainer() {
    const { tasks, setTasks, labels, lists, setLists } = useContext(BoardContext);
    
    const handleCreateList = () => {
        const newList = {
            title: 'New List',
            id: lists.length + 1
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
            let updatedTasks = tasks;
            const [removedTask] = updatedTasks.filter(task => task.id == draggableId.split('-')[1]);

            updatedTasks = updatedTasks.filter(task => task.id != draggableId.split('-')[1]);
            removedTask.listId = parseInt(destination.droppableId.split('-')[1]);
            updatedTasks.splice(destination.index, 0, removedTask);

            setTasks(updatedTasks);
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
                                        title={list.title}
                                        id={list.id}
                                        listTasks={tasks.filter((task) => task.listId === list.id)}
                                        filteredTasks={tasks.filter(task => labels.filter(label => label.active && label.id == task.labelId).length)}
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