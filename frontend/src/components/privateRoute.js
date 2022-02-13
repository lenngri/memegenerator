// source: https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import AuthTool from '../tools/authTool'

const PrivateRoute = ({ loggedIn }) => {

    AuthTool()
        .then((success) => console.log(success))
        .catch((err) => console.log(err))
        
    const isLoggedIn = useStoreState((state) => state.userSession.isLoggedIn)
  // Add your own authentication on the below line.

  console.log("isLoggedIn: ", isLoggedIn)

  return (
        isLoggedIn ? (
          <Outlet/>
        ) : (
          <Navigate to={{ pathname: '/login' }} />
        )
    )
}

export default PrivateRoute