import { FaPencilAlt } from 'react-icons/fa';
import Label from '../LabelContainer/Label';

export default function Card({ data, onEdit }) {
    return (
        <div>
            <div
                className="bg-gray-700 rounded-md shadow-lg p-2 w-full focus:outline-blue-500 focus:outline-none"
            >
                <div className="flex items-start justify-between">
                    <h2 className="text-gray-200 w-11/12 break-words">{data.title}</h2>
                    <div>
                        <button
                            className="focus-visible:outline-blue-500 focus-visible:outline-none focus-visible:duration-0 hover:bg-gray-600 hover:text-white p-1 rounded-md duration-200"
                            onClick={onEdit}
                        >
                            <FaPencilAlt />
                        </button>
                    </div>
                </div>
                <div className='text-sm mt-1'>
                    {data.labelId !== undefined && <Label labelId={data.labelId} />}
                </div>
            </div>
        </div>
    )
}