import { FaSearch } from 'react-icons/fa';
import { useRef, useState, useEffect, useContext } from 'react';

import CardPreview from './CardPreview';
import BoardContext from '../contexts/BoardContext';

export default function SearchBar() {
    const { lists, setEditCard } = useContext(BoardContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [active, setActive] = useState(false);
    const searchBarRef = useRef(null);

    const filteredCards = lists.map(list => {
        const filteredCards = list.cards.filter(card => card.title.toLowerCase().includes(searchQuery));
        if (filteredCards.length) return { list: list, cards: filteredCards };
        else return;
    })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setActive(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchBarRef]);

    return (
        <div
            ref={searchBarRef}
            className='relative w-[95vw] md:w-[300px] flex justify-center'
        >
            <div className={`w-full flex items-center justify-between bg-slate-800 ${active ? 'rounded-t-md' : 'rounded-md'} ring-1 ring-slate-600/50 shadow-sm px-3`}>
                <input
                    type="text"
                    placeholder='Search for cards...'
                    className='h-9 outline-none bg-transparent w-[99%]'
                    onClick={() => setActive(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div><FaSearch /></div>

                {active && (
                    <div
                        className={`max-h-[50vh] px-2 overflow-y-auto absolute z-10 top-full left-0 bg-slate-800 rounded-b-md ring-1 ring-slate-600/50 w-full`}
                    >
                        {filteredCards.length && searchQuery ? filteredCards.map(data => (
                            <div key={data.list.id} className='flex flex-col py-2 gap-2'>
                                {data && data.list && <h2 className='font-semibold'>{data.list.title}</h2>}
                                {data && data.cards && data.cards.map(card => {
                                    return (
                                        <div
                                            key={card.id}
                                            className='w-full duration-200 hover:brightness-[90%] hover:cursor-pointer'
                                            onClick={() => {
                                                setEditCard(card)
                                                setActive(false)
                                            }}
                                        >
                                            <CardPreview title={card.title} labelId={card.labelId} />
                                        </div>
                                    )
                                })}
                            </div>
                        )) : (
                            <div className='w-full px-1 py-2'>
                                No results.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}