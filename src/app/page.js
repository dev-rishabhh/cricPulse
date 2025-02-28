
import MatchCard from "./components/match";
import Loader from "./components/loader";

export default async function Home() {

  const apiKey=process.env.NEXT_PUBLIC_CRICKET_API_KEY;
  

  const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`);
  const data = await res.json()
  return (
    <div className="container mx-auto p-4 min-h-[100vh]">
      <h1 className="text-3xl font-bold text-center p-2">All Matches</h1>
      {!data && <Loader />}
      <section className="py-3 px-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((data,idx)=><MatchCard data={data} key={idx}/>)}
      </section>
    </div>
  );
}
