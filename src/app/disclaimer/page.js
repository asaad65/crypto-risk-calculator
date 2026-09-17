import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-gray-300 flex flex-col justify-between selection:bg-[#fcd535] selection:text-black">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-white mb-6">Financial Disclaimer</h1>
        <div className="space-y-6 text-sm leading-relaxed text-[#848e9c]">
          <p className="text-white font-medium bg-[#1e2329] p-4 rounded-lg border border-[#2b3139]">
            Cryptocurrency trading and leveraging carry a high level of risk and may not be suitable for all investors. You could lose some or all of your initial investment.
          </p>
          
          <h2 className="text-lg font-semibold text-white pt-2">Not Financial Advice</h2>
          <p>
            The content provided on CryptoRisk.pro does not constitute financial, investment, or trading advice. We are not licensed financial advisors. Always conduct your own research (DYOR) and consult with a professional financial advisor before making any financial commitments.
          </p>

          <h2 className="text-lg font-semibold text-white pt-2">Accuracy of Market Data</h2>
          <p>
            Market prices and data retrieved via third-party APIs (such as Binance) are provided for convenience. CryptoRisk.pro does not guarantee the absolute accuracy, timeliness, or completeness of real-time price feeds.
          </p>

          <h2 className="text-lg font-semibold text-white pt-2">Risk Warning</h2>
          <p>
            High leverage can work against you as well as for you. Before deciding to trade cryptocurrencies, you should carefully consider your investment objectives, level of experience, and risk appetite. Never trade with money you cannot afford to lose.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}