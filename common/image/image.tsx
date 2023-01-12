import { useCookies } from 'react-cookie'
import Image from 'next/image'

export const ImageBackground = () => {
  const cookies = useCookies(['theme_preference'])

  return (
    <Image
      src={cookies[0].theme_preference === 'light' ? '/light.png' : '/dark.png'}
      priority
      fill
      alt=""
      style={{ zIndex: -5 }}
    />
  )
}
