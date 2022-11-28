import { useEffect, useState } from "react";
import prism from "prismjs";
import Head from "next/head";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Plugin.module.css";
import layoutStyles from "../../styles/Layout.module.css";
import { getAllPluginIds, getPluginData } from "../../lib/plugins";

import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-okaidia.css";

const DRONE = "drone";
const HARNESS = "harness";

export const getStaticPaths = () => {
  const paths = getAllPluginIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params: { id } }) => {
  const pluginData = getPluginData(id);
  return {
    props: {
      id,
      pluginData,
    },
  };
};

//return html list of properties
const getPropertiesMarkup = (properties) => {
  const listEntries = Object.entries(properties).map(
    ([key, { description, secret, type, required, defaultValue }]) => {
      return (
        <li className={styles.propertyListItem} key={key}>
          <div className={styles.propertyTags}>
            <h4 className={styles.propertyTitle}>{key}</h4>
            {type !== undefined && (
              <span className={styles.propertyType}>{type}</span>
            )}
            {required !== undefined && required ? (
              <span className={styles.propertyRequired}>required</span>
            ) : (
              <span className={styles.propertyOptional}>optional</span>
            )}
          </div>
          {description !== undefined && (
            <p className={styles.propertyDescription}>{description}</p>
          )}
          {secret && (
            <Link href="https://docs.drone.io/secret/">
              <a className={styles.propertySecret}>Secret recommended</a>
            </Link>
          )}
          {defaultValue !== undefined && (
            <p className={styles.propertyDefault}>
              Default: {defaultValue.toString() || "none"}
            </p>
          )}
        </li>
      );
    }
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Properties</h2>
      <ul className={styles.propertyList}>{listEntries}</ul>
    </section>
  );
};

const Plugin = ({
  pluginData: {
    id,
    title,
    author,
    repo,
    image,
    readme,
    description,
    logo,
    properties,
    example,
    cieExample,
    showOriginalLink,
  },
}) => {
  const router = useRouter();
  const [exampleType, setExampleType] = useState(DRONE);

  // enables syntax highlighting
  useEffect(() => {
    prism.highlightAll();
  }, [exampleType]);

  const headTitle = `Drone Plugins - ${title}`;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="og:title" content={headTitle} />
        <meta name="og:description" content={description} />
        <meta
          name="og:image"
          content="https://raw.githubusercontent.com/drone/brand/5087d8deb7924bddeb502551e00f1f9f6468e0ae/logos/vector/drone-logo-vector-dark.svg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/drone/brand/5087d8deb7924bddeb502551e00f1f9f6468e0ae/logos/vector/drone-logo-vector-dark.svg"
        />
      </Head>
      <nav className={layoutStyles.pluginHeader}>
        <Link href="/">
          <a className={layoutStyles.logo}>
            <Image
              src={`/logo.svg`}
              alt={`Harness logo`}
              height="25"
              width="115"
            />
          </a>
        </Link>
        <input
          type="text"
          placeholder="Search for the plugins that you want..."
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.key === "Enter") {
              router.push(`/?search=${e.target.value}`);
            }
          }}
          className={layoutStyles.pluginSearchInput}
        ></input>
        <Link href="https://github.com/drone/drone-plugin-index">
          <a className={layoutStyles.addButton}>Add a plugin</a>
        </Link>
        <Link href="/">
          <a className={layoutStyles.linkButton}>Plugins</a>
        </Link>
        <Link href="https://docs.drone.io/">
          <a className={layoutStyles.linkButton}>Documentation</a>
        </Link>
        <Link href="https://community.harness.io/c/drone/14">
          <a className={layoutStyles.linkButton}>Support</a>
        </Link>
      </nav>
      <article className={styles.container}>
        <div className={styles.breadCrumbs}>
          <Link href="/">
            <a>Drone plugins</a>
          </Link>
          <span>{` > ${title}`}</span>
        </div>
        <section className={styles.section}>
          <div className={styles.mainContent}>
            {logo && (
              <div className={styles.logo}>
                <Image
                  src={`/logos/${logo}`}
                  alt={`${logo}`}
                  height="44"
                  width="44"
                />
              </div>
            )}
            <div className={styles.titleSection}>
              <h1 className={styles.title}>{title}</h1>
              <h3 className={styles.author}>by {author}</h3>
            </div>
            <div className={styles.links}>
              <a href={repo} rel="noopener noreferrer">
                source
              </a>
              {readme && (
                <a href={readme} rel="noopener noreferrer">
                  readme
                </a>
              )}
              {image && (
                <a href={image} rel="noopener noreferrer">
                  image
                </a>
              )}
              {showOriginalLink && (
                <a
                  href={`https://github.com/drone/drone-plugin-index/blob/master/plugins/${id}/original.md`}
                >
                  Original doc
                </a>
              )}
            </div>
          </div>
          <hr className={styles.line} />
          <p className={styles.description}>{description}</p>
        </section>
        {example && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Example</h2>
            <div className={styles.exampleToggleContainer}>
              <div className={styles.exampleToggle}>
                <button
                  className={
                    exampleType === DRONE
                      ? styles.exampleToggleButtonActive
                      : styles.exampleToggleButtonInactive
                  }
                  onClick={() => {
                    setExampleType(DRONE);
                  }}
                >
                  Drone
                </button>
                <button
                  className={
                    exampleType === HARNESS
                      ? styles.exampleToggleButtonActive
                      : styles.exampleToggleButtonInactive
                  }
                  onClick={() => {
                    setExampleType(HARNESS);
                  }}
                >
                  Harness
                </button>
              </div>
            </div>
            {exampleType === DRONE && (
              <pre className="language-yaml">
                <code>{example}</code>
              </pre>
            )}
            {exampleType === HARNESS && (
              <pre className="language-yaml">
                <code>{cieExample}</code>
              </pre>
            )}
          </section>
        )}
        {properties && getPropertiesMarkup(properties)}
      </article>
    </>
  );
};

export default Plugin;
