import { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import BoardContext from '../contexts/BoardContext';

export default function CardPreview({ title, labelId }) {
    const { labels } = useContext(BoardContext);

    return (
        <div className="bg-gray-700 rounded-md shadow-lg p-2 w-full">
            <div className="flex items-start justify-between">
                <h2 className="text-gray-200 w-11/12 break-words">{title}</h2>
                <div>
                    <button className="focus:outline-none hover:bg-gray-500 hover:text-white p-1 rounded-md duration-200">
                        <FaPencilAlt />
                    </button>
                </div>
            </div>
            {labelId !== undefined && (
                <div className="flex items-center mt-2">
                    {labels
                        .filter((label) => label.id === labelId)
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
        </div>
    )
}