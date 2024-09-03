import { fetchFromTMDB } from "../service/tmdb.service.js";

async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomTv });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    res.json({ success: true, trailers: data.results });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.json({ success: true, content: data });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getSimilarTvs(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );

    res.json({ success: true, similar: data.results });
  } catch (err) {
    
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getTvsByCategory(req, res) {
    const { category } = req.params;
    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/tv/${category}?language=en-US`
      );
  
      res.json({ success: true, content: data.results });
    } catch (err) {
        if (err.message.includes("404")) {
          return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
  }

  async function getTvCredits(req, res) {
    const { id } = req.params;
  
      try {
        const data = await fetchFromTMDB(
          `https://api.themoviedb.org/3/tv/${id}/season/1/credits?language=en-US`
        );
       
        // console.log(data)
        res.json({ success: true, credits: data});
      } catch (err) {
        // console.log('facing error:', err)
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    }
  


export {
  getTrendingTv,
  getTvTrailers,
  getTvDetails,
  getSimilarTvs,
  getTvsByCategory,
  getTvCredits
};
