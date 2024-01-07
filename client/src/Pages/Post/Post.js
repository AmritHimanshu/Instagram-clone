import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckIcon from '@mui/icons-material/Check';

function Post() {

    const BASE_URL = "https://instagram-clone-api-six.vercel.app/";
    // const BASE_URL = "http://localhost:5000";
    // const BASE_URL = "https://instagram-clone-1-api.onrender.com";

    const [image, setImage] = useState();
    const [caption, setCaption] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const user = useSelector(selectUser);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                setImagePreview(e.target.result);
            }
            setIsEdit(true);
        }
    };

    const handleUpload = async () => {
        // Uploading images to cloudinary
        const form = new FormData();
        form.append("file", image);
        form.append("upload_preset", "instagram-clone");
        form.append("cloud_name", "himanshu-instagram-clone-cloud");

        try {
            // // https://api.cloudinary.com/v1_1/himanshu-instagram-clone-cloud/image/upload
            const resCloudinary = await fetch("https://api.cloudinary.com/v1_1/himanshu-instagram-clone-cloud/image/upload", {
                method: 'POST',
                body: form
            });

            const dataCloudinary = await resCloudinary.json();

            if (dataCloudinary && dataCloudinary.url) {
                const imageUrl = dataCloudinary.url;
                const res = await fetch(`${BASE_URL}/uploadPost`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies in the request
                    body: JSON.stringify({
                        caption,
                        pic: imageUrl
                    })
                });
                const data = await res.json();
                if (data) {
                    window.alert(`${data.message}`);
                    navigate('/');
                }
                else window.alert(`${data.error}`);
            }
        } catch (error) {
            console.log("Post: ", error);
        }
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

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className='h-[100vh]'>
                <div className='p-3 text-start flex items-center justify-between'>
                    <div className='text-start flex items-center'>
                        <KeyboardBackspaceIcon style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => navigate('/profile')} />
                        <div className='mx-5 text-[23px] font-bold'>Post</div>
                    </div>
                    <div>
                        {isEdit && <CheckIcon style={{ fontSize: '35px' }} onClick={handleUpload} />}
                    </div>
                </div>

                <div className='p-3 space-y-10'>
                    <div className={`w-[100%] min-h-[300px] flex items-center justify-center ${!imagePreview && "border-[1px] border-neutral-600"}`}>
                        {imagePreview && <img src={imagePreview} alt="" />}
                    </div>

                    <div className='px-7 py-3 text-sm bg-neutral-800 font-bold'>
                        <label htmlFor="fileInput" className='cursor-pointer'>Upload photo</label>
                        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>

                    <div className='flex flex-col text-start'>
                        <label htmlFor="caption" className="text-neutral-300">Enter caption</label>
                        <input type="text" id='caption' name='caption' value={caption} className='p-1 text-[18px] outline-0 bg-black border-b-2 placeholder:text-sm' placeholder='Enter your caption.....' autoComplete='false' onChange={(e) => setCaption(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post