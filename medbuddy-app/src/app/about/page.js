"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const About = () => {
  const [user] = useState({ name: "Log In" });

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-area">
            <Link href="/" className="logo-link" aria-label="MedBuddy">
              <Image
                src="/logo.svg"
                alt="MedBuddy logo"
                width={36}
                height={36}
                className="logo-img"
              />
              <span className="logo-text">MedBuddy</span>
            </Link>
          </div>

          <nav className="nav">
            <Link href="/about" className="nav-link active">
              About
            </Link>
            <Link href="/medications" className="nav-link">
              Medications
            </Link>
          </nav>

          <div className="user">{user.name}</div>
        </div>
      </header>

      {/* Main content */}
      <main className="main">
        <div className="main-inner">
          <h1 className="title">About MedBuddy</h1>
          <p className="subtitle">
            MedBuddy is a connected health companion designed to simplify your
            medication management. It allows you to securely sync with your
            healthcare data, track doses, set reminders, and share adherence
            reports with your care team.
          </p>

          <p className="subtitle">
            Our goal is to empower patients and clinicians through smart,
            interoperable health data — powered by FHIR standards.
          </p>

          <div className="buttons">
            <Link href="/" className="btn btn-blue">
              Back to Home
            </Link>
            <Link href="/medications" className="btn btn-dark">
              View Medications
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
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
};

export default About;
