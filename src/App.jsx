import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import WatchList from "./components/WatchList";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

let [watchlist,setWatchList]=useState([])

let handleAddtoWatchList=(movieObj)=>{
  let newWatchList=[...watchlist,movieObj]
  localStorage.setItem('moviesApp',JSON.stringify(newWatchList))
  setWatchList(newWatchList)
  console.log(newWatchList)
}

let handleRemoveFromWatchlist=(movieObj)=>{
  let filterWatchlist=watchlist.filter((movie)=>{
    return movie.id != movieObj.id
  })

 

  setWatchList(filterWatchlist)
  localStorage.setItem('moviesApp',JSON.stringify(filterWatchlist))
  console.log(filterWatchlist)

}

useEffect(()=>{
  let moviesFromLocalStorage=localStorage.getItem('moviesApp')
  if(!moviesFromLocalStorage){
    return
  }
  setWatchList(JSON.parse(moviesFromLocalStorage))
},[])

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
           <Route path="/" element={ <>  <Banner/> <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchList}  handleRemoveFromWatchlist={handleRemoveFromWatchlist }/></> } />
           <Route path="/watchlist" element={ <WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>} />
        
         

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
