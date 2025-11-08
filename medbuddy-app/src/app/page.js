"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { connectToFHIR } from './fhirAuth'

const Home = () => {
  const [user, setUser] = useState({ name: 'Log In' })

  const handleLogin = async () => {
    const client = await connectToFHIR()
    if (client) {
      const patient = await client.patient.read()
      setUser({ name: patient.name ? patient.name[0].text : 'Patient' })
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo-area">
            <Link href="/" className="logo-link" aria-label="MedBuddy">
              <Image src="/logo.svg" alt="MedBuddy logo" width={36} height={36} className="logo-img" />
              <span className="logo-text">MedBuddy</span>
            </Link>
          </div>
          <nav className="nav">
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/medications" className="nav-link">Medications</Link>
          </nav>
          <div className="user" onClick={handleLogin} style={{ cursor: 'pointer' }}>
            {user.name}
          </div>
        </div>
      </header>

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

      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} MedBuddy</span>
          <div className="names">
            <span>Vivien Jamba</span>
            <span>Pulkit Saxena</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
