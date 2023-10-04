import { useEffect } from 'react'
export default function useRem() {
  const setRem = async () => {
    await require('lib-flexible')
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setRem()
    window.addEventListener('resize', setRem)
    return ()=>{
      window.removeEventListener('resize', setRem)
    }
  }, [])
}