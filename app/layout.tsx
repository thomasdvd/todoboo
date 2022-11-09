"use client";

import "@styles/globals.css";
import Providers from "./Providers";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html data-theme="halloween">
      <body className="min-h-screen">
        <header className="mb-8 p-4 text-center text-4xl">ToDoBoo 👻</header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
