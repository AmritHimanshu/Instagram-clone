import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from '../Images/InstagramTextLogo.png';

function Register() {

    const BASE_URL = "https://instagram-clone-1-api.onrender.com";
    // const BASE_URL = "http://localhost:5000";

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '', username: '', name: '', phone: '', password: '', cpassword: ''
    })

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const { email, username, name, phone, password, cpassword } = user;
        if (!email || !username || !name || !phone || !password || !cpassword) {
            return window.alert("Fill all the fields");
        }
        if (password !== cpassword) {
            return window.alert("Password and Confirm password not match");
        }
        // // https://instagram-clone-1-api.onrender.com
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, username, name, phone, password, cpassword
            })
        })

        const data = await res.json();
        if (res.status === 422 || !data) window.alert(`${data.error}`);
        else {
            window.alert(`${data.message}`);
            navigate('/login');
            window.location.reload();
        }
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
                        <input type="email" id="email" name='email' value={user.email} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Email' autoComplete='false' onChange={handleOnChange} />
                        <input type="text" id="username" name='username' value={user.username} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='username' autoComplete='false' onChange={handleOnChange} />
                        <input type="text" id="name" name='name' value={user.name} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='name' autoComplete='false' onChange={handleOnChange} />
                        <input type="text" id="phone" name='phone' value={user.phone} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Phone number' autoComplete='false' onChange={handleOnChange} />
                        <input type="text" id="password" name='password' value={user.password} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Password' autoComplete='false' onChange={handleOnChange} />
                        <input type="password" id="cpassword" name='cpassword' value={user.cpassword} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Confirm Password' autoComplete='false' onChange={handleOnChange} />
                        <button type='submit' className='p-4 text-[16px] font-bold bg-blue-950 opacity-80 rounded-lg'>Register now</button>
                    </form>
                </div>

                <div className='w-[100%] pt-2 border-t-[2px] border-neutral-700'>Already have an account? <Link to="/login"><span className='text-white font-bold'>Sign in.</span></Link></div>
            </div>
        </>
    )
}

export default Register