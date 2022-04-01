import { useEffect } from "react";
import prism from "prismjs";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllPluginIds, getPluginData } from "../../lib/plugins";

import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-okaidia.css"

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
  const listEntries = Object.entries(properties).map(([key, {defaultValue, description, secret, type, required}]) => {
    return (
      <li className={utilStyles.propertyList} key={key}>
        <h4 className={utilStyles.propertyTitle}>{key}</h4>
        {description !== undefined && <p className={utilStyles.propertyValue}>{description}</p>}
        {type !== undefined && <p className={utilStyles.propertyValue}>type = {type}</p>}
        {defaultValue !== undefined && <p className={utilStyles.propertyValue}>default = {defaultValue || 'none'}</p>}
        {secret !== undefined && <p className={utilStyles.propertyValue}>secret = {secret.toString()}</p>}
        {required !== undefined && <p className={utilStyles.propertyValue}>required = {required.toString()}</p>}
      </li>
    );
  });

  return (
    <>
      <h3>Properties</h3>
      <ul>{listEntries}</ul>
    </>
  );
};

const Plugin = ({
  pluginData: {
    title,
    author,
    repo,
    image,
    license,
    readme,
    description,
    logo,
    properties,
    example,
    cieExample
  },
}) => {
  // enables syntax highlighting
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <section className={utilStyles.headerSection}>
          <h1 className={utilStyles.headingXl}>{title}</h1>
          <h2 className={utilStyles.lightText}>by {author}</h2>
          {logo && (
            <div className={utilStyles.logo}>
              <Image
                src={`/logos/${logo}`}
                alt={`${logo}`}
                height="64px"
                width="64px"
              />
            </div>
          )}
        </section>
        <p>{description}</p>
        {license && (
          <>
            <p>License - {license}</p>
          </>
        )}
        <a href={repo} rel="noopener noreferrer">
          source link
        </a>
        <br />
        {readme && (
          <>
            <a href={readme} rel="noopener noreferrer">
              readme link
            </a>
            <br />
          </>
        )}
        {image && (
          <a href={image} rel="noopener noreferrer">
            image link
          </a>
        )}
        {example && (
          <>
            <h3>Drone example</h3>
            <pre className="language-yaml">
              <code>{example}</code>
            </pre>
          </>
        )}
        {cieExample && (
          <>
            <h3>CIE example</h3>
            <pre className="language-yaml">
              <code>{cieExample}</code>
            </pre>
          </>
        )}
        {properties && getPropertiesMarkup(properties)}
      </article>
    </Layout>
  );
};

export default Plugin;
