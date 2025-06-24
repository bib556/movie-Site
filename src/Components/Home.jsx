import React, { useEffect, useState } from 'react';
import './Home.css';

function Home({ currentMovies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!currentMovies || currentMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < currentMovies.length ? prevIndex + 1 : 0 // loop back to start
      );
    }, 5000); // Change every 1 second

    return () => clearInterval(interval);
  }, [currentMovies]);

  if (!currentMovies || currentMovies.length === 0) {
    return <p>Loading...</p>;
  }

  const movie = currentMovies[currentIndex];
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
  return (
    <div className="homeImage" style={{height:"90vh",width:"100vw",backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",position:"relative"}}>
      {/* <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
        style={{ width: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px' }}
      /> */}
      <div className="description">
        <h1>Go ahead, Watch Free</h1>
        <p>With NepaliFlix you can watch over 300 free movies <br />
          plus live Tv on almost any device. What are you waiting for
        </p>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
