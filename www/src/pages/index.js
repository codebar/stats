import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section>
        <h2 className="inline-block mb-4 text-3xl font-bold">Statistics</h2>

        <p className="leading-loose">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>
    </Layout>
  );
}

export default IndexPage;
