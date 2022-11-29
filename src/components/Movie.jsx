import React, {useState} from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {db} from "../firebase";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from "../context/AuthContext"
import { error, success } from '../utils/Notification';
import { useNavigate } from 'react-router-dom';

const Movie = ({item}) => {

      const [like, setLike] = useState(false);
      const { user } = UserAuth();
      const navigate = useNavigate();

      const movieID = doc(db, 'user', `${user?.email}`);
      const saveShow = async () => {
            if(user?.email){
                  setLike(true);
                  await updateDoc(movieID, {
                        savedShows: arrayUnion({
                              id: item.id,
                              title: item.title,
                              img: item.backdrop_path
                        })
                  })
                  success("Successfully added to favorites")
            }else{
                  navigate('/login');
                  error('Login first for add list')
            }
      }

  return (
      <>
      <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
            <img
                  className='w-full h-auto block'
                  src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                  alt={item?.title}
            />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
            <p className='whitespace-normal flex-col gap-2 text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
            </p>
            <p onClick={saveShow}>
            {like ? (
                  <FaHeart className='absolute top-4 left-4 text-gray-300' />
            ) : (
                  <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
            )}
            </p>
            </div>
      </div>
      </>
  )
}

export default Movie