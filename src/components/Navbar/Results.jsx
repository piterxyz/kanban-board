import { useBoard } from '../../contexts/BoardContext';
import Card from "../Card/Card"

export default function Results({ query, setResultsOpen }) {
    const { lists, modalUpdate } = useBoard();

    const filteredResults = lists.reduce((acc, list) => {
        const filteredCards = list.cards.filter(card =>
            card.title.toLowerCase().includes(query)
        );

        if (filteredCards.length) {
            acc.push({ list, cards: filteredCards });
        }

        return acc;
    }, []);

    return (
        <div className={`duration-100 max-h-[50vh] px-2 pb-2 overflow-y-auto absolute z-10 top-full left-0 bg-slate-800 rounded-b-md ring-1 ring-slate-600/50 w-full`}>
            {
                query && filteredResults.length ? filteredResults.map(data => {
                    return (
                        <div key={data.list.id} className='flex flex-col'>
                            <h2 className='font-semibold text-gray-200 py-2'>{data.list.title}</h2>
                            <ul className="flex flex-col gap-2">
                                {
                                    data.cards.map((card, index) => {
                                        return (
                                            <li key={card.id}>
                                                <button
                                                    className='focus-visible:outline-none focus-visible:outline-blue-500 focus-visible:duration-0 rounded-md text-start w-full duration-200 hover:brightness-[90%] hover:cursor-pointer'
                                                    onClick={() => {
                                                        modalUpdate({ listId: data.list.id, ...card })
                                                        setResultsOpen(false)
                                                    }}
                                                >
                                                    <Card 
                                                        data={card} 
                                                        index={index}
                                                    />
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }) :
                    <div className='px-1 pt-1'>
                        No results
                    </div>
            }
        </div>
    )
}