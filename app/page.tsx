import { log } from 'console';
import Image from 'next/image'
import Results from './components/Results';
import React from 'react';

const API_KEY = process.env.API_KEY

export default async function Home({ searchParams}) {
  const genre = searchParams.genre || "fetchTrending";
  console.log(API_KEY)
  const res = await fetch(
    `https://api.themoviedb.org/3/${genre === 'fetchTopRated' ? "movie/top_rated" : "movie/popular"}?api_key=${API_KEY}&language=en-US&page=1`, {next : {revalidate : 10000}} );

    if(!res.ok){
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const results = data.results
    
  return (

    <div> <Results results={results}></Results> </div>


  )
}
