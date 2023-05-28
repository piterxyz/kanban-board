import { FaSearch } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Results from './Results';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isResultsOpen, setResultsOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = () => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setResultsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchRef])

    return (
        <div className='relative w-[95vw] md:w-[300px] flex justify-center'>
            <div
                ref={searchRef} 
                className={`w-full flex items-center justify-between bg-slate-800 ${isResultsOpen ? 'rounded-t-md' : 'rounded-md'} ring-1 ring-slate-600/50 shadow-sm px-3`}
            >
                <input
                    type="text"
                    placeholder='Search for cards...'
                    className='h-9 outline-none bg-transparent w-[99%] peer'
                    onFocus={() => setResultsOpen(true)}
                    onChange={(e) => setSearchQuery(e.target.value.trim())}
                />
                <div><FaSearch /></div>
                {isResultsOpen && <Results query={searchQuery} setResultsOpen={setResultsOpen} />}
            </div>
        </div>
    )
}