import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';

function EditProfile() {

    const [profilePicOption, setProfilePicOption] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);

    const user = useSelector(selectUser);

    const navigate = useNavigate();


    // Helper function to convert Uint8Array to Base64
    function uint8ArrayToBase64(uint8Array) {
        let binary = '';
        uint8Array.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });
        return btoa(binary);
    }

    const viewProfileImage = (imageUrl) => {
        setProfilePicOption(false);
        setImagePreview(imageUrl);
    }

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
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    };

    const uploadPic = async () => {
        // setSelectedImage(false);
        try {

            const formData = new FormData();
            formData.append('file', profileImageFile);

            const res = await fetch('/uploadProfilePic', {
                method: 'POST',
                // Header is not required here
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                },
                credentials: 'include', // Include cookies in the request
                body: formData,
            });

            const data = await res.json();
            if (data) {
                window.alert(`${data.message}`);
                window.location.reload();
                setSelectedImage(null);
            }
            else window.alert(`${data.error}`);
        } catch (error) {
            console.log("Frontend" + error);
        }
    }



    return (
        <>
            <div className='h-[100vh]'>
                <div className='p-3 text-start flex items-center'>
                    <KeyboardBackspaceIcon style={{ fontSize: '35px' }} onClick={()=>navigate('/profile')} />
                    <div className='mx-5 text-[23px] font-bold'>Edit profile</div>
                </div>

                <div className='pt-7 pb-3 flex flex-col items-center space-y-3' onClick={() => { setProfilePicOption(true) }}>
                    <div className='w-[90px] h-[90px] border-2 rounded-full overflow-hidden'>
                        {user?.profilePicture &&
                            <img
                                src={`data:${user?.profilePicture.contentType};base64,${uint8ArrayToBase64(user?.profilePicture.data.data)}`}
                                alt="" className='w-full h-full rounded-full' />}
                    </div>
                    <div className='text-blue-500 text-[17px] font-bold'>
                        Edit picture
                    </div>
                </div>

                <div className='p-3 text-start space-y-5'>
                    <div className='flex flex-col'>
                        <label htmlFor='name' className='text-neutral-300'>Name</label>
                        <input type="text" id='name' className='p-1 text-[18px] outline-0 bg-black border-b-2' autoComplete='false' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='username' className='text-neutral-300'>Username</label>
                        <input type="text" id='username' className='p-1 text-[18px] outline-0 bg-black border-b-2' autoComplete='false' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='bio' className='text-neutral-300'>Bio</label>
                        <input type="text" id='bio' className='p-1 text-[18px] outline-0 bg-black border-b-2' autoComplete='false' />
                    </div>
                </div>
            </div>

            {/* Profile pic option */}
            {profilePicOption && <div className='h-[100vh] w-[100%] backdrop-blur-md absolute'>
                <div className='h-[20vh] absolute bottom-10 w-[100%] bg-black flex flex-col items-center justify-center'>
                    <div className='w-[100%] p-2 text-end' onClick={() => setProfilePicOption(false)}>
                        <CloseIcon />
                    </div>
                    <div className='space-y-5'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold' onClick={() => viewProfileImage(`data:${user?.profilePicture.contentType};base64,${uint8ArrayToBase64(user?.profilePicture.data.data)}`)}>Preview Profile pic</div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold'>
                            <label htmlFor="fileInput">Change Profile pic</label>
                            <input type="file" id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
            </div>}

            {/* Previewing profile pic */}
            {imagePreview &&
                <div className='h-[100vh] w-[100%] absolute backdrop-blur-xl flex flex-col items-center justify-center space-y-3'>
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
                <div className='h-[100vh] w-[100%] absolute backdrop-blur-xl flex flex-col items-center justify-center space-y-5'>
                    <div>
                        <img src={selectedImage} alt="" />
                    </div>
                    <div className='p-2 w-[100%] flex justify-between'>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg' onClick={() => setSelectedImage(null)}>
                            Cancel
                        </div>
                        <div className='px-7 py-3 text-sm bg-neutral-800 font-bold rounded-lg' onClick={uploadPic}>
                            Confirm
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile