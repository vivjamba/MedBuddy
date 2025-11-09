"use client";

import Image from "next/image";
import Link from "next/link"; 
import { useState } from "react";

const Header = () => {  
    
    const [user] = useState({ name: "Log In" });
    
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

        <div className="user">{user.name}</div>
    </div>
    </header> 
    )
}
export default Header;