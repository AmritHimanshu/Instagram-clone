import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Footer from '../Footer/Footer';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AddIcon from '@mui/icons-material/Add';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Logo from '../Images/InstagramTextLogo.png';

function Home() {

    const [posts, setPosts] = useState();

    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const getPosts = async () => {
        try {
            const res = await fetch('/getAllPost', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                const data = await res.json();
                setPosts(data.reverse());
            }
        } catch (error) {
            console.log("getPosts" + error);
        }
    }

    useEffect(() => {
        // if (!user) navigate('/login');
        getPosts();
    }, [])

    return (
        <>
            {/* Header */}
            <div className='h-[93vh] overflow-x-scroll no-scrollbar'>
                <div className='p-3 flex items-center justify-between bg-black sticky top-[0px]'>
                    <div className='w-[35%]'><img src={Logo} alt="" /></div>
                    <div className='space-x-6'>
                        <FavoriteBorderOutlinedIcon style={{ fontSize: "30px" }} />
                        <SendOutlinedIcon style={{ fontSize: "30px" }} />
                    </div>
                </div>

                {/* Story Section */}
                <div className='p-3 w-[100vw] overflow-x-scroll no-scrollbar border-b-[1px] border-neutral-700'>
                    <div className='flex space-x-4 min-w-max'>
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] rounded-full border-[1px] flex items-center justify-center'><AddIcon style={{ fontSize: '40px' }} /></div>
                            <div className='mt-1'>New</div>
                        </div>

                        <div className='w-[100px] flex flex-col items-center'>
                            <div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
                                <img src="https://www.indiafilings.com/learn/wp-content/uploads/2023/03/Can-a-single-person-own-a-firm-in-India.jpg" alt="" className='w-[80px] h-[80px]' />
                            </div>
                            <div className='mt-1 text-[14px]'>shalinikumar231</div>
                        </div>

                        <div className='w-[100px] flex flex-col items-center'>
                            <div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
                                <img src="https://img.freepik.com/free-photo/photo-joyful-dark-skinned-woman-dances-carefree-keeps-fists-raised-looks-positively-aside-dressed-casual-jumper-moves_273609-45244.jpg" alt="" className='w-[80px] h-[80px]' />
                            </div>
                            <div className='mt-1 text-[14px]'>mech_queen_</div>
                        </div>

                        <div className='w-[100px] flex flex-col items-center'>
                            <div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
                                <img src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/04/GettyImages-659856561_header-1024x575.jpg?w=1155&h=1528" alt="" className='w-[80px] h-[80px]' />
                            </div>
                            <div className='mt-1 text-[14px]'>ezsnippet</div>
                        </div>

                        <div className='w-[100px] flex flex-col items-center'>
                            <div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
                                <img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className='w-[80px] h-[80px]' />
                            </div>
                            <div className='mt-1 text-[14px]'>tanii_official</div>
                        </div>
                    </div>
                </div>

                {/* Post Section */}
                {posts?.map((post, index) => (
                    <div key={index} className='my-3'>
                        <div className='p-3 flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <img src={post.postedBy.profilePic} alt="" className='w-[35px] h-[35px] rounded-full' />
                                <span className='font-bold'>{post.postedBy.username}</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <div className='py-2 px-3 text-white font-bold bg-neutral-80 border-[1px] rounded-xl'>Follow</div>
                                <MoreVertOutlinedIcon />
                            </div>
                        </div>

                        <div>
                            <img src={post.photo} alt="" className='m-auto' />
                        </div>

                        <div className='p-3 flex items-center justify-between'>
                            <div className='space-x-5'>
                                <FavoriteBorderOutlinedIcon style={{ fontSize: '30px' }} />
                                <ChatBubbleOutlineOutlinedIcon style={{ fontSize: '30px' }} />
                                <SendOutlinedIcon style={{ fontSize: '30px' }} />
                            </div>
                            <div>
                                <BookmarkBorderOutlinedIcon style={{ fontSize: '30px' }} />
                            </div>
                        </div>

                        <div className='px-3 text-start'>
                            <div>48,185 likes</div>
                            <div><span className='font-bold mr-2'>Vikash</span>{post.caption}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default Home