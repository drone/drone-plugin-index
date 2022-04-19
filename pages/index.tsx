import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout, { siteTitle } from "../components/Layout";
import styles from "styles/Home.module.css";
import { getSortedPluginsData } from "lib/plugins";
import Card from "components/Card";
import { PluginData } from "types/index";

export const getStaticProps = () => {
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

type HomeProps = {
  allPluginsData: PluginData[];
};

const Home = ({ allPluginsData }: HomeProps) => {
  const [searchResults, setSearchResults] =
    useState<PluginData[]>(allPluginsData);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Layout
        home
        setSearchResults={setSearchResults}
        allPluginsData={allPluginsData}
      >
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
                <Card key={result.id} pluginData={result} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
