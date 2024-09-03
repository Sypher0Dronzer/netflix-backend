import { fetchFromTMDB } from "../service/tmdb.service.js";

export async function getCastDetails(req, res) {
    const { id } = req.params;
  
      try {
        const castDetails = await fetchFromTMDB(
          `https://api.themoviedb.org/3/person/${id}?language=en-US`
        );
        const moviesCasted=await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`)

        const tvCasted=await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`)

        
        res.json({ success: true, castDetails: castDetails, movies:moviesCasted,tvs:tvCasted});
      } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    }