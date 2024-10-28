import type {Metadata} from "next";

import "./globals.css";
import {ThemeProvider} from 'next-themes'

export const metadata: Metadata = {
  title: "firebase-login-next",
  description: " ",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="br" suppressHydrationWarning>
      <body>
      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
      </html>
  );
}