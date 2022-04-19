import Head from "next/head";
import Layout, { siteTitle } from "components/Layout";
import utilStyles from "styles/utils.module.css";

const Plugins = () => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Layout>
        <section className={utilStyles.headingMd}>
          <p>Plugins galore!</p>
        </section>
      </Layout>
    </>
  );
};

export default Plugins;
