import { Metadata } from "next";
import styles from "./about.module.scss";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <h2>ABOUT US</h2>
        <div className={styles.description}>
          <p>
            Welcome to the official explorer for The New York Times Best Seller
            list explorer.
          </p>
          <p>We hope you enjoy your stay!</p>
        </div>
      </div>
    </div>
  );
}
