import React from 'react'

async function page({ params }) {
  const apiKey=process.env.NEXT_PUBLIC_CRICKET_API_KEY;
  const res = (await params).slug
  // const apiKey = process.env.NEXT_CRICKET_API_KEY;

   const response = await fetch(`https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${res}`);
  const datas = await response.json()
  const data=datas.data
  return (
    <div className='container mx-auto min-h-[100vh]'>
      <h1 className='text-center text-3xl m-4'>Match info</h1>
      {/* match info start */}
      <div className='border-2 border-white p-3'>
        {/* match headers */}
        <div className='flex justify-between items-center gap-3 p-2'>
          <div className='text-[20px] font-bold text-gray-600'>{data.name}</div>
          <div className=' px-[8px] bg-blue-500 text-white uppercase rounded-[13px] text-[16px]'>{data.matchType}</div>
        </div>
        {/* if match started */}
        {data.status!=="Match not started" && <div>
          {/* toss */}
          {data.tossWinner && <div className='p-2'>
            <p>{data.tossWinner} won the toss and choose to {data.tossChoice} first</p>
          </div>}
          {/* not toss */}
          {!data.tossWinner && <div className='p-2'>
            <p>Toss not happend yet</p>
          </div>}
          {/* match status */}
          <h3 className='p-2 text-orange-500'>{data.status}</h3>
          {/* teams and score */}
          <div className='p-2'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-3 items-center m-1 text-[20px] font-bold'>
                <div className='h-[20px] w-[30px] bg-gray-500'></div>
                <div>{data.teams[0]}</div>
              </div>
              {/* team score */}
              {data.score[0] &&
                <div className='text-[20px] font-bold'>
                  {data.score[0].r}/{data.score[0].w} ({data.score[0].o})
                </div>
              }
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-3 items-center m-1 text-[20px] font-bold'>
                <div className='h-[20px] w-[30px] bg-gray-500'></div>
                <div>{data.teams[1]}</div>
              </div>
              {/* team score */}
              {data.score[1] &&
                <div className='text-[20px] font-bold'>
                  {data.score[1].r}/{data.score[1].w} ({data.score[1].o})
                </div>
              }
            </div>
          </div>
          {/* venue */}
          <div className='p-2'>
            <p>Venue:{data.venue}</p>
          </div>
        </div>
        }
        {/* not status data */}
        {data.status==="Match not started" && <div>
          <h2>This match has not started yet</h2>
          </div>}
      </div>
    </div >
  )
}

export default page