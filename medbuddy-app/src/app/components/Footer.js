"use client";

const Footer = () => {  
    
    return ( 
      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} MedBuddy</span>
          <div className="names">
            <span>Vivien Jamba</span>
            <span>Pulkit Saxena</span>
          </div>
        </div>
      </footer>
    )
}
export default Footer;