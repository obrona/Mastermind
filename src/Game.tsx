import { colorOptions, type colors, type GradeResult, type Mastermind } from "./GameLogic/Mastermind";

// 0 = top, 1 = right, 2 = bottom, 3 = left
function insetSides(sides: number[], width = 2, color = 'black',): string {
  const offsets: Record<number, string> = {
    0: `inset 0 ${width}px 0 0 ${color}`,
    1: `inset -${width}px 0 0 0 ${color}`,
    2: `inset 0 -${width}px 0 0 ${color}`,
    3: `inset ${width}px 0 0 0 ${color}`,
  };

  const boxShadow = sides
    .map((s) => offsets[s])
    .filter(Boolean)
    .join(', ');

  return boxShadow;
}

interface AttemptRowProps {
  attempt: colors[];
  result: GradeResult;
  topRow: boolean;
}

function AttemptRow({ attempt, result, topRow }: AttemptRowProps) {

  return (
    <>
      <div 
        className="px-3 flex items-center justify-center gap-4 bg-gray-400"
        style={{
          boxShadow: topRow ? insetSides([0, 2, 3], 1) : insetSides([2, 3], 1),
        }}
      >
        {attempt.map((c, i) => {
          return (
            <div
              key={i}
              className='h-8 w-8 rounded-full'
              style={{
                backgroundColor: c,
              }}
            />
          )
        })} 
      </div>
      
      <div 
        className='flex flex-col items-center justify-center bg-gray-500'
        style={{
          boxShadow: topRow ? insetSides([0, 1, 2], 1) : insetSides([1, 2], 1),
        }}
      >
        <div 
          className="grid grid-cols-2 grid-rows-2 gap-1"
        >
          {
            Array(result.correctColorCorrectPos).fill(0).map((_, i) => {
              return (
                <div 
                  key={i} 
                  className='bg-black h-2 w-2 rounded-full' 
                />
              )
            })
          }
          {
            Array(result.correctColorWrongPos).fill(0).map((_, i) => {
              return (
                <div 
                  key={result.correctColorCorrectPos + i} 
                  className='bg-white h-2 w-2 rounded-full' 
                />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

interface CurrAttemptProps {
  currAttempt: (colors | null)[];
  onPegClick: (i: number) => void;
}

function CurrAttemptRow({ currAttempt, onPegClick }: CurrAttemptProps) {
  return (
    <div className='px-3 flex items-center justify-center gap-4 bg-amber-700'>
      {currAttempt.map((c, i) => {
        return (
          <div 
            key={i}
            className='h-8 w-8 rounded-full'
            style={{
              backgroundColor: c ?? 'white',
            }}
            onClick={() => {
              c && onPegClick(i);
            }}
          >
          </div>        
        )
      })}

    </div>
  )
}

interface ColorBoardProps {
  onColorClick: (c: colors) => void;
  clear: () => void;
  enter: () => void;
}

function ColorBoard(props: ColorBoardProps) {
  const { onColorClick, clear, enter } = props;

  return (
    <div className='h-16 px-2 flex items-center bg-gray-400 gap-4 rounded-lg'>
      {colorOptions.map(c => {
        return (
          <div 
            key={c}
            className='cursor-pointer h-8 w-8 rounded-full hover:scale-105'
            style={{
              backgroundColor: c,
            }}
            onClick={() => onColorClick(c)}
          />
        )
      })}

      <div className="flex gap-1 items-center">
        <button 
          className='text-xl px-2 py-1 rounded-md bg-white text-red-500 hover:scale-105'
          onClick={clear}
        >
          🗑
        </button>

        <button
          className='text-xl px-2 py-1 rounded-md bg-white hover:scale-105'
          onClick={enter}
        >
          ➤
        </button>
      </div>

    </div>
  )
}

interface GameProps {
    game: Mastermind;
}

export function Game(props: GameProps) {
  const { game } = props;
  return (
    <div className='[grid-area:2/1/-1/-1] flex flex-col items-center mt-4 gap-4'>
      <div className='grid grid-cols-[216px_64px] auto-rows-[64px]'>
        {
          game.attempts.map((a, i) => {
            return <AttemptRow key={i} attempt={a} result={game.gradeResults[i]} topRow={i == 0}/>
          })
        }
        <CurrAttemptRow currAttempt={game.currAttempt} onPegClick={game.popColor.bind(game)} />
      </div>
      <ColorBoard 
        onColorClick={(c) => game.addColor(c)}
        clear={() => game.clearCurrAttempt()}
        enter={() => game.submit()}
      />
    </div>
  )
}