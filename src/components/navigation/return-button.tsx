import React from 'react'
import { useHistory } from "react-router-dom"

const ReturnButton: React.FC = () => {

  let history = useHistory();
  
  const handleBackButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.goBack()
  }

  return (
    <div className="absolute top-2 left-4 mb-2">
      <button onClick={handleBackButton} className="p-0 w-12 h-12 bg-transparent rounded-full hover:border-white hover:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" className="inline-block " viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>
      </button>
    </div>
  )
}

export default ReturnButton;
