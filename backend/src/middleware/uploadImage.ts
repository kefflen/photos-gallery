import multer from 'multer'

//Para pegar o path do aquivo: req.file.path
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

export const uploadImg = multer({storage}).single('image')