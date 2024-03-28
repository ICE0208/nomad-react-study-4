import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link
        className={styles.link}
        href="/"
      >
        Home
      </Link>
      <Link
        className={styles.link}
        href="/about"
      >
        About
      </Link>
    </div>
  );
}
