import React from 'react'
import { useSelector } from 'react-redux';
import { Link,  } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import UserInfoButton from './UserInfoButton';

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // Get auth state

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
  // map function is used to render dynamially if the authstatus is false the login and signup will be showen
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-white text-xl font-bold">
            <Link to="/">My App</Link>
          </h1>
          <ul className="flex space-x-4">
            {navItems.map((item, index) =>
              item.active ? (
                <li key={index}>
                  <Link
                    to={item.slug}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn /> {/* Show Logout button if logged in */}
              </li>
            )}
            {authStatus && (
              <li>
                <UserInfoButton/>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
