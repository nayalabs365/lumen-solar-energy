import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SectionViewTracker from "@/components/SectionViewTracker";

export const metadata: Metadata = {
  title: "Lumen Solar Concierge — Your Personal Solar Guide",
  description: "Your personal guide to going solar. Lumen analyzes your home, shops for the best installer, and protects your privacy — so you can go solar with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GoogleAnalytics />
        <SectionViewTracker />
        <Navigation />
        <main className="pt-[72px]">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
