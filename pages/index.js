import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import layoutStyles from "../styles/Layout.module.css";
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

const search = (searchTerm, selectedTag, allPluginsData) => {
  return allPluginsData.filter((pluginData) => {
    // join tags into a single string instead of looping through each
    return selectedTag
      ? pluginData.title
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() ?? "") &&
          pluginData.tags
            .join()
            .toLowerCase()
            .includes(selectedTag?.toLowerCase() ?? "")
      : pluginData.title
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() ?? "");
  });
};

const TagButton = ({ tag, isSelected, setSelectedTag }) => (
  <button
    onClick={() => {
      setSelectedTag(tag);
    }}
    className={isSelected ? styles.tagButtonActive : styles.tagButtonInactive}
  >
    {tag || "All"}
    {isSelected && (
      <Image
        src="/icons/rightArrow.svg"
        alt="right arrow"
        height="12px"
        width="12px"
      />
    )}
  </button>
);

const Home = ({ allPluginsData }) => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState(allPluginsData);
  const [selectedTag, setSelectedTag] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if(router.query.search) {
      setSearchTerm(router.query.search);
    }
  }, [router.query.search]);

  useEffect(() => {
    setSearchResults(search(searchTerm, selectedTag, allPluginsData));
  },[searchTerm, selectedTag, allPluginsData]);

  return (
    <>
      <Head>
        <title>Drone Plugins</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Catalog of Drone plugins" />
        <meta name="og:title" content="Drone Plugins" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={layoutStyles.homeHeader}>
        <nav className={layoutStyles.navBar}>
          <Link href="/">
            <a className={layoutStyles.logo}>
              <Image
                src="/logo.svg"
                alt="Harness logo"
                height="25px"
                width="115px"
              />
            </a>
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
        <div className={layoutStyles.search}>
          <h1 className={layoutStyles.title}>Plugins Marketplace</h1>
          <h4 className={layoutStyles.subTitle}>
            Browse our registry of community plugins to customize your
            continuous integration pipeline.
          </h4>
          <input
            type="text"
            placeholder="Search for the plugins that you want..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className={layoutStyles.searchInput}
            value={searchTerm}
          ></input>
        </div>
        <div className={layoutStyles.image}>
          <Image
            src="/pipeline.svg"
            alt="Harness pipeline"
            layout="fill"
            priority={true}
          ></Image>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.tagContainer}>
          <TagButton
            tag={undefined}
            isSelected={selectedTag === undefined}
            setSelectedTag={setSelectedTag}
          />
          {tags?.map((tag) => (
            <TagButton
              key={tag}
              tag={tag}
              isSelected={tag === selectedTag}
              setSelectedTag={setSelectedTag}
            />
          ))}
        </div>
        <div className={styles.mainContainer}>
          {/* TODO implement sort */}
          {/* <div className={styles.sort}>
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
          </div> */}
          <div className={styles.cards}>
            {searchResults.map((result) => (
              <Card key={result.id} pluginData={result} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
