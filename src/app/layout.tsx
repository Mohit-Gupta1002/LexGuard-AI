import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LexGuard AI — Indian LegalTech Contract Intelligence & Risk Review",
  description:
    "Understand what you're signing before you commit. AI-powered contract decision support for Indian tenants, freelancers, employees, and small business founders.",
  keywords: [
    "LegalTech India",
    "Contract Review",
    "Rental Agreement Analysis",
    "Employment Bond Review",
    "Contract Risk Checker",
    "Indian Law Contract Review",
    "Bengaluru Rent Agreement",
  ],
  authors: [{ name: "LexGuard AI Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-slate-100 antialiased selection:bg-blue-600/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
