import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className="">
      <div className="flex flex-wrap items-center justify-between max-w-4xl p-4 mx-auto md:p-4">
        <Link to="/">
          <h1 className="flex items-center no-underline text-blue-600">
            <img
              alt="icon"
              className="w-16 h-16 mr-2 "
              src={require("../images/codebar-icon.png")}
            />
            <span className="text-xl font-bold tracking-tight ">
              {site.siteMetadata.title}
            </span>
          </h1>
        </Link>

        <button
          className="flex items-center block px-3 py-2 text-gray-600 border border-gray-600 rounded md:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          <a className="block mt-4 text-gray-700 no-underline md:inline-block md:mt-0 md:ml-6" href="https://codebar.io/">codebar.io</a>
          <Link
            className="block mt-4 text-gray-700 no-underline md:inline-block md:mt-0 md:ml-6"
            to="/about"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
