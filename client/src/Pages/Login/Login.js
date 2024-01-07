import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from '../Images/InstagramTextLogo.png'

function Login() {

    const BASE_URL = "https://instagram-clone-1-api.onrender.com";
    // const BASE_URL = "http://localhost:5000";

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '', password: ''
    })

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const callLogOut = async () => {
        try {
            const res = await fetch(`${BASE_URL}/logout`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', // For cookies
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // For tokens
            });

            const data = await res.json();

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        callLogOut();
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        if (!email || !password) return window.alert("Fill all the fields");

        const res = await fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();

        if (res.status === 400 || !data) window.alert(`${data.error}`);
        else if (res.status === 422) window.alert(`${data.error}`);
        else {
            window.alert("Signin successfully");
            navigate('/');
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
                        <input type="text" id="email" name='email' value={user.email} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Phone number, email or username' autoComplete='false' onChange={handleOnChange} />
                        <input type="password" id="password" name='password' value={user.password} className='p-4 text-[16px] text-white bg-neutral-700 bg-opacity-60 rounded-md outline-0 placeholder:text-neutral-500' placeholder='Password' autoComplete='false' onChange={handleOnChange} />
                        <button type='submit' className='p-4 text-[16px] font-bold bg-blue-950 opacity-80 rounded-lg'>Log in</button>
                    </form>

                    <div className='my-4 text-[14px]'>Forgot your login details? <span className='text-white font-bold'>Get help logging in.</span></div>
                </div>

                <div className='w-[100%] pt-2 border-t-[2px] border-neutral-700'>Don't have an account? <Link to="/register"><span className='text-white font-bold'>Sign up.</span></Link></div>
            </div>
        </>
    )
}

export default Login