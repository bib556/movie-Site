import React from 'react'
import {useEffect,useState} from "react";
import {useLocation,useParams,useNavigate} from "react-router-dom";
import {Link} from "react-router-dom"
import "./MovieWatch.css"
function MovieWatch() {
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const {movie} = location.state|| {};
    const [credits, setCredits] = useState(null);
    const [details, setDetails] = useState(null);
     const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

    useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setCredits(data);
      console.log(data)
    })
  }, [id]);

   useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
    .then((res)=>(res.json()))
    .then((data)=>{
        setDetails(data)
        console.log("details",data)
    })
   },[id])

    if(!movie){
        return <p> no movie data found . GO back and select movie</p>
    }
     const director = credits?.crew.find(person => person.job === "Director");
     const topCast = credits?.cast.slice(0, 5); 

  return (
    <div className ="movieWhole">
      <button onClick={() => navigate(-1)}>⬅️ Back</button>

       <div className="wholeDetail">
        <div className="imageSide">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>

        <div className="detailSide">
            <div className="side1">
             <h1>{movie.title}</h1>
         <p><strong>Director:</strong> {director?.name || "Unknown"}</p>
            </div>

            <div className="side2">
                {details ?<><p> {`${movie.release_date.split("-")[0]}  ${details.runtime} minutes, ${details.genres.map(g => g.name).join(', ')}`}</p>
              <p><strong>IMDB:⭐ {details.vote_average}</strong></p></>:(<p>still Loading...</p>)}
              
            </div>
            <div className="side3">
              
               <Link to ={`/watch/${movie.id}`} state = {{movie}}  className ="handleDisplay">
                  <button >watch Trailer</button>
                 </Link>
            
             <p id = "overview">{movie.overview}</p>
            </div>
        </div>

       </div>
       <h1>Cast of {movie.title}</h1>
       <div className="cast">
       
       {topCast ? (
  topCast.map((cast) => (
    <div className="singleCast" key={cast.id}>
      <img
        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
        alt={cast.name}
      />
      <p>{cast.name}</p> {/* ✅ Fix: "Name" should be lowercase */}
    </div>
  ))
) : (
  <p>Loading cast...</p>
)}

       </div>
    </div> 
  )
}

export default MovieWatch
