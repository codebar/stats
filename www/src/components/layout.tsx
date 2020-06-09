import React from "react";

import Header from "./header";
import Footer from "./footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
