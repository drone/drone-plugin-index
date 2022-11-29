import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Card.module.css";

const Card = ({ pluginData }) => {
  const router = useRouter();
  const { id, title, tags, logo } = pluginData;
  const href = `/plugins/${id}`;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.pluginTitle}>
        <Link href={href}>{title}</Link>
      </div>
      {tags?.length && (
        <div className={styles.pillContainer}>
          {tags?.map((tag) => (
            <div key={tag} className={styles.pill}>
              {tag}
            </div>
          ))}
        </div>
      )}
      {logo && (
        <div className={styles.logo}>
          <Image
            src={`/logos/${logo}`}
            alt={`${logo}`}
            height="40"
            width="40"
          />
        </div>
      )}
      {/* TODO: HARDCODED - needs to be fixed */}
      {/* <div className={styles.infoContainer}>
        <div className={styles.downloads}>
          <Image
            src="/icons/download.svg"
            alt="download icon"
            height="16"
            width="16"
          />{" "}
          140 installs
        </div>
        <div className={styles.verified}>
          <Image
            src="/icons/tick.svg"
            alt="download icon"
            height="12"
            width="12"
          />{" "}
          verified
        </div>
      </div> */}
    </div>
  );
};

export default Card;
