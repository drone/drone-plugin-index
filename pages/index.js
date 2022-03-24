import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPluginsData } from "../lib/plugins";

export const getStaticProps = async () => {
  const allPluginsData = getSortedPluginsData();
  return {
    props: {
      allPluginsData,
    },
  };
};

const search = (searchTerm, allPluginsData) => {
  return allPluginsData.filter((pluginData) => {
    // join tags into a single string instead of looping through each
    return (
      pluginData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pluginData.tags.join().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

const Home = ({ allPluginsData }) => {
  const [searchResults, setSearchResults] = useState(allPluginsData);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.searchSection}>
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => {
            setSearchResults(search(e.target.value, allPluginsData));
          }}
          className={utilStyles.searchInput}
        />
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {searchResults.map(({ id, title, author, tags, logo }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/plugins/${id}`} className={utilStyles.pluginTitle}>
                <a>{title}</a>
              </Link>
              <small className={utilStyles.pluginAuthor}>by {author}</small>
              {tags?.length && (
                <div className={utilStyles.pillContainer}>
                  {tags?.map((tag) => (
                    <div key={tag} className={utilStyles.pill}>
                      {tag}
                    </div>
                  ))}
                </div>
              )}
              {logo && (
                <section className={utilStyles.logo}>
                  <Image
                    src={`/logos/${logo}`}
                    alt={`${logo}`}
                    height="64px"
                    width="64px"
                  />
                </section>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
