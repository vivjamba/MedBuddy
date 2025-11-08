"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authorizeFHIR, getClient } from './fhirAuth';

export default function Home() {
  const [user, setUser] = useState({ name: 'Log In' });

  // Helper to format FHIR HumanName
  const formatName = (nameArray) => {
    if (!Array.isArray(nameArray) || nameArray.length === 0) return 'Patient';
    const name = nameArray[0];
    const prefix = name.prefix?.join(' ') || '';
    const given = name.given?.join(' ') || '';
    const family = name.family || '';
    return [prefix, given, family].filter(Boolean).join(' ');
  };

  useEffect(() => {
    // Check if user is already logged in on page load
    (async () => {
      const client = await getClient();
      if (client) {
        let patient;
        if (client.patient && client.patient.id) {
          // EHR/Sandbox launch
          patient = await client.patient.read();
        } else if (client.user?.fhirUser) {
          // Standalone launch
          patient = await client.request(client.user.fhirUser);
        }

        if (patient) {
          setUser({ name: formatName(patient.name) });
        }
      }
    })();
  }, []);

  const handleLogin = async () => {
    await authorizeFHIR(); // redirects to SMART login
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo-area">
            <Link href="/" className="logo-link" aria-label="MedBuddy">
              <Image src="/logo.svg" alt="MedBuddy logo" width={36} height={36} />
              <span className="logo-text">MedBuddy</span>
            </Link>
          </div>
          <nav className="nav">
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/medications" className="nav-link">Medications</Link>
          </nav>
          <div
            className="user"
            onClick={handleLogin}
            style={{ cursor: 'pointer' }}
          >
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
  );
}
