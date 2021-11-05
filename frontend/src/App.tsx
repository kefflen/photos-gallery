import { FormEvent, useEffect, useState } from 'react'
import * as C from './App.styles'
import { PhotoItem } from './components/PhotoItem'
import * as PhotosServices from './services/photos'
import { Photo } from './types/Photo'


export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)
      const photos = await PhotosServices.getAll()
      setPhotos(photos)
      setLoading(false)
    }
    getPhotos()
  }, [])

  function renderPhotos() {
    if (photos.length === 0) {
      return (
        <C.ScreenWarning>
          <div className="emoji">😔</div>
          <div>Não tem photos cadastradas</div>
        </C.ScreenWarning>
      )
    } else {
      return (
        <C.PhotoList>
          {photos.map((item, index) => (
            <PhotoItem key={index} name={item.name} url={item.url} />
          ))}
        </C.PhotoList>
      )
    }
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File
    if (file && file.size > 0) {
      setUploading(true)
      let result = await PhotosServices.insert(file)
      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`)
      } else {
        let newPhotosList = [...photos, result]
        setPhotos(newPhotosList)
      }

      setUploading(false)
    }
  }
  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>

        <C.UploadForm method='POST' onSubmit={handleFormSubmit}>
          <input type="file" name="image" id="imageFile" />
          <input type="submit" value="Enviar" />
          {uploading&& 'enviando...'}
        </C.UploadForm>

        {loading ? (
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Carregando</div>
          </C.ScreenWarning>
        ) : (
          renderPhotos()
        )}
      </C.Area>
    </C.Container>
  )
}
