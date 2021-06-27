import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/authentication-context'
import BottomNavbar from '../navigation/bottom-navbar';
import ReturnButton from '../navigation/return-button';

export const AccountContainer: React.FC = () => {

  const { setAuthUser } = useContext(AuthenticationContext);
  let history = useHistory();

  const handleDisconnect = () => {
    localStorage.clear();
    setAuthUser(null);

    history.push('/');
  }

  return (
    <div className="bg-gradient-to-b from-secondary to-primary h-screen">
      <div className="sticky ml-4 mb-2 ">
      <ReturnButton />
        <div className='font-iceland text-white text-5xl mx-auto flex text-center justify-center w-6/12 pb-5'>
          Mon compte
        </div>
        <button className="p-0 bg-transparent rounded-full hover:border-white hover:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          onClick={handleDisconnect}>
          <div className="py-2 px-4 text-white">
            Se déconnecter
          </div>
        </button>
      </div>
      <BottomNavbar />
    </div>
  )
}
