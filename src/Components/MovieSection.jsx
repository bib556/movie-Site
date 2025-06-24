import React from 'react'
import {useRef} from "react";
import "./MovieSection.css"
import {Link} from "react-router-dom"; 

function MovieSection({popularMovies,currentMovies,upComingMovies}) {
    const scrollRef = useRef();
    const scrollLeft = ()=>{
        scrollRef.current.scrollLeft -= 300;
    }
    const scrollRight = ()=>{
        scrollRef.current.scrollLeft += 300;
    }

  return (
    <div>
            <div className="whole">
     <div className="popularMovies-wrapper">
      <div className="heading">
        <h2>Popular Movies  </h2>
      </div>
       
      <div className="popularMovies" ref = {scrollRef}>
      <button onClick={scrollLeft} className = "scrollButtonLeft">⬅️</button>
      {popularMovies.map((popularMovie)=>(
        <Link to ={`/movie/${popularMovie.id}`} state = {{movie:popularMovie}} key ={popularMovie.id} className ="popularCard">
        <img src={`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}` }  alt="movieImage" />
        <p className = "title">{popularMovie.title}</p>
        <p className = "title">{popularMovie.release_date.split("-")[0]}</p>
      </Link>
      ))}
      <button onClick={scrollRight} className = "scrollButtonRight">➡️</button>
      </div>
       
    </div>
 {/* NowPlaying Section  */}
     <div className="currentMovies-wrapper">
      <div className="heading1">
        <h2>Now Playing  </h2>
      </div>
       
      <div className="currentMovies" ref = {scrollRef}>
      <button onClick={scrollLeft} className = "currentButtonLeft">⬅️</button>
      {currentMovies.map((currentMovie)=>(
       <Link to ={`/movie/${currentMovie.id}`} state = {{movie:currentMovie}} key ={currentMovie.id} className = "currentCard">
        <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}` }  alt="movieImage" />
        <p className = "title">{currentMovie.title}</p>
        <p className = "title">{currentMovie.release_date.split("-")[0]}</p>
        </Link>
      ))}
      <button onClick={scrollRight} className = "currentButtonRight">➡️</button>
      </div>
       
    </div>
     {/* 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1' */}
    {/* upcoming movies  */}
      <div className="upComing-wrapper">
      <div className="heading1">
        <h2>upComing Movies </h2>
      </div>
       
      <div className="upComingMovies" ref = {scrollRef}>
      <button onClick={scrollLeft} className = "currentButtonLeft">⬅️</button>
      {upComingMovies.map((upComingMovie)=>(
       <Link to ={`/movie/${upComingMovie.id}`} state = {{movie:upComingMovie}} key ={upComingMovie.id} className = "upComingCard">
        <img src={`https://image.tmdb.org/t/p/w500${upComingMovie.poster_path}` }  alt="movieImage" />
        <p className = "title">{upComingMovie.title}</p>
        <p className = "title">{upComingMovie.release_date.split("-")[0]}</p>
        </Link>
      ))}
      <button onClick={scrollRight} className = "currentButtonRight">➡️</button>
      </div>
       
    </div>

    </div>
      
    </div>
  )
}

export default MovieSection;
