import { useContext } from "react"
import BoardContext from '../contexts/BoardContext';

export default function LabelContainer() {
    const { labels, setLabels } = useContext(BoardContext);

    const toggleLabel = (event) => {
        const labelText = event.target.textContent.toLowerCase();
        const labelIndex = labels.findIndex(label => label.text.toLowerCase() === labelText);
        
        if (labelIndex !== -1) {
            setLabels(prevLabels => {
                const updatedLabels = [...prevLabels];
                updatedLabels[labelIndex].active = !updatedLabels[labelIndex].active;
                return updatedLabels;
            });
        }
    }

    return (
        <div className="flex justify-center gap-3 py-5 flex-wrap">
            {
                labels.map(label => {
                    return (
                        <button
                            key={label.text}
                            className={`px-3 py-0.5 rounded-md text-white font-semibold ${label.color} shadow-sm duration-300 ${!label.active ? 'brightness-50' : ''}`}
                            onClick={(event) => toggleLabel(event)}
                        >
                            {label.text.toUpperCase()}
                        </button>
                    )
                })
            }
        </div>
    )
}