import express from 'express'
import { getMovieCredits, getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers/movie.controller.js'

const route=express.Router()

route.get('/trending',getTrendingMovie)
route.get('/:id/trailers',getMovieTrailers)
route.get('/:id/details',getMovieDetails)
route.get('/:id/similar',getSimilarMovies)
route.get('/:id/credits',getMovieCredits)
route.get('/:category',getMoviesByCategory)



export default route