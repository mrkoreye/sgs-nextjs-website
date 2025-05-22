import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when navigating
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logoContainer} onClick={closeMenu}>
          <h1 className={styles.logo}>Solid Gold Stranger</h1>
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <div className={`${styles.menuIcon} ${isOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Navigation Links */}
        <div className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
          <ul>
            <li>
              <Link
                href="/"
                className={router.pathname === "/" ? styles.active : ""}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shows"
                className={router.pathname === "/shows" ? styles.active : ""}
                onClick={closeMenu}
              >
                Shows
              </Link>
            </li>
            <li>
              <Link
                href="/music"
                className={router.pathname === "/music" ? styles.active : ""}
                onClick={closeMenu}
              >
                Music
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={router.pathname === "/about" ? styles.active : ""}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={router.pathname === "/contact" ? styles.active : ""}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
