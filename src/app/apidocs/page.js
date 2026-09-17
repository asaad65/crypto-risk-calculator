import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-gray-300 flex flex-col justify-between selection:bg-[#fcd535] selection:text-black">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
        <h1 className="text-3xl font-bold text-white mb-2">API Documentation</h1>
        <p className="text-[#848e9c] text-sm mb-8">
          Integrate cryptocurrency market prices and risk calculation logic into your own applications.
        </p>

        <div className="space-y-8">
          {/* قسم نظرة عامة */}
          <section className="bg-[#181a20] border border-[#2b3139] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Overview</h2>
            <p className="text-sm text-[#848e9c] leading-relaxed">
              CryptoRisk.pro utilizes public market endpoints (such as Binance Public API) to fetch real-time USDT trading pairs without requiring complex API keys for basic usage.
            </p>
          </section>

          {/* قسم جلب الأسعار */}
          <section className="bg-[#181a20] border border-[#2b3139] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Fetch Live Price Endpoint</h2>
            <p className="text-sm text-[#848e9c] mb-4">
              Retrieves the current live market price for a specific trading pair.
            </p>
            <div className="bg-[#0b0e11] p-3 rounded border border-[#2b3139] font-mono text-xs text-[#0ecb81] mb-4 overflow-x-auto">
              GET https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT
            </div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Example Response:</h3>
            <pre className="bg-[#0b0e11] p-4 rounded border border-[#2b3139] font-mono text-xs text-gray-300 overflow-x-auto">
{`{
  "symbol": "ETHUSDT",
  "price": "3150.45"
}`}
            </pre>
          </section>

          {/* قسم حسابات المخاطر محلياً */}
          <section className="bg-[#181a20] border border-[#2b3139] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Client-Side Calculation Utility</h2>
            <p className="text-sm text-[#848e9c] mb-4">
              You can import our calculation function directly into your JavaScript/React project:
            </p>
            <pre className="bg-[#0b0e11] p-4 rounded border border-[#2b3139] font-mono text-xs text-[#fcd535] overflow-x-auto">
{`import { calculatePosition } from '@/utils/riskCalculator';

const result = calculatePosition({
  accountBalance: 1000,
  riskPercentage: 1,
  entryPrice: 3100,
  stopLossPrice: 3050,
  leverage: 10,
  positionType: 'long'
});`}
            </pre>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}