import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains"
});

export const metadata = {
  title: "SanghyunK!m Atelier",
  description: "Luxury industrial metal objects. Inquiry-based store and profile."
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${cormorant.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  );
}
