import { FC, useRef } from 'react';
import { Button } from '../button';
import ReturnButton from '../navigation/return-button';

export interface PlayContainerProps {
  onCreate?: () => void;
  onJoin?: (code: string) => void;
}

export const PlayContainer: FC<PlayContainerProps> = ({ onCreate, onJoin }) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className='bg-gradient-to-b from-secondary to-primary h-screen pt-10'>
      <ReturnButton />
      <div className='bg-map w-5/6 h-5/6 sm:h-3/6 mx-auto rounded-2xl' id='map'>
        <div className='bg-white bg-opacity-25 border-2 border-white rounded-lg mx-auto flex justify-center w-6/12'>
          <Button className="font-iceland text-3xl text-white" onClick={onCreate}>
            Créer une partie
          </Button>
        </div>
        <div>
          <div className='mx-auto flex justify-center w-6/12 pb-5'>
            <input className='border-2 border-primary rounded-lg' ref={inputRef} type="text" placeholder="Game code" />
          </div>
          <div className='bg-white bg-opacity-25 border-2 border-white rounded-lg mx-auto flex justify-center w-6/12 '>
            <Button className='font-iceland text-3xl text-white' onClick={() => onJoin(inputRef.current.value)}>Rejoindre une partie</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
