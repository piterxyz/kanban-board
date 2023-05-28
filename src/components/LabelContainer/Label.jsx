import { useBoard } from '../../contexts/BoardContext';

const labelStyles = {
    "feature": "bg-green-400/50 shadow-green-400/50",
    "refactor": "bg-blue-400/50 shadow-blue-400/50",
    "suggestion": "bg-violet-400/50 shadow-violet-400/50",
    "bug": "bg-red-400/50 shadow-red-400/50",
    "security": "bg-yellow-500/70 shadow-yellow-500/70"
}

export default function Label({ labelId }) {
    const { labels } = useBoard();

    return (
        <div className="flex items-center">
            {
                labels
                    .filter((label) => label.id === labelId)
                    .map((label) => (
                        <span
                            key={label.text}
                            className={`px-3 py-[3px] rounded-md text-white font-bold shadow-sm ${labelStyles[label.text]}`}
                        >
                            {label.text.toUpperCase()}
                        </span>
                    ))
            }
        </div>
    )
}