import React from "react";
import WatchList from "./WatchList";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchList,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[40vh] w-[150px] bg-center bg-cover rounded-xl hover:scale-110 duration-300  flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() =>handleRemoveFromWatchlist(movieObj)}
          className="m-4 flex justify-center h-8 w-8 rounded-lg items-center bg-gray-900/60"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 rounded-lg items-center bg-gray-900/60"
        >
          &#128525;
        </div>
      )}
      <div className="text-white text-xl w-full text-center p-2  bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
