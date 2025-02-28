"use client"
import React, { useEffect, useState } from 'react'
import { useMatchContext } from '../context/Favourites'
import FavMatchCard from '../components/favouriteMatch'
import Loader from '../components/loader'

function page() {
  const apiKey=process.env.NEXT_PUBLIC_CRICKET_API_KEY;
  const [matches, setmatches] = useState([])
  const { match } = useMatchContext();
  const fetchdata = async () => {
    try {
      const res = await Promise.all(
        match.map((match) =>
          fetch(`https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${match}`)
            .then((res) => res.json())
        )
      )
      setmatches(res)
    } catch (err) {
      // console.log(err);

    }
  }
  useEffect(() => {
    fetchdata()
  }, [])


  return (
    <div className='container text-center p-4 mx-auto min-h-[100vh]'>
      <h1 className="text-3xl font-bold text-center p-2">Favourite Matches</h1>
      {matches.length==0 && <Loader />}
      <section className="py-3 px-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.length!=0 &&
          matches.map((match, idx) => (
            <FavMatchCard data={match.data} key={idx} />
          ))
        }
      </section>
    </div>
  )
}

export default page