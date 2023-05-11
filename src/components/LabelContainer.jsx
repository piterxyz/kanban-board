import { useContext } from "react"
import BoardContext from '../contexts/BoardContext';

export default function LabelContainer() {
    const { labels, setLabels } = useContext(BoardContext);

    const toggleLabel = (label) => {
        setLabels(
            labels.map(l => {
                if (l.id == label.id) {
                    return {
                        ...l,
                        active: !l.active
                    }
                }
                return { ...l }
            })
        )
    }

    return (
        <div className="flex flex-col text-center py-3">
            <div className="flex justify-center gap-3 flex-wrap mb-2">
                {
                    labels.map(label => {
                        return (
                            <button
                                key={label.text}
                                className={`px-3 py-0.5 rounded-md text-white font-semibold ${label.color} shadow-sm duration-300 ${!label.active ? 'brightness-50' : ''}`}
                                onClick={() => toggleLabel(label)}
                            >
                                {label.text.toUpperCase()}
                            </button>
                        )
                    })
                }
            </div>
            {
                labels.filter(l => !l.active).length >= 1 && (
                    <p>
                        Drag and drop for cards is currently disabled. Enable the visibility of all labels to make it work again.
                    </p>
                )
            }
        </div >
    )
}