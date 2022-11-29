import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { info } from '../utils/Notification';
import { BiSearchAlt } from 'react-icons/bi';

const Navbar = ({setSearch, search}) => {

  const [ishidden, setIshidden] = useState(true);

  const {user, logOut} = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await logOut(); 
      info("Your Logout")
      navigate('/')
    } catch(error){
      console.log(error)
    }
  }

  const handleShow = () => {
    
    setIshidden(!ishidden);
  }

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>Netflix</h1>
      </Link>

      <div className='flex items-center relative'>
        {
          user?.email && <BiSearchAlt 
          onClick={handleShow}
          className='block sm:hidden text-white text-xl cursor-pointer mr-4' 
        />
        }
        {
         user?.email && <input 
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            type="text" 
            placeholder='Search...' 
            className='text-white placeholder-white p-2 my-2 border-red-600 border-[1px] bg-transparent rounded outline-none mr-2 hidden sm:block' 
          />
        }
        {
         user?.email && <input 
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            type="text" 
            placeholder='Search...' 
            className={ishidden ? 'text-white placeholder-white p-2 my-2 border-red-600 border-[1px] bg-transparent rounded outline-none mr-2 hidden' : 'block sm:hidden absolute left-0 top-12 text-white placeholder-white p-2 my-2 border-red-600 border-[1px] bg-transparent rounded outline-none'} 
          />
        }
            {
              !user ? (
                <>
                  <Link to='/login'>
                    <button className='text-white pr-4'>Sign In</button>
                  </Link>
                  <Link to='/signup'>
                    <button className='bg-red-600 text-white px-6 py-2 rounded cursor-pointer'>Sign Up</button>
                  </Link>
                </>
              ):(
                <>
                <Link to='/account'>
                  <button 
                    className='text-white pr-4'
                  >
                    Account
                  </button>
                </Link>
                  <button
                    onClick={handleLogout}
                    className='bg-red-600 text-white px-6 py-2 rounded cursor-pointer'>Sign Out</button>
                </>
              )
            }
      </div>
    </div>
  )
}

export default Navbar