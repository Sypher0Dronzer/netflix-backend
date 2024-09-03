import express from 'express'
import { authCheck, login, logout, signup } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const route=express.Router()

route.post('/signup',signup)

route.post('/login',login)

route.post('/logout',logout)
route.get('/authcheck',protectRoute, authCheck)

export default route