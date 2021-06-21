import React from 'react'
import { Link } from 'react-router-dom';

const BottomNavbar: React.FC = () => {
  return (
    <nav className="rounded-t-3xl fixed bottom-0 inset-x-0 bg-purple-100 flex justify-between text-sm text-purple-900 uppercase font-mono">
      
      {/* Bouton retour */}
      <Link to="/" className="w-full block rounded-t-3xl py-5 px-3 text-center hover:bg-purple-200 hover:text-purple-800">
        <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </Link>
      
      {/* Bouton lobby */}
      <Link to="lobby" className="w-full rounded-t-3xl block py-5 px-3 text-center hover:bg-purple-200 hover:text-purple-800 transition duration-300">
        <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      </Link>

      {/* Bouton setting */}
      <Link to="/" className="w-full block rounded-t-3xl py-5 px-3 text-center hover:bg-purple-200 hover:text-purple-800">
        <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </Link>
    </nav>
  )
}

export default BottomNavbar;
