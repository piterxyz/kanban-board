import { useBoard } from '../../contexts/BoardContext';
import Label from './Label';

export default function LabelContainer() {
    const { labels, labelUpdate } = useBoard();

    const toggleLabel = (label) => {
        label.active = !label.active;

        labelUpdate(label);
    }

    return (
        <div className="flex flex-col justify-center items-center px-5 py-3">
            <div className="flex justify-center gap-3 flex-wrap mb-2">
                {
                    labels.map(label => {
                        return (
                            <button
                                key={label.text}
                                className={`text-base duration-200 ease-in-out ${!label.active ? 'brightness-50' : ''}`}
                                onClick={() => toggleLabel(label)}
                            >
                                <Label labelId={label.id} />
                            </button>
                        )
                    })
                }
            </div>
        </div >
    )
}