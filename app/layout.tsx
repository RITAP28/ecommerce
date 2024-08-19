import type { Metadata } from "next";
import { Inter, Space_Grotesk, Source_Code_Pro, Philosopher } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { metadata } from './metadata';

export const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
export const space = Space_Grotesk({ subsets: ["latin"], variable: '--font-space' });
export const codePro = Source_Code_Pro({ subsets: ["latin"], variable: '--font-codePro' });
export const philosopher = Philosopher({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-philosopher'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${codePro.variable} ${philosopher.variable} ${space.variable}`}>
      <body>
        <div className="w-full h-[8vh]">
          <Header />
        </div>
        <div className="w-full flex flex-row h-[92vh]">
          
          <div className="w-[20%]">
            <Sidebar />
          </div>
          <div className="w-[80%]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
