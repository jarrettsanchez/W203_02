import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '../components/sidebar/Sidebar';
import BootstrapClient from "@/components/Bootstrap/BootstrapClient";
import "bootstrap/dist/css/bootstrap.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SPEED - Software Practice Empirical Evidence Database',
  description: 'A searchable database of evidence about different claims about different SE practices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapClient />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}