import express, { Router } from 'express'
import { SaveImageController } from '../controller/SaveImageController'
import { uploadImg } from '../middleware/uploadImage'
import { saveImageControllerFactory } from './factories/saveImageControllerFactory'

const router = Router()

router.post('/image', uploadImg, saveImageControllerFactory().handle)
router.use('/uploads', express.static('./uploads'))



export {
  router
}
