import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

function Footer() {

    const { pathname } = useLocation();

    return (
        <div className='py-3 grid grid-rows-1 grid-cols-5 place-items-center border-t-[1px] border-neutral-700'>
            <div><NavLink to="/">{pathname === "/" ? <HomeIcon style={{ fontSize: "40px" }} /> : <HomeOutlinedIcon style={{ fontSize: "40px" }} /> }</NavLink></div>
            <div><SearchOutlinedIcon style={{ fontSize: "40px" }} /></div>
            <div className='border-2 rounded-lg max-w-min'><AddIcon style={{ fontSize: "30px" }} /></div>
            <div><SlideshowOutlinedIcon style={{ fontSize: "40px" }} /></div>
            <NavLink to="/profile"><div className={`w-[40px] h-[40px] rounded-full overflow-hidden ${pathname === "/profile"?'border-2':''}`}><img src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61NRxcV4VML.jpg" alt="" className='w-[40px] h-[40px]' /></div></NavLink>
        </div>
    )
}

export default Footer