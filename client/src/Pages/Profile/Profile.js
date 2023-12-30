import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';

function Profile() {
  return (
      <div>
          
          {/* Profile Section */}
          <div className='p-5'>
              <div className='grid grid-rows-1 grid-cols-4 place-items-center'>
                  <div className='w-[90px] h-[90px] rounded-full overflow-hidden'>
                      <img src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61NRxcV4VML.jpg" alt="" className='w-full h-full rounded-full'/>
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
                  <div className='px-3 py-2 bg-neutral-800 rounded-lg cursor-pointer'><PersonAddIcon/></div>
              </div>
          </div>

          {/* Story highlights section */}
          <div className='p-7 text-start'>
              <div className='py-2 flex justify-between'>
                  <div>
                      <div className='text-[15px] font-bold'>Story highlights</div>
                      <div className='text-[15px]'>Keep your favorite stories on your profile</div>
                  </div>
                  <div><KeyboardArrowDownIcon/></div>
              </div>
              <div className='py-3 flex space-x-4'>
                  <div className='text-center'>
                      <div className='w-[80px] h-[80px] rounded-full border-[1px] flex items-center justify-center'><AddIcon style={{fontSize:'40px'}} /></div>
                      <div className='mt-1'>New</div>
                  </div>
                  <div className='w-[80px] h-[80px] rounded-full bg-neutral-800'></div>
                  <div className='w-[80px] h-[80px] rounded-full bg-neutral-800'></div>
                  <div className='w-[80px] h-[80px] rounded-full bg-neutral-800'></div>
              </div>
          </div>

    </div>
  )
}

export default Profile