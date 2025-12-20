// import styles from "./Home.module.css";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main className={styles.page}>
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <h1 className={styles.title}>Quickiz</h1>

//           <p className={styles.subtitle}>
//             Visualize Data Structures. <strong>Understand Algorithms.</strong>
//             <br />
//             Master Memory.
//           </p>

//           <div className={styles.actions}>
//             <Link href="/visualizer" className={styles.primaryBtn}>
//               Start Visualizing
//             </Link>

//             <Link href="/algorithms" className={styles.secondaryBtn}>
//               Explore Algorithms
//             </Link>
//           </div>
//         </div>

//         {/* Decorative right side (empty for now, ready for SVG/animation) */}
//         <div className={styles.heroVisual} />
//       </section>
//     </main>
//   );
// }
"use client";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import Link from "next/link";
import Image from "next/image";


export default function HomePage() {
  
  return (
    
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      
      <section className={styles.hero}>
        {/* <div className={styles.heroContent}> */}
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className={styles.title}>Quickiz</h1>
          <p className={styles.subtitle}>
            Visualize Data Structures. Understand Algorithms.
            <br />
            Master Memory.
          </p>
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/visualizer" className={styles.primaryBtn}>
              Start Visualizing
            </Link>

            <Link href="/algorithms" className={styles.secondaryBtn}>
              Explore Algorithms
            </Link>
          </motion.div>
        </motion.div>

      <div className={styles.heroVisual}>
        <Image
          src="/hero.png"
          alt="Algorithm visualization illustration"
          fill
          priority
          className={styles.heroImage}
        />
      </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className={styles.features}>
        <FeatureCard
          title="Sorting Algorithms"
          description="See how sorting works step by step with visual comparisons."
        />
        <FeatureCard
          title="Tree Structures"
          description="Explore traversals, recursion, and hierarchical data."
        />
        <FeatureCard
          title="Memory Visualization"
          description="Understand stack vs heap and how memory is allocated."
        />
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.featureCard}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
