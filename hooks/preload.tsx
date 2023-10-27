import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default () => {

    const router=useRouter()

    useEffect(() => {
        router.prefetch('/subcribe')
        router.prefetch('/login')
        router.prefetch('/create')
    }, [])
    
}