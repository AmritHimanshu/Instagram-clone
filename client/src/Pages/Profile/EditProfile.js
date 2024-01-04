import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function EditProfile() {

    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [profilePicOption, setProfilePicOption] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
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

    const viewProfileImage = (imageUrl) => {
        setProfilePicOption(false);
        setImagePreview(imageUrl);
    };

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

        reader.onload = (e) => {
            setSelectedImage(e.target.result);
            setSelectedImagePreview(e.target.result);
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    };

    const saveChanges = async () => {
        // Uploading images to cloudinary
        const form = new FormData();
        form.append("file", profileImageFile);
        form.append("upload_preset", "instagram-clone");
        form.append("cloud_name", "himanshu-instagram-clone-cloud");

        try {
            // // https://api.cloudinary.com/v1_1/himanshu-instagram-clone-cloud/image/upload
            const resCloudinary = await fetch("https://api.cloudinary.com/v1_1/himanshu-instagram-clone-cloud/image/upload", {
                method: 'POST',
                body: form
            });

            const dataCloudinary = await resCloudinary.json();

            if (dataCloudinary) {
                setImageUrl(dataCloudinary.url);
                const res = await fetch('/saveProfile', {
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
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <div className='h-[100vh]'>
                <div className='p-3 text-start flex items-center justify-between'>
                    <div className='text-start flex items-center'>
                        <KeyboardBackspaceIcon style={{ fontSize: '35px' }} onClick={() => navigate('/profile')} />
                        <div className='mx-5 text-[23px] font-bold'>Edit profile</div>
                    </div>
                    {isEdit && <div onClick={saveChanges}>
                        <CheckIcon style={{ fontSize: '35px' }} />
                    </div>}
                </div>

                <div className='pt-7 pb-3 flex flex-col items-center space-y-3' onClick={() => { setProfilePicOption(true) }}>
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
                        <CloseIcon />
                    </div>
                    <div className='space-y-5'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold' onClick={() => viewProfileImage(user?.profilePic)}>Preview Profile pic</div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold'>
                            <label htmlFor="fileInput">Change Profile pic</label>
                            <input type="file" id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Previewing profile pic */}
            <div className={`w-[100%] absolute backdrop-blur-xl flex flex-col items-center justify-center space-y-3 ${imagePreview ? 'h-[100vh] opacity-100' : 'h-0 opacity-0'} duration-300`}>
                <div className='w-[100%] p-2 text-end' onClick={() => setImagePreview(null)}>
                    <CloseIcon />
                </div>
                <div>
                    <img src={imagePreview} alt="" />
                </div>
            </div>

            {/* Previewing selected image file */}
            {selectedImagePreview &&
                <div className='h-[100vh] w-[100%] absolute backdrop-blur-xl flex flex-col items-center justify-center space-y-5'>
                    <div>
                        <img src={selectedImage} alt="" />
                    </div>
                    <div className='p-2 w-[100%] flex justify-between'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg' onClick={() => { setSelectedImagePreview(null); setSelectedImage(null); }}>
                            Cancel
                        </div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg' onClick={() => { setSelectedImagePreview(null); setIsEdit(true); }}>
                            Confirm
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile