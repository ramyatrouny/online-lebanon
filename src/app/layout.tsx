import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Lebanon | الحكومة الرقمية",
  description:
    "The future of Lebanese government services - all in one digital portal",
  keywords: "Lebanon, government, digital, services, portal, حكومة لبنان",
  authors: [{ name: "Digital Lebanon Team" }],
  openGraph: {
    title: "Digital Lebanon | الحكومة الرقمية",
    description: "The future of Lebanese government services",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_LB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-gray-50`}
      >
        <div id="root" className="min-h-screen">
          {children}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#374151",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
