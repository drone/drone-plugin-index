import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import styles from "../styles/Home.module.css";
import { getSortedPluginsData } from "../lib/plugins";
import Card from "../components/card";

export const getStaticProps = async () => {
  const allPluginsData = getSortedPluginsData();
  return {
    props: {
      allPluginsData,
    },
  };
};

const tags = [
  "Deploy",
  "Publish",
  "AWS",
  "Cloudformation",
  "Lambda",
  "ECR",
  "ECS",
  "Amazon",
  "S3",
  "Storage",
  "Sync",
  "Infrastructure",
  "OPS",
  "Ansible",
  "Cloud Foundry",
];

const Home = ({ allPluginsData }) => {
  const [searchResults, setSearchResults] = useState(allPluginsData);

  return (
    <Layout home setSearchResults={setSearchResults} allPluginsData={allPluginsData}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.tagContainer}>
          <h4>Tags</h4>
          <div className={styles.pillContainer}>
            {tags?.map((tag) => (
              <div key={tag} className={styles.pill}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.mainContainer}>
          {/* TODO implement sort */}
          <div className={styles.sort}>
            <div className={styles.sortImage}>
              <Image
                src="/icons/sort.svg"
                alt="sort icon"
                height="21px"
                width="21px"
              />
            </div>
            <select className={styles.select}>
              <option value="name">Name</option>
              <option value="installs">Installs</option>
            </select>
          </div>
          <div className={styles.cards}>
            {searchResults.map((result) => (
              <Card pluginData={result} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
