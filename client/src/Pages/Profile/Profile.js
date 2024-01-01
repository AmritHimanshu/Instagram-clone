import React, { useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import GridOnIcon from '@mui/icons-material/GridOn';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../Footer/Footer';

function Profile() {

    const [storyStatus, setStoryStatus] = useState(true);

    const [postStatus, setPostStatus] = useState('posts');

    const [imagePreview, setImagePreview] = useState(null);
    const [profilePicOption, setProfilePicOption] = useState(false);
    const [profileUrl, setProfileUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const storyArrow = () => {
        if (storyStatus) setStoryStatus(false);
        else setStoryStatus(true);
    }

    const viewProfileImage = (imageUrl) => {
        setProfilePicOption(false);
        setImagePreview(imageUrl);
    }

    const handleFileChange = (e) => {
        setProfilePicOption(false);
        const file = e.target.files[0];

        if (file) {
            displaySelectedImage(file);
        }
    };

    const displaySelectedImage = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className='h-[93vh] overflow-x-scroll no-scrollbar'>
                {/* Profile header */}
                <div className='p-3 flex items-center justify-between'>
                    <div className='text-[19px] font-bold flex items-center'>himanshu_the_heart_hacker <KeyboardArrowDownIcon /></div>
                    <div className='border-2 rounded-lg'><AddIcon /></div>
                    <div><MenuIcon style={{ fontSize: '40px' }} /></div>
                </div>

                {/* Profile Section */}
                <div className='p-5'>
                    <div className='grid grid-rows-1 grid-cols-4 place-items-center'>
                        <div className='w-[90px] h-[90px] rounded-full overflow-hidden'>
                            <img src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61NRxcV4VML.jpg" alt="" className='w-full h-full rounded-full' onClick={() => { setProfilePicOption(true); setProfileUrl('https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61NRxcV4VML.jpg')}} />
                        </div>
                        <div>
                            <div className='font-bold'>1</div>
                            <div className='text-[15px]'>Posts</div>
                        </div>
                        <div>
                            <div className='font-bold'>157</div>
                            <div className='text-[15px]'>Followers</div>
                        </div>
                        <div>
                            <div className='font-bold'>28</div>
                            <div className='text-[15px]'>Following</div>
                        </div>
                    </div>

                    <div className='text-start mt-4'>
                        <div className='font-bold'>Singh Sahab</div>
                        <div className='text-[15px]'>still living on mom's pocket money</div>
                        <div className='text-[15px]'>----- selectively social -----</div>
                        <div className='text-[15px]'>can't change people, so I changed how I f*ck with them.</div>
                    </div>

                    <div className='mt-4 flex items-center justify-evenly'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg cursor-pointer'>Edit profile</div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg cursor-pointer'>Share profile</div>
                        <div className='px-3 py-2 bg-neutral-800 rounded-lg cursor-pointer'><PersonAddIcon /></div>
                    </div>
                </div>

                {/* Story highlights section */}
                <div className='text-start'>
                    <div className='py-2 px-5 flex justify-between'>
                        <div>
                            <div className='text-[15px] font-bold'>Story highlights</div>
                            {storyStatus && <div className='text-[15px]'>Keep your favorite stories on your profile</div>}
                        </div>
                        {storyStatus ? <div><KeyboardArrowUpIcon onClick={storyArrow} /></div> : <div><KeyboardArrowDownIcon onClick={storyArrow} /></div>}
                    </div>
                    {storyStatus && <div className='w-[100%] overflow-x-scroll no-scrollbar'>
                        <div className='py-3 px-2 flex space-x-3 min-w-max'>
                            <div className='text-center'>
                                <div className='w-[80px] h-[80px] rounded-full border-[1px] flex items-center justify-center'><AddIcon style={{ fontSize: '40px' }} /></div>
                                <div className='mt-1'>New</div>
                            </div>
                            <div className='w-[80px] h-[80px] rounded-full bg-neutral-800'></div>
                            <div className='w-[80px] h-[80px] rounded-full bg-neutral-800'></div>
                            <div className='w-[80px] h-[80px] rounded-full bg-neutral-800'></div>
                            <div className='w-[80px] h-[80px] rounded-full bg-neutral-800'></div>
                        </div>
                    </div>}
                </div>

                {/* Post and reels section */}
                <div className='mt-5'>
                    <div className='grid grid-rows-1 grid-cols-2'>
                        <div className={`py-3 ${postStatus === 'posts' && 'border-b-2'}`} onClick={() => setPostStatus('posts')}><GridOnIcon style={{ fontSize: '30px' }} /></div>
                        <div className={`py-3 ${postStatus === 'reels' && 'border-b-2'}`} onClick={() => setPostStatus('reels')}><AssignmentIndOutlinedIcon style={{ fontSize: '35px' }} /></div>
                    </div>
                    {postStatus === 'posts' && <div className='mt-1 grid grid-cols-3 gap-1'>
                        <div><img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" /></div>
                        <div><img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="" /></div>
                        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7RiVZS_4KTNqwEJi-YQxPg99li-eoDuafYZCcCuCW1Ayj2D3Izsx0d_xm3UfuaCinGeM&usqp=CAU" alt="" /></div>
                    </div>}
                </div>
            </div>

            {/* Profile pic option */}
            {profilePicOption && <div className='h-[93vh] w-[100%] backdrop-blur-md absolute'>
                <div className='h-[20vh] absolute bottom-10 w-[100%] bg-black flex flex-col items-center justify-center'>
                    <div className='w-[100%] p-2 text-end' onClick={() => setProfilePicOption(false)}>
                        <CloseIcon />
                    </div>
                    <div className='space-y-5'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold' onClick={() => viewProfileImage(profileUrl)}>Preview Profile pic</div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold'>
                            <label htmlFor="fileInput">Change Profile pic</label>
                            <input type="file" id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
            </div>}

            {/* Previewing profile pic */}
            {imagePreview &&
                <div className='h-[93vh] absolute backdrop-blur-xl flex flex-col items-center justify-center'>
                    <div className='w-[100%] p-2 text-end' onClick={() => setImagePreview(null)}>
                        <CloseIcon />
                    </div>
                    <div>
                        <img src={imagePreview} alt="" />
                    </div>
                </div>
            }

            {/* Previewing selected image file */}
            {selectedImage &&
                <div className='h-[93vh] absolute backdrop-blur-xl flex flex-col items-center justify-center'>
                    <div className='w-[100%] p-2 text-end' onClick={() => setSelectedImage(null)}>
                        <CloseIcon />
                    </div>
                    <div>
                        <img src={selectedImage} alt="" />
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default Profile