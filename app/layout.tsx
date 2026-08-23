import type { Metadata } from "next";
import { Bebas_Neue, Permanent_Marker, Outfit } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Urban Crust Cafe | Pizza with Urban Flair",
  description: "Discover the taste of gourmet ingredients, creative toppings, and crispy wood-fired crust offering a modern twist on classic pizza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${permanentMarker.variable} ${outfit.variable}`}>
      <body className="bg-[#080808] text-white antialiased selection:bg-[#C5FF00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
