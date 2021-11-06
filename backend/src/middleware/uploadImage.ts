import { Request } from 'express'
import multer from 'multer'
import fs from 'fs'


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },

  filename: function(req, file, cb) {
    let { originalname } = file
    let filename = `${Date.now()} - ${originalname}`
    console.log({filename})
    let resolvedFilename = resolveFileName(filename)
    if (!resolvedFilename) return cb(new Error("File has a invalid format"), 'teste')
    return cb(null, resolvedFilename)
  }
})

function resolveFileName(nameToResolve: string) {
  let finalName
  let tempName = nameToResolve
  let exist = 0
  if (nameToResolve.split(".").length != 2) return null
  while (!finalName || exist > 100) {
    if (fs.existsSync(tempName)) {
      exist++
      let [filename, extension ] = nameToResolve.split('.')
      tempName = filename + ` (${exist}).` + extension
    } else {
      finalName = tempName
    }
  }
  return finalName
}

function fileFilter (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export const uploadImg = multer({storage, fileFilter}).single('image')