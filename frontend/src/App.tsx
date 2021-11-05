import { useEffect, useState } from 'react'
import * as C from './App.styles'
import * as PhotosServices from './services/photos'
import { Photo } from './types/Photo'


export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)
      const photos = await PhotosServices.getAll()
      setPhotos(photos)
      setLoading(false)
    }
    getPhotos()
  }, [])

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>
        {loading? (
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Carregando</div>
          </C.ScreenWarning>
        ) : (
          <C.PhotoList>
            {photos.map((item, index) => (
              <div key={index}>{item.name}</div>
            ))
            }
          </C.PhotoList>
        )}
      </C.Area>
    </C.Container>
  )
}