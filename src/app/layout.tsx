import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/ThemeProvider/ThemeProvider";
import StoreProvider from "@/Store/StoreProvider/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProviders>
            {children}
          </ThemeProviders>
        </StoreProvider>
      </body>
    </html>
  );
}
