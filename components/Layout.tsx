import React from "react";
import Navbar from "./Navbar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            &copy; {new Date().getFullYear()} Solid Gold Stranger. All rights
            reserved.
          </p>
          <div className={styles.socialLinks}>
            {/* Add social media links here if needed */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
