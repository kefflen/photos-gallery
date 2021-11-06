import { Request } from 'express'
import multer from 'multer'


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    let { originalname } = file
    let createdAt = Date.now()
    let randomNumber = Math.round(Math.random() * 10000)
    cb(null, `${createdAt}-${randomNumber}-${originalname}`)
  }
})

function fileFilter (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export const uploadImg = multer({storage, fileFilter}).single('image')