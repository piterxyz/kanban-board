import { FaPlus } from 'react-icons/fa';
import { useBoard } from '../../contexts/BoardContext';

export default function ListCreateCardButton({ listId }) {
    const { modalUpdate } = useBoard();

    return (
        <div className="px-3 pb-3">
            <button
                className="focus-visible:outline-blue-500 focus-visible:outline-none w-full text-start text-sm shadow-md rounded-md bg-gray-700 text-gray-100 py-2 px-3 hover:duration-200 hover:bg-gray-700/60 flex items-center gap-1 hover:ring-1 ring-slate-600/50"
                onClick={() => modalUpdate({ listId })}
            >
                <div className='h-4 w-4 flex items-center'><FaPlus /></div>
                Create new card
            </button>
        </div>
    )
}