// ! import methods and components and ...
import React,{ useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import styles from '../../styles/styles'
import {Link} from 'react-router-dom'

// ! Original component
const Login = () => {
    // ? State Variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [visible, setVisible] = useState(false);
    // ? Page Elements
    return (
        <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                    Login to your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    value=''
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
                        <div className={`${styles.noramlFlex} justify-between`}>
                            <div className={`${styles.noramlFlex}`}>
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    className='w-4 h-4 text-blue-600 border-gray-500 rounded focus:ring-blue-500'
                                />
                                <label htmlFor="remember-me" className='block ml-2 text-sm text-gray-900'>
                                    Remember me
                                </label>
                            </div>
                            <div className='text-sm'>
                                <a
                                    className='font-medium text-blue-600 hover:text-blue-500'
                                    href=".forgot-password"
                                >
                                    Forgot your Password
                                </a>
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
                            <Link to='/sign-up' className='pl-2 text-blue-600'>
                            Sign Up
                            </Link>                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;