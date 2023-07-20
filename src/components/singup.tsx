import React from 'react'
import {  signIn } from "next-auth/react"


export default function Singup({session}) {
  return (
    <div className="container">
    <div className="row">
      <div className="mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                <button className="btn btn-google btn-login text-uppercase fw-bold mx-auto" onClick={() => signIn()} type="submit">
                  <i className="fab fa-google me-2"></i> Sign in with Github
                </button>

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
