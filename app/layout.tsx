import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";
import "tippy.js/dist/tippy.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dawid Moczadło's blog",
  description:
    "Dawid Moczadlo is a co-founder of Vidoc Security Lab, a software engineer, and ethical hacker. He loves climbing and coffee.",
  openGraph: {
    title: "Dawid Moczadło's blog",
    description:
      "Dawid Moczadlo is a co-founder of Vidoc Security Lab, a software engineer, and ethical hacker. He loves climbing and coffee.",
    url: "https://moczadlo.com",
    siteName: "Dawid Moczadło's blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kannthu1",
    creator: "@kannthu1",
  },
  metadataBase: new URL("https://moczadlo.com"),
};

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
