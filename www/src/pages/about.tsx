import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function AboutPage() {
  return (
    <Layout>
      <SEO
        description="About page for codebar stats"
        keywords={["Stats", "codebar", "about"]}
        title="About"
      />

      <section className="flex flex-col items-center md:flex-row">
        <div className="md:w-2/3 md:mr-8">
          <p className="b">Who are we?</p>
          <p>
            codebar drives diversity in the tech industry by enabling minority
            group members to learn coding in a supportive and non-judgmental
            environment.
          </p>
          <p>
            We create a safe space for minority groups to learn programming in a
            collaborative environment. We help them build upon their skills and
            increase employability, helping them to pursue a career in
            technology.
          </p>
          <p className="b">What do we do?</p>
          <p>
            We organise and facilitate free programming workshops for minority
            group members in 27 cities around the world including London,
            Bournemouth, Brighton, Cambridge, Manchester, Edinburgh, Berlin,
            Barcelona, Sydney and New York City. The full list of chapters can
            be found on our homepage - codebar.io
          </p>
          <p>
            We also run one-off events that focus on topics such as contributing
            to Open Source Software, mindful code, CV reviews, practise
            interviews and panels focused on getting started in the tech
            industry, and more.
          </p>
          <p>
            Whenever we can, we also offer opportunities to our students to
            attend leading programming conferences so they can build upon their
            skills and network with like-minded people.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
