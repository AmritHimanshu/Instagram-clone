import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckIcon from '@mui/icons-material/Check';

function Post() {

    const [image, setImage] = useState();
    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState();
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                setImage(e.target.result);
            }
            setIsEdit(true);
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('caption', caption);

            const res = await fetch('https://instagram-clone-1-api.onrender.com/uploadPost', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await res.json();
            if (data) {
                window.alert(`${data.message}`);
                navigate('/');
                window.location.reload();
            }
            else window.alert(`${data.error}`);
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    }

    return (
        <>
            <div className='h-[100vh]'>
                <div className='p-3 text-start flex items-center justify-between'>
                    <div className='text-start flex items-center'>
                        <KeyboardBackspaceIcon style={{ fontSize: '35px' }} onClick={() => navigate('/profile')} />
                        <div className='mx-5 text-[23px] font-bold'>Post</div>
                    </div>
                    <div>
                        {isEdit && <CheckIcon style={{ fontSize: '35px' }} onClick={handleUpload} />}
                    </div>
                </div>

                <div className='p-3 space-y-10'>
                    <div className={`w-[100%] min-h-[300px] flex items-center justify-center ${!image && "border-[1px] border-neutral-600"}`}>
                        {image && <img src={image} alt="" />}
                    </div>

                    <div className='px-7 py-3 text-sm bg-neutral-800 font-bold'>
                        <label htmlFor="fileInput">Upload photo</label>
                        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>

                    <div className='flex flex-col text-start'>
                        <label htmlFor="caption" className="text-neutral-300">Enter caption</label>
                        <input type="text" id='caption' name='caption' value={caption} className='p-1 text-[18px] outline-0 bg-black border-b-2' autoComplete='false' onChange={(e)=>setCaption(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post