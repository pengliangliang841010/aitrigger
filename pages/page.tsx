import { HomepageCounter } from '../components/Counter'
import Link from 'next/link'
import React from 'react'
import { storeWrapper } from '../store'
import { increment } from '../store/counter/counterActions'
import { NextPage } from 'next'

/**
 * Homepage
 */
const ResetPage: NextPage = () => {
  return (
    <main>
      <Link href={'/'}>back</Link>
      <HomepageCounter />
    </main>
  )
}

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(increment)
    return { props: {} }
  }
)

export default ResetPage