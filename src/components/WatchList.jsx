import React, { useEffect, useState } from 'react'
import Genreids from '../utility/Genreids'




function WatchList({watchlist,setWatchList,handleRemoveFromWatchlist}) {

const[search,setSearch]=useState('')
const[genreList,setGenreList]=useState(['All Genres'])
const[currGenre,setCurrGenre]=useState('All Genre')

let handleSearch=(e)=>{
setSearch(e.target.value)

}

let handleFilter=(genre)=>{
  setCurrGenre(genre)
}

let sortIncreasing=()=>{
let sortedIncreasing=watchlist.sort((movieA,movieB)=>{
  return movieA.vote_average-movieB.vote_average
})

setWatchList([...sortedIncreasing])
}

let sortDecreasing=()=>{
 let sortedDecreasing=watchlist.sort((movieA,movieB)=>{
  return movieB.vote_average-movieA.vote_average
 })
 setWatchList([...sortedDecreasing])
}

useEffect(()=>{
  let temp=watchlist.map((movieObj)=>{
    return Genreids[movieObj.genre_ids[0]]
  })
  temp=new Set(temp)
  setGenreList(['All Genres',...temp])
  console.log(temp)
},[watchlist])

  return (
    <>

    <div className='flex justify-center flex-wrap m-4 cursor-pointer'>
      {genreList.map((genre)=>{
          return <div onClick={()=>handleFilter(genre)} className={currGenre==genre?'bg-blue-400 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center mx-4':'bg-gray-400/50 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center mx-4'}>{genre}</div>
      })}
    </div>

    <div className='flex justify-center my-4'> 
      <input onChange={handleSearch} value={search} type='text' placeholder='search movies' className='w-[18rem] h-[3rem] bg-gray-200 outline-none px-4'/> 
    </div>

    <div className=' rounded-xl overflow-hidden border border-gray-200 m-8'>
      <table className='w-full text-gray-500 text-center'>
        <thead className='border-b-2 cursor-pointer'>
        <tr>
              <th>Name</th>
              <th className='flex justify-center'>
              <div onClick={sortIncreasing} className='p-2'><i class="fa-solid fa-arrow-up"></i></div>
              <div className='p-2'>Ratings</div>
              <div onClick={sortDecreasing} className='p-2'><i class="fa-solid fa-arrow-down"></i></div>
              </th>
             
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody >
            {watchlist.filter((movieObj)=>{
              if(currGenre=='All Genres'){
                return true
              }
              else{
                return Genreids[movieObj.genre_ids[0]]==currGenre
              }
            }).filter((movieObj)=>{
              return movieObj.title.toLowerCase().includes(search.toLowerCase())
            }).map((movieObj)=>{
              return  <tr className='border-b-2 cursor-pointer'>
              <td className='flex items-center px-6 py-4'>
              <img className='w-[10rem] h-[6rem]' src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}/>
              <div className='mx-10 cursor-pointer'>{movieObj.title}</div>
              </td>
              <td>{movieObj.vote_average}</td>
              <td>{movieObj.popularity}</td>
              <td>{Genreids[movieObj.genre_ids[0]]}</td>
              <td onClick={()=>handleRemoveFromWatchlist(movieObj)} className='text-red-800 cursor-pointer'>Delete</td>
             </tr>
            })}
          

            
          </tbody>
       
      </table>
    </div>
    </>
  )
}

export default WatchList