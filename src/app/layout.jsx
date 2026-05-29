import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Source_Serif_4({ subsets: ["latin"], variable: "--font-newsreader" });

export const metadata = {
  title: "Illegal Fishing in Tonle Sap",
  description:
    "An interactive documentary about illegal fishing in Tonle Sap and its effects on jobs, money, communities, and the environment in Cambodia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
