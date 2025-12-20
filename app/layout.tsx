import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Quickiz - DSA Visualizer",
  description: "Visualize data structures and algorithms step by step",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
