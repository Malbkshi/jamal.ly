import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from 'react-hot-toast';

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-almarai",
});

export const metadata: Metadata = {
  title: "مركز منال الجمال",
  description: "مركز متخصص في العناية بالبشرة وإزالة الشعر",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'مركز منال الجمال',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
        <style>{`
          #__next-build-watcher,
          [data-nextjs-dialog-left-right],
          [data-nextjs-dialog],
          [data-nextjs-toast],
          [data-nextjs-refresh] {
            display: none !important;
          }
        `}</style>
      </head>
      <body
        className={`${almarai.variable} font-almarai antialiased`}
      >
        {children}
        <Toaster position="top-center" />
        <Script id="remove-nextjs-icon" strategy="afterInteractive">
          {`
            (function() {
              function removeNextJsElements() {
                const elements = document.querySelectorAll('#__next-build-watcher, [data-nextjs-dialog-left-right], [data-nextjs-dialog], [data-nextjs-toast], [data-nextjs-refresh]');
                elements.forEach(el => el.remove());
              }
              
              // Run immediately
              removeNextJsElements();
              
              // Also run after a short delay to catch elements that might be added later
              setTimeout(removeNextJsElements, 1000);
              
              // Set up a mutation observer to catch any future additions
              const observer = new MutationObserver(function(mutations) {
                removeNextJsElements();
              });
              
              observer.observe(document.body, { childList: true, subtree: true });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
