import React from 'react';
import Movie from './Movie';
import { MdOutlineCancel } from 'react-icons/md';

const SearchBar = ({searchFilter, setSearch}) => {
  
  return (
    <div className='pt-[98px]'>
    <div className="text-white pb-2">
      <button 
        className='flex items-center sm:ml-4 md:ml-5 hover:text-red-500 transition 
        ease-in-out delay-150 duration-300'
        onClick={() => setSearch("")}
      >
        <MdOutlineCancel />
        Clear search
      </button>
    </div>
      <div className='flex items-center justify-center flex-wrap'>
                  {searchFilter.map((item, id)=> (
                        <Movie item={item} key={id} />
                  ))}
    </div>
    </div>
  )
}

export default SearchBar