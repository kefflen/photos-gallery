import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { getDownloadURL, ref, listAll } from 'firebase/storage'


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