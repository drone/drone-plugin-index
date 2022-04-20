import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "../../styles/Layout.module.css";
import utilStyles from "../../styles/utils.module.css";

const title = 'Drone Plugin Index'

const Plugins = () => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={title} />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <nav className={layoutStyles.pluginHeader}>
        <Link href="/">
          <a className={layoutStyles.logo}>
            <Image
              src={`/logo.svg`}
              alt={`Harness logo`}
              height="25px"
              width="115px"
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
          className={layoutStyles.searchInput}
        ></input>
        <Link href="/">
          <a className={layoutStyles.linkButton}>Plugins</a>
        </Link>
        <Link href="/">
          <a className={layoutStyles.linkButton}>Documentation</a>
        </Link>
        <Link href="/">
          <a className={layoutStyles.linkButton}>Support</a>
        </Link>
      </nav>
      <section className={utilStyles.headingMd}>
        <p>Plugins galore!</p>
      </section>
    </>
  );
};

export default Plugins;
