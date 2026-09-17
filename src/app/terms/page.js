import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-gray-300 flex flex-col justify-between selection:bg-[#fcd535] selection:text-black">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        <div className="space-y-6 text-sm leading-relaxed text-[#848e9c]">
          <p>
            Welcome to CryptoRisk.pro. By accessing or using our website and micro tools, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our platform.
          </p>
          
          <h2 className="text-lg font-semibold text-white pt-2">1. Use of Calculators</h2>
          <p>
            All tools, including the position size and risk management calculators provided on this site, are designed for informational and educational purposes only. Users are solely responsible for their own financial decisions and trades executed in live markets.
          </p>

          <h2 className="text-lg font-semibold text-white pt-2">2. Intellectual Property</h2>
          <p>
            The layout, source code, design components, and text formatting of CryptoRisk.pro are protected by intellectual property rights. You may not copy, reproduce, or redistribute our platform code without prior written permission.
          </p>

          <h2 className="text-lg font-semibold text-white pt-2">3. Limitation of Liability</h2>
          <p>
            CryptoRisk.pro and its developers shall not be held liable for any direct, indirect, or incidental damages arising from the use or inability to use our tools, including financial losses incurred from cryptocurrency trading.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}