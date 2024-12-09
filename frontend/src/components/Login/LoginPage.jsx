import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [visible, setVisible] = useState(false);
    return (
        <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                    Login to your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6">
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
                                        /> ) :  (
                                        <AiOutlineEyeInvisible
                                            className='absolute cursor-pointer right-2 top-2'
                                            size='25'
                                            onClick={() => { setVisible(true) }}
                                        />
                                )
                               }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;