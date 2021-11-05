import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { getDownloadURL, ref, listAll, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

export async function getAll() {
  let list: Photo[] = []

  const imagesFolder = ref(storage, 'images')
  const photoList = await listAll(imagesFolder)
  for (let item of photoList.items) {
    let photoUrl = await getDownloadURL(item)
    list.push({
      name: item.name,
      url: photoUrl
    })
  }

  return list
}

export async function insert(file: File): Promise<Photo|Error> {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    let randomName = uuid()
    let newFile = ref(storage, `images/${randomName}`)
    let upload = await uploadBytes(newFile, file)
    
    let photoUrl = await getDownloadURL(upload.ref)
    return {
      name: upload.ref.name,
      url: photoUrl
    }
  } else return new Error("Formato invalido de arquivo.")
}