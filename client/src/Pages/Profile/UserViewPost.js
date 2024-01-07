import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Footer from '../Footer/Footer';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

function UserViewPost() {

    const BASE_URL = "https://instagram-clone-1-api.onrender.com";
    // const BASE_URL = "http://localhost:5000";

    const [showComment, setShowComment] = useState('');
    const [yourComment, setYourComment] = useState('');
    const [posts, setPosts] = useState([]);

    const user = useSelector(selectUser);

    const { userId } = useParams();

    const navigate = useNavigate();

    const openComment = (index) => {
        if (showComment !== index) setShowComment(index);
        else setShowComment('');
    }

    const getData = async () => {
        // https://instagram-clone-1-api.onrender.com
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
        // https://instagram-clone-1-api.onrender.com
        try {
            const res = await fetch(`${BASE_URL}/getUserPost/${userId}`, {
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
            // console.log("UserPost" + error);
        }
    }

    useEffect(() => {
        getData();
        userPost();
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


    return (
        <>
            <div className='h-[92vh] bg-black overflow-y-scroll no-scrollbar'>
                {/* Header */}
                <div className='p-3 bg-black flex items-center justify-between sticky top-[0px]'>
                    <div className='text-[19px] font-bold flex items-center'>
                        <KeyboardBackspaceIcon style={{ fontSize: '35px', marginRight: "10px", cursor: "pointer" }} onClick={() => navigate(`/profile/${userId}`)} />
                        Posts
                    </div>
                </div>

                {/* Posts section */}
                {posts?.map((post, index) => (
                    <div key={index} className='my-3'>
                        <div className='p-3 flex items-center justify-between'>
                            <div className='flex items-center space-x-2 cursor-pointer'>
                                <img src={post.postedBy.profilePic} alt="" className='w-[35px] h-[35px] rounded-full' />
                                <span className='font-bold'>{post.postedBy.username}</span>
                            </div>
                        </div>

                        <div>
                            <img src={post.photo} alt="" className='m-auto' />
                        </div>

                        <div className='p-3 flex items-center justify-between'>
                            <div className='space-x-5 flex items-center'>
                                {
                                    post?.likes.includes(user?._id) ? <FavoriteIcon style={{ fontSize: '30px', color: "red", cursor: 'pointer' }} onClick={() => { unlikePost(post._id) }} /> : <FavoriteBorderOutlinedIcon style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => { likePost(post._id) }} />
                                }

                                <ChatBubbleOutlineOutlinedIcon style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => openComment(index)} />

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

export default UserViewPost