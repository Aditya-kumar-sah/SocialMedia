import React from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Rightbar from '../components/Rightbar'
import Feed from '../components/Feed'


const Home = () => {
    return (
        <>
            <Topbar />
            <div className='flex w-[100%]'>
                <Sidebar />
                <Feed/>
                <Rightbar/>
            </div>
        </>
    )
}

export default Home
