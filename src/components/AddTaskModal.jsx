import { useState, useContext } from "react";
import BoardContext from '../contexts/BoardContext';
import CardPreview from "./CardPreview";

export default function AddTaskModal({ onClose, listId }) {
    const { tasks, setTasks, labels } = useContext(BoardContext);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [labelId, setLabelId] = useState(undefined);

    const handleAddTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: taskTitle,
            description: taskDescription,
            labelId: labelId,
            listId: listId
        };

        setTasks([
            ...tasks,
            newTask,
        ]);
        onClose();
    };

    const handleLabelPick = (id) => {
        if (labelId == id) setLabelId(undefined)
        else setLabelId(id)
    }

    return (
        <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-screen z-50 overflow-auto">
            <div className="bg-gray-800 ring-1 ring-slate-600/50 rounded-md shadow-md p-5 w-[80vw] lg:w-[35vw]">
                <div className="flex flex-col lg:gap-3">
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-100 mb-3">
                            Create new Card
                        </h2>
                        <div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Card title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Card description"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <h2 className="font-semibold mb-1">Card Label</h2>
                                <div className="flex flex-wrap gap-1">
                                    {labels
                                        .map((label) => (
                                            <button
                                                key={label.text}
                                                onClick={() => handleLabelPick(label.id)}
                                                className={`px-3 py-0.5 rounded-md text-white text-sm font-semibold shadow-sm duration-300 ${label.id != labelId ? 'bg-gray-600 shadow-gray-600' : label.color}`}
                                                style={{ backgroundColor: label.color }}
                                            >
                                                {label.text.toUpperCase()}
                                            </button>
                                        ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <h2 className="font-semibold mb-1">Card Preview</h2>
                                <CardPreview title={taskTitle} labelId={labelId} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-end gap-2">
                        <button
                            className="bg-red-400/70 text-white py-1 px-4 rounded-md duration-200 hover:bg-red-400/50 focus:outline-none"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-400/70 text-white py-1 px-4 rounded-md duration-200 hover:bg-green-400/50 focus:outline-none"
                            onClick={() => handleAddTask()}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
