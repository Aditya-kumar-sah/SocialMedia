import React from 'react'

const CloseFriends = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className='flex items-center mb-[15px]'>
            <img className='w-[32px] h-[32px] rounded-[50%] object-cover mr-[10px]' src={PF+user.profilePicture}  />
            <span className='sidebarfriendname'>{user.username}</span>
        </li>
    )
}

export default CloseFriends
