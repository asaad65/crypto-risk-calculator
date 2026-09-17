// /**
//  * Binance Public API Service to Fetch Live Crypto Prices
//  */

// // الأزواج المدعومة مبدئياً
// export const SUPPORTED_PAIRS = [
//   { symbol: 'ETHUSDT', name: 'Ethereum', icon: 'ETH' },
//   { symbol: 'SOLUSDT', name: 'Solana', icon: 'SOL' },
//   { symbol: 'SUIUSDT', name: 'Sui', icon: 'SUI' },
// ];

// /**
//  * جلب سعر زوج محدد من Binance
//  * @param {string} symbol - رمز الزوج مثل ETHUSDT
//  */
// export async function getLivePrice(symbol = 'ETHUSDT') {
//   try {
//     const response = await fetch(
//       `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`,
//       { cache: 'no-store' } // لضمان عدم تخزين السعر وجلبه دائماً بشكل حي
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch price');
//     }

//     const data = await response.json();
//     return parseFloat(data.price);
//   } catch (error) {
//     console.error(`Error fetching price for ${symbol}:`, error);
//     return null;
//   }
// }


/**
 * Binance Public API Service to Fetch Live Crypto Prices & Pairs
 */

/**
 * جلب جميع أزواج الـ USDT المتاحة للتداول في بينانس لحظياً
 */
export async function fetchAllUSDTPairs() {
  try {
    const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
    if (!response.ok) throw new Error('Failed to fetch exchange info');
    
    const data = await response.json();

    // فلترة الأزواج: فقط التي تنتهي بـ USDT وحالتها "قيد التداول"
    const usdtPairs = data.symbols
      .filter(symbol => symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING')
      .map(symbol => ({
        symbol: symbol.symbol,         // مثال: ETHUSDT
        baseAsset: symbol.baseAsset,   // مثال: ETH
      }))
      // ترتيب أبجدي للعملات لسهولة البحث
      .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

    return usdtPairs;
  } catch (error) {
    console.error('Error fetching all pairs:', error);
    // إرجاع قائمة احتياطية في حال فشل الاتصال
    return [
      { symbol: 'BTCUSDT', baseAsset: 'BTC' },
      { symbol: 'ETHUSDT', baseAsset: 'ETH' },
      { symbol: 'SOLUSDT', baseAsset: 'SOL' }
    ];
  }
}

/**
 * جلب سعر زوج محدد من Binance
 * @param {string} symbol - رمز الزوج مثل ETHUSDT
 */
export async function getLivePrice(symbol = 'ETHUSDT') {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`,
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error('Failed to fetch price');

    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
}