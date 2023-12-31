import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession } from 'next-auth/react'
import Dashboard from '@/components/dashboard'
import Singup from '@/components/singup'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  {session ?  (
    <Dashboard session={session} />
    )
  
  : (
    <Singup session={session} />
  )}
    </>)
}
