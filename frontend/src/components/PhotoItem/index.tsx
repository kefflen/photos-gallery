import * as C from './styles'
type props = {
  name: string
  url: string
}
export function PhotoItem({ name, url }: props) {
  return (
    <C.Container>
      <img src={url} alt={name} />
      {name}
    </C.Container>
  )
}