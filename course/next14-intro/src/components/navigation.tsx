import Link from "next/link";
import styles from "@/styles/navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <h2>
            <Link href={"/"}>Home</Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link href={"/about-us"}>AboutUs</Link>
          </h2>
        </li>
      </ul>
    </nav>
  );
}
