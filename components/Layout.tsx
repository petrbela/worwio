import { ReactNode } from "react";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Worwio</title>
        <meta
          name="description"
          content="Convert videos to custom audio tracks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 flex flex-col">
        <header className="bg-white py-4">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/worwio-logo.svg"
                    alt="Worwio logo"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/worwio-logo.svg"
                    alt="Worwio logo"
                  />
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow p-8">{children}</main>
        <footer className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400">
              &copy; 2023 Worwio, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
