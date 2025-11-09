"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Header from "./components/Header"
import Footer from "./components/Footer"

const Home = () => {

  return (
    <div className="app">
      <Header></Header>
            <main className="main">
                <div className="main-inner">
                    <h1 className="title">Your Connected Medication Companion</h1>
                    <p className="subtitle">
                        Manage prescriptions, log adherence, and track progress securely with FHIR-connected healthcare data.
                    </p>
                    <div className="buttons">
                        <Link href="/medications" className="btn btn-blue">View Medications</Link>
                        <Link href="/about" className="btn btn-dark">Learn More</Link>
                    </div>
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
}

export default Home