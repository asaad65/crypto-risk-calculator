import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Crypto Position Size & Risk Calculator',
  description: 'Free real-time risk management and position size calculator for crypto traders.',
  verification: {
    google: 'DUrq_6VOZkPWPNizygNJZDdp19TyZ0LbtNk8rOjqYHA',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Crypto Position Size Calculator',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics Scripts */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-7Z8NH4WQ8B" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7Z8NH4WQ8B');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-[#0b0e11] text-gray-100">
        
        {/* Header PlaceHolder */}

        <main className="flex-grow">
          {children}
        </main>

        {/* Footer PlaceHolder */}
        
      </body>
    </html>
  );
}