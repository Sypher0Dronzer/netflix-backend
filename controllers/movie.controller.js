import { fetchFromTMDB } from "../service/tmdb.service.js";

async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    res.json({ success: true, trailers: data.results });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.json({ success: true, content: data });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
    );

    res.json({ success: true, similar: data.results });
  } catch (err) {
    
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US`
      );
  
      res.json({ success: true, content: data.results });
    } catch (err) {
        if (err.message.includes("404")) {
          return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
  }
  
  

  async function getMovieCredits(req, res) {
  const { id } = req.params;

    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
      );
      
      res.json({ success: true, credits: data});
    } catch (err) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }


export {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
  getMovieCredits
};
