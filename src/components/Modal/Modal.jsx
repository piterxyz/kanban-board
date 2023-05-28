import { useState } from "react";
import { useBoard } from '../../contexts/BoardContext';
import Label from "../LabelContainer/Label";

export default function Modal() {
    const { labels, cardCreate, cardUpdate, modal, modalUpdate } = useBoard();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [labelId, setLabelId] = useState(undefined);

    const handleSave = () => {
        const card = {
            id: modal && modal.id ? modal.id : Date.now(),
            title: title ? title : modal.title,
            description: description ? description : modal.description,
            labelId: labelId != undefined ? labelId : modal.labelId
        }

        modal && modal.title ? cardUpdate(modal.listId, card) : cardCreate(modal.listId, card)
        handleClose()
    }

    const handleClose = () => {
        modalUpdate(undefined);
        setTitle('');
        setDescription('');
        setLabelId(undefined);
    }

    const handleLabelPick = (id) => {
        if (labelId == id) setLabelId(undefined)
        else setLabelId(id)
    }

    if (modal) return (
        <div className="bg-slate-800/90 fixed inset-0 top-0 left-0 right-0 flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
                        onClick={() => handleClose()}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-white">{modal && modal.title ? 'Edit card' : 'Create new card'}</h3>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
                                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title && modal.title ? title : modal.title} id="title" className="border text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="Enter a title for the card" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
                                <textarea name="description" onChange={(e) => setDescription(e.target.value)} value={description && modal.description ? description : modal.description} id="description" className="border text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="Provide a detailed description of the card's content and objectives"></textarea>
                            </div>
                            <div>
                                <label htmlFor="label" className="block mb-2 text-sm font-medium text-white">Label</label>
                                <div className="flex items-center flex-wrap gap-1">
                                    {
                                        labels
                                            .map((label) => (
                                                <button
                                                    key={label.text}
                                                    onClick={() => handleLabelPick(label.id)}
                                                    className={`duration-300 text-sm ${label.id != (labelId != undefined ? labelId : modal.labelId) ? 'brightness-50' : ''}`}
                                                >
                                                    <Label labelId={label.id} />
                                                </button>
                                            ))
                                    }
                                </div>
                            </div>
                            <button
                                onClick={() => handleSave()}
                                className="w-full duration-200 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}