import Link from "next/link";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Logo />

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/visualizer">Visualizer</Link>
        <Link href="/algorithms">Algorithms</Link>
        <Link href="/playground">Playground</Link>
      </div>
    </nav>
  );
}
