import React from 'react'
import "./Navbar.css"
import {useState,useEffect,useCallback} from "react"
import {useNavigate} from "react-router-dom"
import debounce from "lodash.debounce"
function Navbar({apiKey}) {
    const [query,setQuery] = useState("");
    const [results,setResults] = useState([]);
    const navigate = useNavigate();
    

     const fetchMovies = async (searchTerm)=>{
      if(!searchTerm.trim()) return setResults([]);
      try{
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
        const data = await res.json();
        setResults(data.results || [])
      }catch(error){
        console.log("fetch error",error)
      }
     };

    const debouncedFetch = useCallback(
      debounce((term) => {
        fetchMovies(term);
      },500),
      []
    );

    useEffect(()=>{
      debouncedFetch(query);

      return ()=>{
        debouncedFetch.cancel();
      };
      
    },[query,debouncedFetch])

    const handleSelectMovie =(movie)=>{
        navigate(`/movie/${movie.id}`, { state: { movie } });
        setQuery("");
        setResults([])
    }
  return (
    <div>
      <div className="nav">
        <div className="logo">
            <h1>Nepali<span id = "separate">Flix</span></h1>
            <div className="searchBar">
                <form onSubmit = {(e)=> e.preventDefault()}>
                  <input type="text" placeholder="search movie here.." value={query} onChange ={(e)=>{setQuery(e.target.value)}} /> 

                </form>
                { query.length > 0 && (
                    <ul className = "searchResults">
                        {results.map(movie=>(
                            <li key = {movie.id} onClick ={()=>handleSelectMovie(movie)}>{movie.title}</li>
                        ))}
                 </ul>
                )} 
            </div>
           
        </div>
        <div className="category">
            <ul>
                 <li><a href=""> Categories</a></li>
            <li><a href="">signIn</a></li>
            </ul>
           
        </div>
      </div>
    </div>
  )
}

export default Navbar
