import Link from 'next/link';

export default function Header({ currentPair }) {
  return (
    <header className="w-full border-b border-[#2b3139] bg-[#181a20]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#fcd535] to-[#f0b90b] flex items-center justify-center font-bold text-black text-lg shadow-md group-hover:scale-105 transition-transform">
            RC
          </div>
          <span className="font-bold text-lg tracking-wide text-white">
            CryptoRisk<span className="text-[#fcd535]">.pro</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#848e9c]">
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#848e9c]">
        <Link href="/" className="hover:text-[#fcd535] transition-colors">Home Calculator</Link>
        <Link href="/apidocs" className="hover:text-[#fcd535] transition-colors">API Docs</Link>
      </nav>
          {currentPair && (
            <span className="bg-[#2b3139]/60 px-3 py-1 rounded-full text-white font-medium border border-[#363c4e]">
              {currentPair}
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}