import Calculator from '@/components/Calculator';

// توليد العناوين الوصفية لكل عملة تلقائياً للـ SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawSymbol = resolvedParams.symbol || 'eth';
  const baseAsset = rawSymbol.replace('-position-size-calculator', '').toUpperCase();

  return {
    title: `${baseAsset} Position Size & Risk Calculator | Crypto Risk Management`,
    description: `Free instant ${baseAsset}/USDT position size, risk/reward, and Smart Money Concepts (SMC) take-profit calculator for crypto traders.`,
  };
}

export default async function CoinPage({ params }) {
  const resolvedParams = await params;
  const rawSymbol = resolvedParams.symbol || 'eth-usdt';
  
  // استخراج اسم العملة وتجهيزه بصيغة صحيحة
  const cleanName = rawSymbol.replace('-position-size-calculator', '').replace('-', '').toUpperCase();
  const baseAsset = cleanName.replace('USDT', ''); // <--- تم تعريفها هنا لتصبح متاحة في الصفحة
  const defaultPairSymbol = cleanName.endsWith('USDT') ? cleanName : `${cleanName}USDT`;

  return (
    <main className="min-h-screen bg-[#0b0e11] text-gray-100 flex flex-col justify-between selection:bg-[#fcd535] selection:text-black">
      {/* Header / Navbar */}
      <header className="w-full border-b border-[#2b3139] bg-[#181a20]/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#fcd535] to-[#f0b90b] flex items-center justify-center font-bold text-black text-lg shadow-md">
              RC
            </div>
            <span className="font-bold text-lg tracking-wide text-white">
              CryptoRisk<span className="text-[#fcd535]">.pro</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#848e9c]">
            <a href="/" className="hover:text-[#fcd535] transition-colors">Home Calculator</a>
            <span className="text-white font-medium">{baseAsset}/USDT</span>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-10 flex flex-col items-center justify-center">
        {/* SEO Dynamic Title & Subtitle */}
        <div className="text-center mb-8 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            {baseAsset} Position Size & Risk Calculator
          </h1>
          <p className="text-[#848e9c] text-sm md:text-base">
            Calculate precise position sizing, stop-loss risks, and SMC take-profit targets for {baseAsset}/USDT with real-time market data.
          </p>
        </div>

        {/* The Calculator Component initialized with the specific coin */}
        <Calculator defaultPairSymbol={defaultPairSymbol} />
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#2b3139] bg-[#12141c] py-6 text-center text-xs text-[#848e9c]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 CryptoRisk.pro. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Disclaimer</span>
          </div>
        </div>
      </footer>
    </main>
  );
}