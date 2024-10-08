import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function EditProfile() {

    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [profilePicOption, setProfilePicOption] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const [editName, setEditName] = useState(user?.name || '');
    const [editUsername, setEditUsername] = useState(user?.username || '');
    const [editBio, setEditBio] = useState(user?.bio || '');

    useEffect(() => {
        // Update the name state once the Redux state is available
        if (user?.name) {
            setEditName(user.name);
        }
        if (user?.username) {
            setEditUsername(user.username);
        }
        if (user?.bio) {
            setEditBio(user.bio);
        }
    }, [user]);

    const handleFileChange = (e) => {
        setProfilePicOption(false);
        const file = e.target.files[0];
        setProfileImageFile(file);

        if (file) {
            displaySelectedImage(file);
        }
    };
    const displaySelectedImage = (file) => {
        const reader = new FileReader();

        // Read the selected file as a data URL
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            setSelectedImagePreview(e.target.result);
            setSelectedImage(e.target.result);
        };

    };

    const saveChanges = async () => {
        // Uploading images to cloudinary
        const form = new FormData();
        form.append("file", profileImageFile);
        form.append("upload_preset", "instagram-clone");
        form.append("cloud_name", "himanshu-instagram-clone-cloud");

        let imageUrl = user?.profilePic;

        try {
            if (profileImageFile) {
                const resCloudinary = await fetch(`${IMAGE_BASE_URL}`, {
                    method: 'POST',
                    body: form
                });

                const dataCloudinary = await resCloudinary.json();
                imageUrl = dataCloudinary.url;
            }

            const res = await fetch(`${BASE_URL}/saveProfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify({
                    editName, editUsername, editBio, pic: imageUrl
                })
            });
            const data = await res.json();
            if (res.status !== 201 || !data) window.alert(`${data.error}`);
            else {
                window.alert(`${data.message}`);
                navigate('/profile');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                        <div className='mx-5 text-[23px] font-bold'>Edit profile</div>
                    </div>
                    {isEdit && <div onClick={saveChanges}>
                        <CheckIcon style={{ fontSize: '35px', cursor: 'pointer' }} />
                    </div>}
                </div>

                <div className='pt-7 pb-3 flex flex-col items-center space-y-3 cursor-pointer' onClick={() => { setProfilePicOption(true) }}>
                    <div className='w-[90px] h-[90px] border-2 rounded-full overflow-hidden'>
                        <img
                            src={selectedImage || user?.profilePic}
                            alt="" className='w-full h-full rounded-full' />
                    </div>
                    <div className='text-blue-500 text-[17px] font-bold'>
                        Edit picture
                    </div>
                </div>

                <div className='p-3 text-start space-y-5'>
                    <div className='flex flex-col'>
                        <label htmlFor='name' className='text-neutral-300'>Name</label>
                        <input type="text" id='name' value={editName} className='p-1 text-[18px] outline-0 bg-black border-b-2' autoComplete='false' onChange={(e) => { setEditName(e.target.value); setIsEdit(true) }} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='username' className='text-neutral-300'>Username</label>
                        <input type="text" id='username' value={editUsername} className='p-1 text-[18px] outline-0 bg-black border-b-2' autoComplete='false' onChange={(e) => { setEditUsername(e.target.value); setIsEdit(true) }} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='bio' className='text-neutral-300'>Bio</label>
                        <input type="text" id='bio' value={editBio} className='p-1 text-[18px] outline-0 bg-black border-b-2' autoComplete='false' onChange={(e) => { setEditBio(e.target.value); setIsEdit(true) }} />
                    </div>
                </div>
            </div>

            {/* Profile pic option */}
            <div className={`w-[100%] backdrop-blur-md absolute bottom-0 ${profilePicOption ? "h-[100vh] opacity-100" : "h-0 opacity-0"} duration-300`}>
                <div className='h-[20vh] absolute bottom-10 w-[100%] bg-black flex flex-col items-center justify-center'>
                    <div className='w-[100%] p-2 text-end' onClick={() => setProfilePicOption(false)}>
                        <CloseIcon style={{ cursor: 'pointer' }} />
                    </div>
                    <div className='space-y-5'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold'>
                            <label htmlFor="fileInput" className='cursor-pointer'>Change Profile pic</label>
                            <input type="file" id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Previewing selected image file */}
            {selectedImagePreview &&
                <div className='h-[100vh] w-[100%] absolute backdrop-blur-xl flex flex-col items-center justify-center space-y-5'>
                    <div>
                        <img src={selectedImage} alt="" />
                    </div>
                    <div className='p-2 w-[100%] flex justify-between'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg cursor-pointer' onClick={() => { setSelectedImagePreview(null); setSelectedImage(null); }}>
                            Cancel
                        </div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg cursor-pointer' onClick={() => { setSelectedImagePreview(null); setIsEdit(true); }}>
                            Confirm
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile