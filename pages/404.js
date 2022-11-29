import Link from "next/link";
import styles from "../styles/404.module.css";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <Link href={`/`}>Drone Plugins Homepage</Link>
    </div>
  );
}
