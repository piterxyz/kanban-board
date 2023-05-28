import { useBoard } from '../../contexts/BoardContext';

export default function CreateListButton() {
    const { lists, listCreate } = useBoard();

    const handleCreateList = () => {
        listCreate({
            title: 'New List',
            id: lists.length + 1,
            cards: []
        });
    };

    return (
        <button
            className="focus-visible:border-blue-500 focus-visible:outline-none focus-visible:text-blue-500 focus-visible:duration-0 mx-2 min-w-[17rem] h-full text-2xl rounded-md border-[3.5px] border-slate-500 flex items-center justify-center duration-200 ease-in-out hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800/50"
            onClick={handleCreateList}
        >
            Create new list
        </button>
    )
}