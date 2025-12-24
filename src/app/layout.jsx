import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const metadata = {
  title: "Care.IO",
  description: "Care.IO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <NextAuthProvider>
          <header className="md:w-7xl mx-auto">
            <Navbar />
          </header>
          <main className="md:w-7xl mx-auto">{children}</main>
          <footer className="md:w-7xl mx-auto">
            <Footer />
          </footer>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
