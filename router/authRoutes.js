import express from 'express'
import { login } from '../controller/authController'

const authRoutes = express.Router()

authRoutes.post('/login',login)

export default authRoutes