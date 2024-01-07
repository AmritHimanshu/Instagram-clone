import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../features/userSlice';
import Footer from '../Footer/Footer';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AddIcon from '@mui/icons-material/Add';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Logo from '../Images/InstagramTextLogo.png';

function Home() {

    const BASE_URL = "https://instagram-clone-api-six.vercel.app";
    // const BASE_URL = "http://localhost:5000";
    // const BASE_URL = "https://instagram-clone-1-api.onrender.com";

    const [posts, setPosts] = useState([]);
    const [showComment, setShowComment] = useState('');
    const [yourComment, setYourComment] = useState('');

    const user = useSelector(selectUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let limit = 3;
    let skip = 0;

    const openComment = (index) => {
        if (showComment !== index) setShowComment(index);
        else setShowComment('');
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

    const getPosts = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getAllPost?limit=${limit}&skip=${skip}`, {
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
                setPosts((posts) => [...posts, ...data]);
            }
        } catch (error) {
            // console.log("getPosts" + error);
        }
    }

    const handleScroll = () => {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            skip = skip + 3;
            getPosts();
        }
    }

    useEffect(() => {
        getData();
        getPosts();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])


    const likePost = async (postId) => {
        try {
            const res = await fetch(`${BASE_URL}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    postId: postId
                })
            });

            const data = await res.json();

            if (res.status !== 201 || !data) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                // For re-rendering the liked posts
                const newPost = posts.map((post) => {
                    if (post._id === data._id) return data;
                    else return post;
                })
                setPosts(newPost);
            }

        } catch (error) {
            // console.log(error);
        }
    }

    const unlikePost = async (postId) => {
        try {
            const res = await fetch(`${BASE_URL}/unlike`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    postId: postId
                })
            });

            const data = await res.json();

            if (res.status !== 201 || !data) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                // For re-rendering the liked posts
                const newPost = posts.map((post) => {
                    if (post._id === data._id) return data;
                    else return post;
                })
                setPosts(newPost);
            }

        } catch (error) {
            // console.log(error);
        }
    }

    const sendComment = async (e, postId) => {
        e.preventDefault();
        if (!yourComment) return;
        try {
            const res = await fetch(`${BASE_URL}/comment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    yourComment: yourComment,
                    postId: postId
                })
            });
            const data = await res.json();
            if (res.status !== 201 || !data) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                setYourComment('');
                const newPost = posts.map((post) => {
                    if (post._id === data._id) return data;
                    else return post;
                })
                setPosts(newPost);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const follow = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/following`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: id
                })
            });

            const data = await res.json();
            if (res.status !== 201) {
                console.log(data.error);
            }
            else {
                dispatch(login(data));
            }
        } catch (error) {
            console.log("follow ", error);
        }
    }


    return (
        <>
            {/* Header */}
            <div className='h-[93vh] max-w-[414px] overflow-y-scroll no-scrollbar'>
                <div className='p-3 flex items-center justify-between bg-black sticky top-[0px]'>
                    <div className='w-[35%]'><img src={Logo} alt="" /></div>
                    <div className='space-x-6'>
                        <FavoriteBorderOutlinedIcon style={{ fontSize: "30px" }} />
                        <SendOutlinedIcon style={{ fontSize: "30px" }} />
                    </div>
                </div>

                {/* Story Section */}
                <div className='p-3 w-[100%] overflow-x-scroll no-scrollbar border-b-[1px] border-neutral-700'>
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
                            <div className='flex items-center space-x-2' onClick={()=>navigate(`/profile/${post.postedBy._id}`)}>
                                <img src={post.postedBy.profilePic} alt="" className='w-[35px] h-[35px] rounded-full' />
                                <span className='font-bold'>{post.postedBy.username}</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <div className='py-2 px-3 text-white font-bold bg-neutral-80 border-[1px] rounded-xl' onClick={() => follow(post.postedBy._id)}>

                                    {
                                        user?.followings.some(following => (following.following === post.postedBy._id)) ? <div>Unfollow</div> : <div>Follow</div>
                                    }

                                </div>
                                <MoreVertOutlinedIcon />
                            </div>
                        </div>

                        <div>
                            <img src={post.photo} alt="" className='m-auto' />
                        </div>

                        <div className='p-3 flex items-center justify-between'>
                            <div className='space-x-5 flex items-center'>
                                {
                                    post?.likes.includes(user?._id) ? <FavoriteIcon style={{ fontSize: '30px', color: "red" }} onClick={() => { unlikePost(post._id) }} /> : <FavoriteBorderOutlinedIcon style={{ fontSize: '30px' }} onClick={() => { likePost(post._id) }} />
                                }

                                <ChatBubbleOutlineOutlinedIcon style={{ fontSize: '30px' }} onClick={() => openComment(index)} />

                                <SendOutlinedIcon style={{ fontSize: '30px' }} />
                            </div>
                            <div>
                                <BookmarkBorderOutlinedIcon style={{ fontSize: '30px' }} />
                            </div>
                        </div>

                        {showComment === index &&
                            <div className='text-start mb-2 px-2 py-5 border-neutral-700 border-y-[1px] bg-neutral-800'>
                                <div className='text-neutral-300'>comments</div>
                                <div className='py-2'>

                                    {post.comments?.map((comment, index) => (
                                        <div key={index} className='my-1 flex items-center space-x-2'>
                                            <div className='font-bold'>{comment.postedBy.username}</div>
                                            <div>{comment.comment}</div>
                                        </div>
                                    ))}

                                </div>

                                <div>
                                    <form action="" onSubmit={(e) => sendComment(e, post._id)} className='flex items-center justify-between space-x-1'>
                                        <input type="text" id="yourComment" value={yourComment} className='p-1 text-[16px] w-full outline-0 bg-black border-[1px] border-neutral-600 placeholder:text-[14px] placeholder:text-neutral-500' placeholder='Enter your comment' autoComplete='false' onChange={(e) => setYourComment(e.target.value)} />

                                        <button className='p-1'>Post</button>
                                    </form>
                                </div>
                            </div>
                        }

                        <div className='px-3 text-start'>
                            <div>{post.likes.length} likes</div>
                            <div><span className='font-bold mr-2'>{post.postedBy.username}</span>{post.caption}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default Home