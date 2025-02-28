"use client"
import React, { useState } from 'react'
import Loader from '../components/loader'
function page() {
    const apiKey=process.env.NEXT_PUBLIC_CRICKET_API_KEY;
    const [player, setplayer] = useState("")
    const [playerdata, setplayerdata] = useState("")
    const [moredata, setmoredata] = useState("")
    const [error, seterror] = useState("")
    const [loading ,setloading]=useState(false)
    
    const handleSubmit = async (e) => {
        if(moredata && playerdata){
            setplayerdata("")
            setmoredata("")
        }
        e.preventDefault()
        setloading(true)
        if (!player) {
            seterror("Please enter a name to search")
        }
        if (player) {
            try{
            const res = await fetch(`https://api.cricapi.com/v1/players?apikey=${apiKey}&offset=0&search=${player}`);
            const data = await res.json()
            if(data.data.length==0){
                seterror("No player found, please recheck name")
            }
            setplayerdata(data.data[0])
            setloading(false)
            setplayer("")
            } catch(err){
                seterror(err)
            } 
        }
    }
    const handleChange = (e) => {
        seterror("")
        setplayer(e.target.value)
    }
    const handleMore = async () => {
        setloading(true)
        const id = playerdata.id
        const res = await fetch(`https://api.cricapi.com/v1/players_info?apikey=${apiKey}&id=${id}`);
        const data = await res.json()
        setmoredata(data.data)
        setloading(false)
        // console.log(data.data);

    }
    return (
        <div className='container mx-auto p-3 min-h-[100vh]'>
            <h2 className='text-center text-3xl font-bold'>Player Information</h2>
            <form onSubmit={handleSubmit} className='flex gap-5 justify-center p-4'>
                <input
                    type='text'
                    placeholder='Search Player Name'
                    className='px-4 py-1  border-[1px] border-blue-400 focus:outline-none min-w-[300px]'
                    value={player}
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit' className='px-2 rounded-[5px] py-1 bg-green-500 text-white '>Search</button>
            </form>
            {error && <div className='text-center text-[13px] text-red-500'>{error}</div>}
            {loading && <Loader/>}
            {playerdata && <div className='border-2 border-white'>
                <div className='text-center p-4'>
                    <h2 className=' text-[16px] font-semibold'>{playerdata.name}</h2>
                    <h4 className=' text-[13px]'>{playerdata.country}</h4>
                </div>
                {!moredata && <div className='text-center p-4'>
                    <button onClick={handleMore} className=' px-2 rounded-[5px] py-1 bg-blue-500 text-white '>Know More</button>
                </div>}
                {!moredata && <Loader/>}
                {moredata && <div>
                    <p className='bg-stone-400 px-4'>Personal Information</p>
                    <div className='p-4'>
                        <div className='p-2 rounded-md'>
                            <img src={moredata.playerImg} alt='player-image ' className='h-[50px] w-[50px]' />
                        </div>
                        <div>
                            <p className='text-[14px] p-1'>Date of Birth: {moredata.dateOfBirth.split("T")[0]}</p>
                            <p className='text-[14px] p-1'>State: {moredata.placeOfBirth}</p>
                            <p className='text-[14px] p-1'>Role: {moredata.role}</p>
                            <p className='text-[14px] p-1'>Batting Style: {moredata.battingStyle}</p>
                            <p className='text-[14px] p-1'>Bowling Style: {moredata.bowlingStyle}</p>
                        </div>
                    </div>
                    <p className='bg-stone-400 px-4'>Stats</p>
                    <div className='p-4'>
                        <p className=' font-bold p-4 text-center '>IN Batting</p>
                        <table className='mx-auto '>
                            <thead>
                                <tr className='p-2 bg-stone-400 font-semibold'>
                                    <td className='px-6 '></td>
                                    <td className='px-6 '>TEST</td>
                                    <td className='px-6 '>ODI</td>
                                    <td className='px-6 '>T20</td>
                                    <td className='px-6 '>IPL</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Matches</td>
                                    <td className='px-6 '>{moredata.stats[0].value}</td>
                                    <td className='px-6 '>{moredata.stats[13].value}</td>
                                    <td className='px-6 '>{moredata.stats[26].value}</td>
                                    <td className='px-6 '>{moredata.stats[39].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Innings</td>
                                    <td className='px-6 '>{moredata.stats[1].value}</td>
                                    <td className='px-6 '>{moredata.stats[14].value}</td>
                                    <td className='px-6 '>{moredata.stats[27].value}</td>
                                    <td className='px-6 '>{moredata.stats[40].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Runs</td>
                                    <td className='px-6 '>{moredata.stats[3].value}</td>
                                    <td className='px-6 '>{moredata.stats[16].value}</td>
                                    <td className='px-6 '>{moredata.stats[29].value}</td>
                                    <td className='px-6 '>{moredata.stats[42].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Highest</td>
                                    <td className='px-6 '>{moredata.stats[4].value}</td>
                                    <td className='px-6 '>{moredata.stats[17].value}</td>
                                    <td className='px-6 '>{moredata.stats[30].value}</td>
                                    <td className='px-6 '>{moredata.stats[43].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Avg</td>
                                    <td className='px-6 '>{moredata.stats[5].value}</td>
                                    <td className='px-6 '>{moredata.stats[18].value}</td>
                                    <td className='px-6 '>{moredata.stats[31].value}</td>
                                    <td className='px-6 '>{moredata.stats[44].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Sr</td>
                                    <td className='px-6 '>{moredata.stats[7].value}</td>
                                    <td className='px-6 '>{moredata.stats[20].value}</td>
                                    <td className='px-6 '>{moredata.stats[33].value}</td>
                                    <td className='px-6 '>{moredata.stats[46].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>100</td>
                                    <td className='px-6 '>{moredata.stats[8].value}</td>
                                    <td className='px-6 '>{moredata.stats[21].value}</td>
                                    <td className='px-6 '>{moredata.stats[34].value}</td>
                                    <td className='px-6 '>{moredata.stats[47].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>200</td>
                                    <td className='px-6 '>{moredata.stats[9].value}</td>
                                    <td className='px-6 '>{moredata.stats[22].value}</td>
                                    <td className='px-6 '>{moredata.stats[35].value}</td>
                                    <td className='px-6 '>{moredata.stats[48].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>50</td>
                                    <td className='px-6 '>{moredata.stats[10].value}</td>
                                    <td className='px-6 '>{moredata.stats[23].value}</td>
                                    <td className='px-6 '>{moredata.stats[36].value}</td>
                                    <td className='px-6 '>{moredata.stats[49].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>4</td>
                                    <td className='px-6 '>{moredata.stats[11].value}</td>
                                    <td className='px-6 '>{moredata.stats[24].value}</td>
                                    <td className='px-6 '>{moredata.stats[37].value}</td>
                                    <td className='px-6 '>{moredata.stats[50].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>6</td>
                                    <td className='px-6 '>{moredata.stats[12].value}</td>
                                    <td className='px-6 '>{moredata.stats[25].value}</td>
                                    <td className='px-6 '>{moredata.stats[38].value}</td>
                                    <td className='px-6 '>{moredata.stats[51].value}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className=' font-bold p-4 text-center'>IN Bowling</p>
                        <table className='mx-auto'>
                            <thead>
                                <tr className='p-2 bg-stone-400 font-semibold'>
                                    <td className='px-6 '></td>
                                    <td className='px-6 '>TEST</td>
                                    <td className='px-6 '>ODI</td>
                                    <td className='px-6 '>T20</td>
                                    <td className='px-6 '>IPL</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Matches</td>
                                    <td className='px-6 '>{moredata.stats[52].value}</td>
                                    <td className='px-6 '>{moredata.stats[64].value}</td>
                                    <td className='px-6 '>{moredata.stats[76].value}</td>
                                    <td className='px-6 '>{moredata.stats[88].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Innings</td>
                                    <td className='px-6 '>{moredata.stats[53].value}</td>
                                    <td className='px-6 '>{moredata.stats[65].value}</td>
                                    <td className='px-6 '>{moredata.stats[77].value}</td>
                                    <td className='px-6 '>{moredata.stats[89].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Wkts</td>
                                    <td className='px-6 '>{moredata.stats[56].value}</td>
                                    <td className='px-6 '>{moredata.stats[68].value}</td>
                                    <td className='px-6 '>{moredata.stats[80].value}</td>
                                    <td className='px-6 '>{moredata.stats[92].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Eco</td>
                                    <td className='px-6 '>{moredata.stats[59].value}</td>
                                    <td className='px-6 '>{moredata.stats[71].value}</td>
                                    <td className='px-6 '>{moredata.stats[83].value}</td>
                                    <td className='px-6 '>{moredata.stats[95].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>Avg</td>
                                    <td className='px-6 '>{moredata.stats[60].value}</td>
                                    <td className='px-6 '>{moredata.stats[72].value}</td>
                                    <td className='px-6 '>{moredata.stats[84].value}</td>
                                    <td className='px-6 '>{moredata.stats[96].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>5W</td>
                                    <td className='px-6 '>{moredata.stats[62].value}</td>
                                    <td className='px-6 '>{moredata.stats[74].value}</td>
                                    <td className='px-6 '>{moredata.stats[86].value}</td>
                                    <td className='px-6 '>{moredata.stats[98].value}</td>
                                </tr>
                                <tr className='border-b-[1px] border-white p-2 text-[14px]'>
                                    <td>10w</td>
                                    <td className='px-6 '>{moredata.stats[63].value}</td>
                                    <td className='px-6 '>{moredata.stats[75].value}</td>
                                    <td className='px-6 '>{moredata.stats[87].value}</td>
                                    <td className='px-6 '>{moredata.stats[99].value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default page