"use client"
import Link from 'next/link'
import React from 'react'
import { useMatchContext } from '../context/Favourites'

function MatchCard({ data }) {
  const { addtoFavourites } = useMatchContext();

  return (
    <div>
       <Link href={`/match/${data.id}`}>
      <div className='   bg-white rounded-[5px] shadow-md'>
        {/* about match */}
        <div className='flex justify-between items-center gap-3 p-2'>
          <div className='text-[14px] text-gray-600'>{data.name}</div>
          <div className=' px-[8px] bg-blue-500 text-white uppercase rounded-[13px] text-[10px]'>{data.matchType}</div>
        </div>
        {/* teams  */}
        <div className='p-2'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3 m-1'>
              <div className='h-[20px] w-[30px] bg-gray-500'></div>
              <div className='text-[15px]'>{data.teams[0]}</div>
            </div>
            {/* team score */}
            {
              data.score[0] && <div className='text-[13px] '>
                {data.score[0].r}/{data.score[0].w} ({data.score[0].o})
              </div>
            }
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3 m-1'>
              <div className='h-[20px] w-[30px] bg-gray-500'></div>
              <div className='text-[15px]'>{data.teams[1]}</div>
            </div>
            {/* team score */}
            {
              data.score[1] && <div className='text-[13px] '>
                {data.score[1].r}/{data.score[1].w} ({data.score[1].o})
              </div>
            }
          </div>
        </div>
        {/* match status */}
        {data.matchStarted && !data.matchEnded &&
          <div className='p-2 flex justify-between text-[14px] '>
            <p className='text-green-600 '>match started</p>
            <button onClick={(e) => { e.preventDefault(); addtoFavourites(data.id)}}  className='text-white z-10 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 rounded-lg px-2 py-1 text-center me-2'>Add to fav</button>
          </div>
        }
        {/* if match ended */}
        {data.matchEnded &&
          <div className='p-2 flex justify-between text-[14px] '>
            <p className='text-red-600 '>match ended</p>
            <button onClick={(e) => {e.preventDefault() ;addtoFavourites(data.id)}} className='text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 rounded-lg px-2 py-1 text-center me-2'>Add to fav</button>
          </div>
        }
        {/* if match is not started yet */}
        {
          !data.matchStarted && !data.matchEnded && <div className='text-orange-500 text-[14px] p-2 '>
            Today:  {data.dateTimeGMT.split("T")[1].split(":").slice(0, 2).join(":")} PM
          </div>
        }
        {/* current status of match */}
        <div className='bg-stone-300 border-bottom-rounded-[13px]'>
          <div className='px-2 text-center text-[14px] text-orange-500'>
            {data.status}
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default MatchCard