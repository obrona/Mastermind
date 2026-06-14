import { useRef } from 'react';
import './App.css'
import { GameInstrutionDialog } from './GameInstructionsDialog';
import { Game } from './Game';
import { useMastermind } from './hooks/useMastermind';

function App() {
  const ref = useRef<HTMLDialogElement>(null);
  const { game, reset } = useMastermind();

  return (
    <>
    <div className='w-screen min-h-screen grid grid-rows-[64px_1fr]'>
      <header className='[grid-area:1/1/2/-1] bg-blue-300 flex items-center justify-between px-3'>
        <div className='bg-white text-2xl px-2 py-1 rounded-md'>
          Mastermind
        </div>

        <div className='flex items-center px-3 gap-2'>
          <button
            className='px-2 py-1 text-xl rounded-md text-red-500 bg-white hover:scale-105 cursor-pointer'
            onClick={reset}
          >
            ↺
          </button>

          <button
            className='px-2 py-1 text-xl rounded-md bg-white text-center hover:scale-105 cursor-pointer' 
            onClick={() => ref.current?.showModal()}
          >
            ⓘ 
          </button>
        </div>
      </header>

      <Game game={game} />
    </div>
    <GameInstrutionDialog ref={ref} />
    </>
  )
}

export default App
