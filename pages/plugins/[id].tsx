import { useEffect } from "react";
import { highlightAll } from "prismjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/Plugin.module.css";
import { getAllPluginIds, getPluginData } from "lib/plugins";
import { PluginData, Property } from "types";

import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-okaidia.css";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPluginIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params: { id } }) => {
  const pluginData = getPluginData(id);
  return {
    props: {
      id,
      pluginData,
    },
  };
};

//return html list of properties
const getPropertiesMarkup = (properties: Property[]) => {
  const listEntries = Object.entries(properties).map(
    ([key, { description, secret, type, required }]) => (
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
        {/* {defaultValue !== undefined && (
            <p className={styles.propertyValue}>
              default = {defaultValue || "none"}
            </p>
          )} */}
      </li>
    )
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Properties</h2>
      <ul className={styles.propertyList}>{listEntries}</ul>
    </section>
  );
};

type PluginProps = {
  pluginData: PluginData;
};

const Plugin: NextPage<PluginProps> = ({
  pluginData: {
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
  },
}) => {
  // enables syntax highlighting
  useEffect(() => {
    highlightAll();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
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
                <>
                  <a href={readme} rel="noopener noreferrer">
                    readme
                  </a>
                </>
              )}
              {image && (
                <a href={image} rel="noopener noreferrer">
                  image
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
            <pre className="language-yaml">
              <code>{example}</code>
            </pre>
          </section>
        )}
        {cieExample && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Example</h2>
            <pre className="language-yaml">
              <code>{cieExample}</code>
            </pre>
          </section>
        )}
        {properties && getPropertiesMarkup(properties)}
      </article>
    </Layout>
  );
};

export default Plugin;
