// ! import methods and components and ...
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import { RxAvatar } from 'react-icons/rx'
import axios from 'axios'
import { server } from '../../server'

// ! Original component
const Signup = () => {
  // ? State Variables
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file)
  }

  const handlesubmit = () => {
    const config = { Headers: {"Content-Type":"multipart/form-data" }};
    const newForm = new FormData()


    newForm.append("file", avatar)
    newForm.append("name", name)
    newForm.append("email", email)
    newForm.append("password", password)

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  };


  // ? Page Elements
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handlesubmit}>
            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <div className='mt-1'>
                <input
                  type="text"
                  name="text"
                  autoComplete='name'
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='mt-1'>
                <input
                  type="email"
                  name="email"
                  autoComplete='email'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='relative mt-1'>
                <input
                  type={visible ? "password" : "text"}
                  name="password"
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                {
                  visible ? (
                    <AiOutlineEye
                      className='absolute cursor-pointer right-2 top-2'
                      size='25'
                      onClick={() => { setVisible(false) }}
                    />) : (
                    <AiOutlineEyeInvisible
                      className='absolute cursor-pointer right-2 top-2'
                      size='25'
                      onClick={() => { setVisible(true) }}
                    />
                  )
                }
              </div>
            </div>
            <div>
              <label htmlFor="avatar"
                className='block text-sm font-medium text-gray-700 '></label>
              <div className="flex items-center mt-2">
                <span className='inline-block w-8 h-8 overflow-hidden rounded-full'>
                  {
                    avatar ?
                      (
                        <img src={URL.createObjectURL(avatar)} alt="avatar" className='object-cover w-full h-full rounded-full' />
                      ) : (
                        <RxAvatar className='w-8 h-8' />)
                  }
                </span>
                <label htmlFor="file_input" className='flex items-center justify-center px-4 py-2 ml-5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200' >
                  <span> Upload a file </span>
                </label>
                <input
                  type="file"
                  name='avatar'
                  id='file_input'
                  accept='.jpg,.jpeg,.png'
                  onChange={handleFileInputChange}
                  className='sr-only'
                />
              </div>
            </div>


            <div className="">
              <button type="submit"
                className='relative w-full h-[40] group flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 '>
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to='/login' className='pl-2 text-blue-600'>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;