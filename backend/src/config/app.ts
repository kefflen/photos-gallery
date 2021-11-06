import express from 'express'
import { router } from './routes'

const app = express()

app.use('/uploads', express.static('./uploads'))
app.use('/images', router)



export default app