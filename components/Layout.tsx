import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

function Layout({ children }: any) {
 return (
  <>
   <NavBar />
    <main>{children}</main>
    <Footer/>
  </>
 )
}

export default Layout
