import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import { useRouter } from 'next/router'
import Discount from './Discount'

function Layout({ children }: any) {

  const router = useRouter()

  return (
    <>
      {/* 只在首页出现 */}
      {router.pathname === "/" && <Discount />}
      
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
