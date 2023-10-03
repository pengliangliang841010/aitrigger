import { useState } from 'react'

export default() => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    return {
        isLogin, setIsLogin
    }
  }