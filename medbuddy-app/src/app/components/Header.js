"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { authorizeFHIR, getClient } from "@/app/fhirAuth";

const Header = () => {
  const [user, setUser] = useState({ name: "Log In" });

  const formatName = (nameArray) => {
    if (!Array.isArray(nameArray) || nameArray.length === 0) return "Log In";
    const name = nameArray[0];
    const prefix = name.prefix?.join(" ") || "";
    const given = name.given?.join(" ") || "";
    const family = name.family || "";
    return [prefix, given, family].filter(Boolean).join(" ");
  };

  const handleLogin = useCallback(async () => {
    await authorizeFHIR();
  }, []);

  useEffect(() => {
    (async () => {
      const client = await getClient();
      if (!client) return;
      let patient;
      if (client.patient && client.patient.id) {
        patient = await client.patient.read();
      } else if (client.user?.fhirUser) {
        patient = await client.request(client.user.fhirUser);
      }
      if (patient) {
        setUser({ name: formatName(patient.name) });
      }
    })();
  }, []);

  return (
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
        <div className="user" onClick={handleLogin} style={{ cursor: "pointer" }}>
          {user.name}
        </div>
      </div>
    </header>
  );
};

export default Header;
