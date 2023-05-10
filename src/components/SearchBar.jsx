import { FaSearch } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useRef, useState, useEffect, useContext } from 'react';
import CardPreview from './CardPreview';
import BoardContext from '../contexts/BoardContext';

export default function SearchBar() {
    const { tasks, setEditCard } = useContext(BoardContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [active, setActive] = useState(false);
    const animationControls = useAnimation();
    const searchBarRef = useRef(null);

    const setDivMaxWidth = (width) => {
        animationControls.start({ width: width });
    };

    const handleFocus = () => {
        setActive(true);
        setDivMaxWidth("100%");
    }

    const handleBlur = () => {
        setDivMaxWidth("75%");
        setActive(false);
    }

    const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery));
    console.log(filteredTasks.length, filteredTasks)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                handleBlur();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchBarRef]);

    return (
        <div className='relative w-[95vw] lg:w-[400px] flex justify-center'>
            <motion.div
                ref={searchBarRef}
                className={`flex items-center justify-between bg-slate-800 ${active ? 'rounded-t-md' : 'rounded-md'} ring-1 ring-slate-600/50 shadow-sm px-3`}
                initial={{ width: "75%" }}
                animate={animationControls}
            >
                <input
                    type="text"
                    placeholder='Search for tasks...'
                    className='h-9 outline-none bg-transparent w-[99%]'
                    onClick={() => handleFocus()}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div><FaSearch /></div>

                {active && (
                    <div
                        className={`absolute z-10 top-full left-0 bg-slate-800 rounded-b-md ring-1 ring-slate-600/50 w-full flex flex-col items-center justify-center py-2 gap-2`}
                    >
                        {
                            filteredTasks.length && searchQuery ? filteredTasks.map(t => (
                                <div
                                    key={t.id}
                                    className='w-full px-2 duration-200 hover:brightness-75 hover:cursor-pointer'
                                    onClick={() => {
                                        setEditCard(t.id)
                                        handleBlur()
                                    }}
                                >
                                    <CardPreview title={t.title} labelId={t.labelId} />
                                </div>
                            )) : (
                                <div className='w-full px-2'>
                                    No results.
                                </div>
                            )
                        }
                    </div>
                )}
            </motion.div>
        </div>
    )
}