import SearchBar from "./SearchBar"

export default function Navbar() {
    return (
        <div className='top-0 w-full backdrop-blur flex-none transition-colors duration-500 lg:border-b lg:border-slate-50/[0.06] bg-transparent supports-backdrop-blur:bg-white/60'>
            <div className='flex flex-col gap-2 items-center justify-around py-3 lg:flex-row lg:gap-0'>
                <h1 className="text-2xl font-semibold text-white">Kanban Board</h1>
                <SearchBar />
            </div>
        </div>
    )
}