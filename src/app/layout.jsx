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
  title: "Care.xyz – Trusted Home Care Services in Bangladesh",
  description:
    "Care.xyz provides professional baby care, elder care, patient care, and home services. Book trusted caregivers easily from anywhere in Bangladesh.",

  keywords: [
    "Care services",
    "Home care Bangladesh",
    "Baby care",
    "Elder care",
    "Patient care",
    "Care.xyz",
  ],

  openGraph: {
    title: "Care.xyz – Trusted Home Care Services",
    description:
      "Book professional baby care, elder care, and patient care services with Care.xyz. Safe, trusted, and reliable home care solutions.",
    url: "https://care-xyz-alpha.vercel.app/",
    siteName: "Care.xyz",
    images: [
      {
        url: "https://i.ibb.co.com/3YFjntZR/image.png",
        width: 1200,
        height: 630,
        alt: "Care.xyz Home Care Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Care.xyz – Trusted Home Care Services",
    description:
      "Professional baby care, elder care, and patient care services in Bangladesh.",
    images: ["https://i.ibb.co.com/3YFjntZR/image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
