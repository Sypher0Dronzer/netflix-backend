import express from 'express'
import { getCastDetails } from '../controllers/cast.controller.js'

const route=express.Router()

route.get('/:id',getCastDetails)

export default route