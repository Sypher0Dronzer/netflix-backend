import express from 'express'
import {searchMovie,searchPerson,searchTv,removeItemFromSearchHistory,getSearchHistory  } from '../controllers/search.controller.js'


const route=express.Router()

route.get('/person/:query',searchPerson)
route.get('/movie/:query',searchMovie)
route.get('/tv/:query',searchTv)

route.get('/history',getSearchHistory)

route.delete("/history/:id",removeItemFromSearchHistory)


export default route