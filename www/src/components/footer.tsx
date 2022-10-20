import React from "react";

function Footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();
  return (
    <footer className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 text-center">
      <div className="border-4 border-blue-300 mb-12 pb-10">
        <img
          alt="codebar workshop"
          className="pt-10 px-10"
          src={require("../images/workshop.jpg")}
        />
        <p className="text-lg text-gray-700 py-2">
          Looking for a way to support codebar? Please consider making a
          donation
        </p>
        <a
          href="https://codebar.enthuse.com/donate/#!/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Donate
        </a>
      </div>
      <p className="text-xs">
        Registered UK and Wales charity no. 1187776 &copy; codebar {year}
      </p>
    </footer>
  );
}

export default Footer;
