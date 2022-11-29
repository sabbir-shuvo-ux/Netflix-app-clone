import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BiLoader } from 'react-icons/bi';
import { success } from '../utils/Notification';

const Login = () => {

      const [email, setEmail] = useState('');
      const [error, setError] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      const { logIn } = UserAuth();

      const wrongPass = "Firebase: Error (auth/wrong-password).";
      const wrongEmail = "Firebase: Error (auth/user-not-found).";
      

      const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                  setLoading(true)
              await logIn(email, password);
              navigate('/');
              success("Hello there, Wellcome back!")
            } catch(error) {
              if(wrongEmail === error.message){
                  setError("Email is incorrect");
              }else if(wrongPass === error.message) {
                  setError("Password is incorrect")
              }else{
                  setError(error.message)
              };
              setLoading(false);
            }
          }

  return (
      <div className='w-full h-screen'>
      <img
        className='hidden sm:block absolute w-full h-full object-cover'
        src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
        alt='/'
      />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
      <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-auto mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            {error? <p className='p-2 mt-2 bg-red-400 text-white'>{error}</p> : ""}
            <form 
                  onSubmit={handleSubmit}
                  className='w-full flex flex-col py-4'>
              <input
                  onChange={(e) => setEmail(e.target.value)}
                className='p-3 my-2 bg-gray-700 rouded outline-none'
                type='email'
                placeholder='Email'
                autoComplete='email'
              />
              <input
              onChange={(e) => setPassword(e.target.value)}
                className='p-3 my-2 bg-gray-700 rouded outline-none'
                type='password'
                placeholder='Password'
                autoComplete='current-password'
              />
              <button 
                disabled={loading}
                className='bg-red-600 py-3 my-6 flex justify-center items-center rounded font-bold text-center'>
                  {
                        loading ? <BiLoader /> : "Sign In"
                  }
              </button>
              <div className='flex justify-between items-center text-sm text-gray-600'>
                <p>
                  <input className='mr-2' type='checkbox' />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className='py-8'>
                <span className='text-gray-600'>New to Netflix?</span>{' '}
                <Link to='/signup'>
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login