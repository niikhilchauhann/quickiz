import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
      <p className="logo">Quickiz</p>
      <Link href="/">Home</Link>{" | "}
      <Link href="/visualizer">Visualizer</Link>{" | "}
      <Link href="/algorithms">Algorithms</Link>{" | "}
      <Link href="/playground">Playground</Link>
    </nav>
  );
}
