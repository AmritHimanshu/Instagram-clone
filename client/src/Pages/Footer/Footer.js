import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

function Footer() {

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const user = useSelector(selectUser);

    return (
        <div className='py-3 px-1 flex items-center justify-between border-t-[1px] border-neutral-700'>
            <div><NavLink to="/">{pathname === "/" ? <HomeIcon style={{ fontSize: "40px" }} /> : <HomeOutlinedIcon style={{ fontSize: "40px" }} /> }</NavLink></div>
            <div><SearchOutlinedIcon style={{ fontSize: "40px" }} /></div>
            <div className='border-2 rounded-lg max-w-min'><AddIcon style={{ fontSize: "30px" }} onClick={() => navigate('/uploadPost')} /></div>
            <div><SlideshowOutlinedIcon style={{ fontSize: "40px" }} /></div>
            <NavLink to="/profile"><div className={`w-[40px] h-[40px] border-2 rounded-full overflow-hidden ${pathname === "/profile" ? 'border-2' : ''}`}>
                {user?.profilePic &&
                    <img src={user?.profilePic} alt="" className='w-[40px] h-[40px]' />}
            </div></NavLink>
        </div>
    )
}

export default Footer