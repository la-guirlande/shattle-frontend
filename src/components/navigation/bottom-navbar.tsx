import React from 'react'
import { Link } from 'react-router-dom';

const BottomNavbar: React.FC = () => {
  return (
    <nav className="h-14 fixed bottom-0 inset-x-0 border-t bg-primary shadow-2xl flex justify-between text-sm text-purple-900 uppercase font-mono">
      
      {/* Bouton lobby */}
      <Link to="lobby" className="w-full block py-5 px-3 text-center transition duration-300">
        <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z" />
        </svg>
      </Link>

      {/* Bouton compte */}
      <Link to="/account" className="w-full block py-5 px-3 text-center">
        <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </Link>

      {/* Bouton settings */}
      <Link to="/settings" className="w-full block py-5 px-3 text-center">
        <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </Link>
    </nav>
  )
}

export default BottomNavbar;
