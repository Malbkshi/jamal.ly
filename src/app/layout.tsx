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
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1',
  formatDetection: {
    telephone: false,
  },
  applicationName: 'مركز منال الجمال',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'مركز منال الجمال',
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
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
