import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link,  } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import UserInfoButton from './UserInfoButton';
import { changeMode } from '../../Store/ThemeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';



function Header() {
  const authStatus = useSelector((state) => state.auth.status); // Get auth state
  const darkMode = useSelector((state) => state.theme.DarkMode)
  // console.log(darkMode)

const dispatch = useDispatch()


  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // Show only if user is not logged in
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, // Show only if user is not logged in
    },
    {
      name: "userInfo",
      slug: '/userinfo',
      active: authStatus
    }
  ];
console.log('current auth status = ', authStatus)
  
  return(
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          <Link to="/">My App</Link>
        </h1>
        <ul className="flex space-x-4">
          {navItems.map(
            (item, index) =>
              item.active && (
                <li key={index}>
                  <Link
                    to={item.slug}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              )
          )}
          {authStatus && <li><LogoutBtn /></li>}
          {authStatus && <li><UserInfoButton /></li>}
        </ul>
    

<button
  className={`p-2 rounded-full transition-all duration-300 ${
    darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'
  }`}
  onClick={() => dispatch(changeMode())}
>
  {darkMode ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun}/>}
</button>

      </div>
    </nav>
  ); 
}

export default Header;
