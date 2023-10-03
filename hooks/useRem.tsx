import { useEffect } from 'react'
export default function useRem() {
  const setRem = async () => {
    await require('lib-flexible')
  }
  useEffect(() => {
    setRem()
    window.addEventListener('resize', setRem)
    return ()=>{
      window.removeEventListener('resize', setRem)
    }
  }, [])
}