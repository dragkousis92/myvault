// @ts-nocheck 


import React from 'react'
import Image from 'next/image';
import { signOut } from "next-auth/react"
export default function Dashboard({session}) {
  return (
    <div className="container d-flex justify-content-center mt-5">

    <div className="card cardWidth">

      <div className="top-container">


        <div className="ml-3 mb-4">
          <h5 className="name">{session.user.name}</h5>
          <p className="mail">{session.user.email}</p>
        </div>
      </div>
      <button className="mt-4 mx-auto w-75" onClick={() => signOut()}>Sign out</button>
    </div>

  </div>
  )
}
