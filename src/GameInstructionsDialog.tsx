interface Props {
  ref: React.Ref<HTMLDialogElement>;
}

export function GameInstrutionDialog({ ref }: Props) {
  return (
    <dialog 
      ref={ref} 
      closedby='any' 
      className='m-auto rounded-lg overflow-hidden backdrop:bg-black/60'
    >
      <div className='p-2'>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            The goal of the game is to guess the code within a certain amount of attempts
          </li>

          <li>
            Click on the colored circles at the bottom to fill up the current guess.
          </li>

          <li>
            Click on the colored circle in the current attempt to clear it.
          </li>
          
          <li>
            After every guess, a hint will be shown to you.
            <ul className='list-[circle] pl-5 space-y-1'>
              <li>
                A black dot corresponds to a peg with the correct color and position.
              </li>
              <li>
                A white dot corresponds to a peg with the correct color but wrong position.
              </li>
            </ul>
          </li>
          <li>
            Good Luck!
          </li>
        </ul>
      </div>
    </dialog>
  )
}