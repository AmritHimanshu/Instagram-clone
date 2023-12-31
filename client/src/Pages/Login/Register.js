import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from '../Images/InstagramTextLogo.png';
import { Link } from 'react-router-dom';

function Register() {

    const [user, setUser] = useState({
        email: '', username: '', phone:'', password: '', cpassword:''
    })

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const submitForm = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className='py-3 h-[100vh] flex flex-col items-center justify-between text-neutral-400'>
                <div className='text-lg'>English (United States) <KeyboardArrowDownIcon /></div>

                <div className='w-[80%]'>
                    <div className='mb-5'>
                        <img src={Logo} alt="" className='w-[58%] m-auto' />
                    </div>

                    <form action="" onSubmit={submitForm} className='flex flex-col space-y-5'>
                        <input type="email" name='email' value={user.email} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Email' onChange={handleOnChange} />
                        <input type="text" name='username' value={user.username} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='username' onChange={handleOnChange} />
                        <input type="text" name='phone' value={user.phone} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Phone number' onChange={handleOnChange} />
                        <input type="text" name='password' value={user.password} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Password' onChange={handleOnChange} />
                        <input type="password" name='cpassword' value={user.cpassword} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Confirm Password' onChange={handleOnChange} />
                        <button type='submit' className='p-4 text-[16px] font-bold bg-blue-950 opacity-80 rounded-lg'>Log in</button>
                    </form>
                </div>

                <div className='w-[100%] pt-2 border-t-[2px] border-neutral-700'>Already have an account? <Link to="/login"><span className='text-white font-bold'>Sign in.</span></Link></div>
            </div>
        </>
    )
}

export default Register