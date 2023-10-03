import React from 'react'
import NavBar from './NavBar'

function Layout({ children }: any) {
 return (
  <>
   <NavBar />
    <main>{children}</main>
  </>
 )
}

export default Layout
