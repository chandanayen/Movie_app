import React, {useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({handleAddtoWatchList,handleRemoveFromWatchlist,watchlist}) {

  const [movies,setMovies]=useState([])
  const[pageNo,setPageNo]=useState(1)

  const handlePrev=()=>{
    if(pageNo===1){
      setPageNo(pageNo)
    }
    else{
      setPageNo(pageNo-1)
    }
  }

  const handleNext=()=>{
 setPageNo(pageNo+1)
  }

useEffect(()=>{
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8680ed4713dc170d5428e0ff944ff3cb&language=en-US&page=${pageNo}`).then(function(res){
    console.log(res.data.results)
    setMovies(res.data.results)
  })
},[pageNo])



  return (
    <div className='p-5'>
        <div className='font-bold text-2xl m-5 text-center'>
            Trending Movies
        </div>
        <div className='flex flex-row flex-wrap justify-around  gap-5'>
            {movies.map((movieObj)=>{
              return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist}/>
            })}
        </div>

        <Pagination pageNo={pageNo}  handleNext={handleNext} handlePrev={handlePrev}/>
    </div>
  )
}

export default Movies



/*https://api.themoviedb.org/3/movie/popular?api_key=8680ed4713dc170d5428e0ff944ff3cb&language=en-US&page=1*/