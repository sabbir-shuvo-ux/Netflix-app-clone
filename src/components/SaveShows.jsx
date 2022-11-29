import React, {useState, useEffect} from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from "react-icons/ai"
import { error } from '../utils/Notification';

const SaveShows = () => {

      const [movies, setMovies] = useState([]);
      const { user } = UserAuth();

      const slideLeft = () => {
            var slider = document.getElementById('slider');
            slider.scrollLeft = slider.scrollLeft - 500;
      }

      const slideRight = () => {
            var slider = document.getElementById('slider');
            slider.scrollLeft = slider.scrollLeft + 500;
      }

      useEffect(() => {
            onSnapshot(doc(db, 'user', `${user?.email}`), (doc)=>{
                  setMovies(doc.data()?.savedShows);
            })
      }, [user?.email])

      const movieRef = doc(db, 'user', `${user?.email}`);
      const deleteShow = async (passedId) => {
            error("Successfully Deleted")
        try {
            const result = movies.filter((item) => item.id !== passedId);
            await updateDoc(movieRef, {
                  savedShows: result,
            })
        } catch(err) {
            console.log(err)
        }
      }


  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
            <div className="relative flex items-center group">
                  <BsArrowLeftShort 
                        onClick={slideLeft}
                        size={40} 
                        className='bg-white opacity-50 hover:opacity-100 cursor-pointer rounded-full absolute left-0 z-50 hidden group-hover:block' 
                  />
                  <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth relative">
                        {movies.map((item, id) => (
                              <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                              <img
                                    className='w-full h-auto block'
                                    src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                                    alt={item?.title}
                              />
                              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                              <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                    {item?.title}
                              </p>
                              <p 
                                    onClick={()=> deleteShow(item.id)}
                                    className='text-gray-300 absolute top-4 right-4'
                              > 
                                    <AiOutlineClose /> 
                              </p>
                              </div>
                        </div>
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

export default SaveShows