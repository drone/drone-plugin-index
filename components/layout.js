import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Layout.module.css";

export const siteTitle = "Drone Plugins";

const search = (searchTerm, allPluginsData) => {
  return allPluginsData.filter((pluginData) => {
    return (
      pluginData.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Just search in the title for now
    // join tags into a single string instead of looping through each
    // return (
    //   pluginData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   pluginData.tags.join().toLowerCase().includes(searchTerm.toLowerCase())
    // );
  });
};

const Layout = ({ children, home = false, setSearchResults, allPluginsData }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* <header className={styles.homeHeader}>
        {home ? (
          <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
        ) : (
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{siteTitle}</a>
            </Link>
          </h2>
        )}
      </header> */}
      {home ? (
        <header className={styles.homeHeader}>
          <nav className={styles.navBar}>
            <Link href="/">
              <a className={styles.logo}>
                <Image
                  src={`/logo.svg`}
                  alt={`Harness logo`}
                  height="25px"
                  width="115px"
                  className={styles.logo}
                />
              </a>
            </Link>
            <Link href="/">
              <a className={styles.linkButton}>Plugins</a>
            </Link>
            <Link href="/">
              <a className={styles.linkButton}>Documentation</a>
            </Link>
            <Link href="/">
              <a className={styles.linkButton}>Support</a>
            </Link>
          </nav>
          <div className={styles.search}>
            <h1 className={styles.title}>Plugins Marketplace</h1>
            <h4 className={styles.subTitle}>
              Browse our registry of community plugins to customize your
              continuous integration pipeline.
            </h4>
            {/* TODO: need to implement search logic */}
            <input
              type="text"
              placeholder="Search for the plugins that you want..."
              onChange={(e) => {
                setSearchResults(search(e.target.value, allPluginsData));
              }}
              className={styles.searchInput}
            ></input>
          </div>
          <div className={styles.image}>
            <Image
              src="/pipeline.svg"
              alt="Harness pipeline"
              layout="fill"
            ></Image>
          </div>
        </header>
      ) : (
        <nav className={styles.pluginHeader}>
            <Link href="/">
              <a className={styles.logo}>
                <Image
                  src={`/logo.svg`}
                  alt={`Harness logo`}
                  height="25px"
                  width="115px"
                  className={styles.logo}
                />
              </a>
            </Link>
            {/* TODO: need to implement search logic */}
            <input
              type="text"
              placeholder="Search for the plugins that you want..."
              onChange={() => {}}
              className={styles.searchInput}
            ></input>
            <Link href="/">
              <a className={styles.linkButton}>Plugins</a>
            </Link>
            <Link href="/">
              <a className={styles.linkButton}>Documentation</a>
            </Link>
            <Link href="/">
              <a className={styles.linkButton}>Support</a>
            </Link>
          </nav>
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
