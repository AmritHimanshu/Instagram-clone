import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
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

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [storyStatus, setStoryStatus] = useState(true);
    const [postStatus, setPostStatus] = useState('posts');
    const [profilePic, setProfilePic] = useState(null);
    const [posts, setPosts] = useState();

    const user = useSelector(selectUser);

    const navigate = useNavigate();

    const storyArrow = () => {
        if (storyStatus) setStoryStatus(false);
        else setStoryStatus(true);
    }

    const getData = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getData`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Include cookies in the request
            });

            if (res.status !== 200) {
                navigate('/login');
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const userPost = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getPost`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Include cookies in the request
            });

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            // console.log("UserPost" + error);
        }
    }

    useEffect(() => {
        getData();
        userPost();
    }, [])

    return (
        <>
            <div className='h-[92vh] overflow-x-scroll no-scrollbar'>
                {/* Profile header */}
                <div className='p-3 flex items-center justify-between'>
                    <div className='text-[19px] font-bold flex items-center cursor-default'>{user?.username} {user && <KeyboardArrowDownIcon />}</div>
                    <div className='flex items-center space-x-5'>
                        <div className='w-[30px] h-[30px] border-2 rounded-lg cursor-pointer'><AddIcon onClick={() => navigate('/uploadPost')} /></div>
                        <div><MenuIcon style={{ fontSize: '40px', cursor: 'pointer' }} onClick={() => navigate('/login')} /></div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className='p-5'>
                    <div className='grid grid-rows-1 grid-cols-4 place-items-center'>
                        <div className='w-[90px] h-[90px] border-2 rounded-full overflow-hidden'>
                            {user?.profilePic &&
                                <img
                                    src={user?.profilePic}
                                alt="" className='object-contain aspect-square rounded-full cursor-pointer' onClick={() => setProfilePic(user?.profilePic)} />}
                        </div>
                        <div>
                            <div className='font-bold'>{posts?.length}</div>
                            <div className='text-[15px]'>Posts</div>
                        </div>
                        <div>
                            <div className='font-bold'>{user?.followers.length}</div>
                            <div className='text-[15px]'>Followers</div>
                        </div>
                        <div>
                            <div className='font-bold'>{user?.followings.length}</div>
                            <div className='text-[15px]'>Following</div>
                        </div>
                    </div>

                    <div className='text-start mt-4'>
                        <div className='font-bold'>{user?.name}</div>
                        <div className='text-[15px] w-[50%]'>{user?.bio}</div>
                    </div>

                    <div className='mt-4 flex items-center justify-evenly'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg cursor-pointer' onClick={() => navigate('/edit-profile')}>Edit profile</div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg'>Share profile</div>
                        <div className='px-3 py-2 bg-neutral-800 rounded-lg'><PersonAddIcon /></div>
                    </div>
                </div>

                {/* Story highlights section */}
                <div className='text-start'>
                    <div className='py-2 px-5 flex justify-between'>
                        <div>
                            <div className='text-[15px] font-bold'>Story highlights</div>
                            {storyStatus && <div className='text-[15px]'>Keep your favorite stories on your profile</div>}
                        </div>
                        {storyStatus ? <div><KeyboardArrowUpIcon style={{ cursor: 'pointer' }} onClick={storyArrow} /></div> : <div><KeyboardArrowDownIcon style={{ cursor: 'pointer' }} onClick={storyArrow} /></div>}
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
                        <div className={`py-3 ${postStatus === 'posts' && 'border-b-2'}`} onClick={() => setPostStatus('posts')}><GridOnIcon style={{ fontSize: '30px', cursor: 'pointer' }} /></div>
                        <div className={`py-3 ${postStatus === 'reels' && 'border-b-2'}`} onClick={() => setPostStatus('reels')}><AssignmentIndOutlinedIcon style={{ fontSize: '35px', cursor: 'pointer' }} /></div>
                    </div>
                    {postStatus === 'posts' && <div className='mt-1 grid grid-cols-3 gap-1'>

                        {posts?.map((post, index) => (
                            <div key={index} className='cursor-pointer' onClick={() => navigate('/viewMyPosts')}>
                                <img src={post.photo} alt="" className='object-contain aspect-square' />
                            </div>
                        ))}

                    </div>}
                </div>
            </div>

            {/* Previewing profile pic */}
            {profilePic &&
                <div className='h-[92vh] w-[100%] absolute backdrop-blur-xl flex flex-col items-center justify-center space-y-3'>
                    <div className='w-[100%] p-2 text-end' onClick={() => setProfilePic(null)}>
                        <CloseIcon style={{ cursor: 'pointer' }} />
                    </div>
                    <div>
                        <img src={profilePic} alt="" />
                    </div>
                </div>
            }

            <div>
                <Footer />
            </div>
        </>
    )
}

export default Profile