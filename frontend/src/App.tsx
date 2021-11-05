import { useEffect, useState } from 'react'
import * as C from './App.styles'
import * as PhotosServices from './services/photos'
import { Photo } from './types/Photo'


export default function App() {
  const [photoList, setPhotoList] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)
      const photos = await PhotosServices.getAll()
      setPhotoList(photos)
      setLoading(false)
    }
    getPhotos()
  }, [])

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>
        
      </C.Area>
    </C.Container>
  )
}