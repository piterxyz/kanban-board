import { useState, useContext } from "react";
import BoardContext from '../contexts/BoardContext';
import CardPreview from "./CardPreview";

export default function AddCardModal({ onClose }) {
    const { lists, setLists, labels, createCard } = useContext(BoardContext);

    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [labelId, setLabelId] = useState(undefined);

    const handleAddCard = () => {
        let id = 0;
        lists.map(list => id += list.cards.length);

        const newCard = {
            id: id + 1,
            title: cardTitle,
            description: cardDescription,
            labelId: labelId
        };

        setLists(lists.map(list => {
            if (list.id == createCard) {
                return {
                    ...list,
                    cards: [
                        ...list.cards,
                        newCard
                    ]
                }
            }
            return list;
        }))
        onClose();
    };

    const handleLabelPick = (id) => {
        if (labelId == id) setLabelId(undefined)
        else setLabelId(id)
    }

    return (
        <div className="bg-slate-800/90 fixed inset-0">
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen z-50 overflow-auto">
                    <div className="max-h-[75vh] overflow-y-auto bg-gray-800 ring-1 ring-slate-600/50 rounded-md shadow-md p-5 w-[80vw] lg:w-[35vw]">
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
                                            value={cardTitle}
                                            onChange={(e) => setCardTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Card description"
                                            value={cardDescription}
                                            onChange={(e) => setCardDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="font-semibold mb-1">Card Label</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {labels
                                                .map((label) => (
                                                    <button
                                                        key={label.text}
                                                        onClick={() => handleLabelPick(label.id)}
                                                        className={`px-3 py-0.5 rounded-md text-white text-sm font-semibold shadow-sm duration-300 ${label.id != labelId ? 'bg-gray-600 shadow-gray-600' : label.color}`}
                                                    >
                                                        {label.text.toUpperCase()}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="font-semibold mb-1">Card Preview</h3>
                                        <CardPreview title={cardTitle} labelId={labelId} />
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
                                    onClick={() => handleAddCard()}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
