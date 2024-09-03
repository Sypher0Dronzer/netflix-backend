import express from "express";
import {
  getTvDetails,
  getTvsByCategory,
  getTvTrailers,
  getSimilarTvs,
  getTrendingTv,
  getTvCredits,
} from "../controllers/tv.controller.js";

const route = express.Router();

route.get("/trending", getTrendingTv);
route.get("/:id/trailers", getTvTrailers);
route.get("/:id/details", getTvDetails);
route.get("/:id/similar", getSimilarTvs);
route.get("/:id/credits", getTvCredits);
route.get("/:category", getTvsByCategory);

export default route;
