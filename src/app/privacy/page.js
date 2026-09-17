import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-gray-300 flex flex-col justify-between">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-sm leading-relaxed text-[#848e9c]">
          <p>At CryptoRisk.pro, we respect your privacy. This policy outlines how we handle user data and browser interactions on our platform.</p>
          <p>Since our calculators run completely client-side in your browser, we do not store your private trading data or financial inputs on our servers.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}