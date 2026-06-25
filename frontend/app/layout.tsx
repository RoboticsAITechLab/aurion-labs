import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ActionRail from "@/components/layout/action-rail";
import AppProviders from "@/providers/app-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://aurionlabs.in"),
	title: "Aurion Labs | Websites, Booking, and Growth Systems",
	description: "Aurion Labs builds modern business websites, WhatsApp-ready lead flows, booking systems, and lightweight operational systems for local businesses.",
	icons: {
		icon: "/icon.svg",
	},
	openGraph: {
		title: "Aurion Labs | Websites, Booking, and Growth Systems",
		description: "Aurion Labs builds modern business websites, WhatsApp-ready lead flows, booking systems, and lightweight operational systems for local businesses.",
		url: "https://aurionlabs.in",
		siteName: "Aurion Labs",
		images: [
			{
				url: "/logo.svg",
				width: 1254,
				height: 1254,
				alt: "Aurion Labs Logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Aurion Labs | Websites, Booking, and Growth Systems",
		description: "Aurion Labs builds modern business websites, WhatsApp-ready lead flows, booking systems, and lightweight operational systems for local businesses.",
		images: ["/logo.svg"],
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>
          {children}
          <ActionRail />
        </AppProviders>
      </body>
    </html>
  );
}
