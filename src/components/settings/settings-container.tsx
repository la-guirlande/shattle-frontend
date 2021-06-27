import React from 'react'
import BottomNavbar from '../navigation/bottom-navbar';
import ReturnButton from '../navigation/return-button';

export const SettingsContainer: React.FC = () => {

  return (
    <div className="bg-gradient-to-b from-secondary to-primary h-screen">
      <div className="sticky ml-4 mb-2 ">
      <ReturnButton />
        <div className='font-iceland text-white text-5xl mx-auto flex text-center justify-center w-6/12 pb-5'>
          Paramètres
        </div>
      </div>
      <BottomNavbar />
    </div>
  )
}
