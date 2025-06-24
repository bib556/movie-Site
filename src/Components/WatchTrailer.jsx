import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function WatchTrailer() {
  const { id } = useParams();
  const location = useLocation();
  const { movie } = location.state || {};
// https://api.themoviedb.org/3/movie/${id}/videos?api_key=264cab42ecb315dce2fd92bd9d316dae
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=264cab42ecb315dce2fd92bd9d316dae`)
      .then(res => res.json())
      .then(data => {
        const trailer = data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        if (trailer) {
          setVideoKey(trailer.key);
        }
      });
  }, [id]);
  // --url 'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US'
  return (
    <div >
      {videoKey ? (
        <iframe
          width="100%"
          height="800px"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Movie trailer...loading</p>
      )}
    </div>
  );
}

export default WatchTrailer;
