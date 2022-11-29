import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const Row = ({ title, facthUrl, uId }) => {

      const [movies, setMovies] = useState([]);

      useEffect(()=>{
            axios.get(facthUrl).then((response)=>{
                  setMovies(response.data.results)
            }).catch((err)=>{
                  console.log(err)
            })            
      }, [facthUrl])

      const slideLeft = () => {
            var slider = document.getElementById('slider' + uId);
            slider.scrollLeft = slider.scrollLeft - 500;
      }

      const slideRight = () => {
            var slider = document.getElementById('slider' + uId);
            slider.scrollLeft = slider.scrollLeft + 500;
      }

  return (
      <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className="relative flex items-center group">
                  <BsArrowLeftShort 
                        onClick={slideLeft}
                        size={40} 
                        className='bg-white opacity-50 hover:opacity-100 cursor-pointer rounded-full absolute left-0 z-50 hidden group-hover:block' 
                  />
                  <div id={'slider' + uId} className="w-full h-full overflow-y-hidden overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth relative">
                        {movies.map((item, id) => (
                              <Movie key={id} item={item} />
                        ))}
                  </div>
                  <BsArrowRightShort 
                        onClick={slideRight}
                        size={40} 
                        className='bg-white opacity-50 hover:opacity-100 cursor-pointer rounded-full absolute right-0 z-50 hidden group-hover:block' 
                  />
            </div>
      </>
  )
}

export default Row