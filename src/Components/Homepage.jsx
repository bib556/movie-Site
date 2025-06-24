import React from 'react'
import {useEffect, useState} from "react"

import MovieSection from "./MovieSection.jsx"
import Home from "./Home.jsx"
import Navbar from "./Navbar.jsx"


function Homepage() {
    const [popularMovies, setPopularMovies] = useState([]);
    const[currentMovies,setCurrentMovies] = useState([]);
    const [upComingMovies,setUpComingMovies] = useState([])
    const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
    // console.log("this is apiKey",apiKey)


    useEffect(()=>{
      fetch( `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
      .then((res)=>res.json())
      .then((data)=>{
        setUpComingMovies(data.results)
      })
    },[])
   
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        
        setPopularMovies(data.results); // `results` is an array of movies
        console.log(data)
      });
     
  }, []);

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
    .then((res)=>res.json())
    .then((data)=>{
      setCurrentMovies(data.results)
    })
  },[])

  return (
    <>
    <Navbar apiKey ={apiKey}></Navbar>
    <Home currentMovies ={currentMovies} apiKey ={apiKey}></Home>
    <MovieSection popularMovies ={popularMovies} currentMovies ={currentMovies} upComingMovies={upComingMovies} ></MovieSection>
    </>
  )
}

export default Homepage
