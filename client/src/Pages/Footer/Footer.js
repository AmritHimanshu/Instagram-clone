import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

function Footer() {
    return (
        <div className='py-2 grid grid-rows-1 grid-cols-5 place-items-center'>
            <div><HomeOutlinedIcon style={{ fontSize: "40px" }} /></div>
            <div><SearchOutlinedIcon style={{ fontSize: "40px" }} /></div>
            <div className='border-2 rounded-lg max-w-min'><AddIcon style={{ fontSize: "30px" }} /></div>
            <div><SlideshowOutlinedIcon style={{ fontSize: "40px" }} /></div>
            <div className='w-[40px] h-[40px] rounded-full border-2 overflow-hidden'><img src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61NRxcV4VML.jpg" alt="" className='w-[40px] h-[40px]' /></div>
        </div>
    )
}

export default Footer