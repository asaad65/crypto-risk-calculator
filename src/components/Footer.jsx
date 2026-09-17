import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#2b3139] bg-[#12141c] py-8 text-xs text-[#848e9c]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2026 CryptoRisk.pro. All rights reserved.</p>
        
        {/* Legal Links */}
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}