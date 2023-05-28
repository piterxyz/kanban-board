import { useBoard } from '../../contexts/BoardContext';
import { FaTrashAlt } from 'react-icons/fa';

export default function ListHeader({ listId, title }) {
    const { listChangeTitleHandler, listRemove } = useBoard();

    const handleTitleChange = (event) => {
        listChangeTitleHandler(listId, event.target.value);
    }

    const handleListDelete = () => {
        listRemove(listId);
    }

    return (
        <div className="px-3 py-2 w-full flex justify-between items-center">
            <div className='flex items-center'>
                <textarea
                    onChange={handleTitleChange}
                    onClick={(e) => e.target.select()}
                    spellCheck="false"
                    className='hover:cursor-pointer w-full my-auto resize-none h-6 min-h-5 max-h-40 overflow-hidden bg-transparent rounded-sm focus:outline-blue-500 focus:outline-none'
                    defaultValue={title}
                ></textarea>
            </div>
            <button
                className='focus:outline-blue-500 focus:outline-none hover:bg-gray-700 hover:text-white p-1 rounded-md hover:duration-200 hover:text-red-400/70'
                onClick={handleListDelete}
            >
                <FaTrashAlt />
            </button>
        </div>
    )
}