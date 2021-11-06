import express, { Router } from 'express'
import { uploadImg } from '../middleware/uploadImage'
import { getImagesControllerFactory } from './factories/getImagesControllerFactory'
import { saveImageControllerFactory } from './factories/saveImageControllerFactory'

const router = Router()

router.post('/', uploadImg, saveImageControllerFactory().handle)
router.get('/', getImagesControllerFactory().handle)



export {
  router
}
