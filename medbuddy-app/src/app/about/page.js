"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"

const About = () => {

  return (
    <div className="app">
      <Header></Header>

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

       <Footer></Footer>

    </div>
  );
};

export default About;
