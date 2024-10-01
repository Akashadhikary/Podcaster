import React from 'react'
import { useSelector } from 'react-redux'
import ErrorPage from './ErrorPage'
import Header from '../components/Profile/Header'
import YourPodcast from '../components/Profile/YourPodcast'

const Profile = () => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <>{isLoggedIn? <div className='bg-green-100 h-full md:h-screen pb-5'>
      <Header/>
      <YourPodcast/>
    </div> : <ErrorPage/>}</>
  )
}

export default Profile
