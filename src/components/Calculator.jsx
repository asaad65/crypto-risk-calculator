// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { calculatePosition } from '@/utils/riskCalculator';
// import { getLivePrice, fetchAllUSDTPairs } from '@/utils/fetchPrices';

// export default function Calculator({ defaultPairSymbol = 'ETHUSDT' }) {
//   // استخراج العملة الأساسية من الـ prop القادم أو الافتراضي
//   const initialBase = defaultPairSymbol.replace('USDT', '');

//   // حالة العملات والقائمة المنسدلة
//   const [availablePairs, setAvailablePairs] = useState([]);
//   const [selectedPair, setSelectedPair] = useState({ symbol: defaultPairSymbol, baseAsset: initialBase });
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const dropdownRef = useRef(null);

//   // حالة المدخلات والتداول (مع قراءة القيمة من ال localStorage مباشرة لضمان عدم ضياعها)
//   const [positionType, setPositionType] = useState('long');
//   const [accountBalance, setAccountBalance] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('crypto_calc_balance') || '1000';
//     }
//     return '1000';
//   });
  
//   const [riskPercentage, setRiskPercentage] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('crypto_calc_risk') || '1';
//     }
//     return '1';
//   });

//   const [entryPrice, setEntryPrice] = useState('');
//   const [stopLossPrice, setStopLossPrice] = useState('');
  
//   const [leverage, setLeverage] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('crypto_calc_leverage') || '10';
//     }
//     return '10';
//   });

//   const [isLoadingPrice, setIsLoadingPrice] = useState(false);

//   // 1. جلب كل العملات عند تحميل الصفحة
//   useEffect(() => {
//     const loadPairs = async () => {
//       const pairs = await fetchAllUSDTPairs();
//       setAvailablePairs(pairs);
//     };
//     loadPairs();
//   }, []);

//   // دوال التحديث والحفظ الفوري في الـ localStorage
//   const handleBalanceChange = (e) => {
//     const val = e.target.value;
//     setAccountBalance(val);
//     localStorage.setItem('crypto_calc_balance', val);
//   };

//   const handleRiskChange = (e) => {
//     const val = e.target.value;
//     setRiskPercentage(val);
//     localStorage.setItem('crypto_calc_risk', val);
//   };

//   const handleLeverageChange = (e) => {
//     const val = e.target.value;
//     setLeverage(val);
//     localStorage.setItem('crypto_calc_leverage', val);
//   };

//   // إغلاق القائمة المنسدلة عند النقر خارجها
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // 3. جلب السعر المباشر للعملة المحددة
//   const fetchPrice = async (symbol) => {
//     setIsLoadingPrice(true);
//     const price = await getLivePrice(symbol);
//     if (price) {
//       setEntryPrice(price.toString());
//       const defaultSl = positionType === 'long' ? price * 0.99 : price * 1.01;
//       setStopLossPrice(defaultSl.toFixed(4));
//     }
//     setIsLoadingPrice(false);
//   };

//   useEffect(() => {
//     fetchPrice(selectedPair.symbol);
//   }, [selectedPair]);

//   // 4. الحساب المباشر
//   const results = calculatePosition({
//     accountBalance,
//     riskPercentage,
//     entryPrice,
//     stopLossPrice,
//     leverage,
//     positionType,
//   });

//   // فلترة العملات بناءً على البحث
//   const filteredPairs = availablePairs.filter(pair => 
//     pair.baseAsset.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 lg:p-8 bg-[#0b0e11] text-gray-100 rounded-2xl shadow-2xl border border-[#2b3139] font-sans transition-all">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-[#2b3139] pb-6">
//         <div>
//           <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white">Risk Calculator</h2>
//           <p className="text-[#848e9c] text-sm mt-1">Optimize your position sizing and risk management.</p>
//         </div>

//         {/* Searchable Dropdown for Pairs */}
//         <div className="relative w-full md:w-64" ref={dropdownRef}>
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="w-full flex items-center justify-between bg-[#1e2329] border border-[#2b3139] rounded-lg px-4 py-2.5 text-sm font-medium hover:border-[#fcd535] transition-colors focus:outline-none"
//           >
//             <span className="flex items-center gap-2">
//               <span className="text-[#fcd535] font-bold">{selectedPair.baseAsset}</span>
//               <span className="text-[#848e9c]">/USDT</span>
//             </span>
//             <svg className={`w-4 h-4 text-[#848e9c] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute z-10 mt-2 w-full bg-[#181a20] border border-[#2b3139] rounded-lg shadow-xl overflow-hidden">
//               <div className="p-2 border-b border-[#2b3139]">
//                 <input
//                   type="text"
//                   placeholder="Search coin (e.g. BTC, PEPE)"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#fcd535]"
//                 />
//               </div>
//               <ul className="max-h-60 overflow-y-auto custom-scrollbar">
//                 {filteredPairs.length > 0 ? (
//                   filteredPairs.map((pair) => (
//                     <li key={pair.symbol}>
//                       <button
//                         onClick={() => {
//                           setSelectedPair(pair);
//                           setIsDropdownOpen(false);
//                           setSearchQuery('');
//                         }}
//                         className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
//                           selectedPair.symbol === pair.symbol 
//                             ? 'bg-[#2b3139] text-[#fcd535]' 
//                             : 'text-white hover:bg-[#1e2329]'
//                         }`}
//                       >
//                         <span className="font-bold">{pair.baseAsset}</span>
//                         <span className="text-xs text-[#848e9c]">/USDT</span>
//                       </button>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="px-4 py-3 text-sm text-[#848e9c] text-center">No coins found</li>
//                 )}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
//         {/* Left Column: Inputs */}
//         <div className="lg:col-span-7 flex flex-col gap-5">
//           {/* Segmented Control for Long/Short */}
//           <div className="flex bg-[#1e2329] rounded-lg p-1 border border-[#2b3139]">
//             <button
//               onClick={() => setPositionType('long')}
//               className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
//                 positionType === 'long' ? 'bg-[#0ecb81] text-white shadow-md' : 'text-[#848e9c] hover:text-white'
//               }`}
//             >
//               LONG
//             </button>
//             <button
//               onClick={() => setPositionType('short')}
//               className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
//                 positionType === 'short' ? 'bg-[#f6465d] text-white shadow-md' : 'text-[#848e9c] hover:text-white'
//               }`}
//             >
//               SHORT
//             </button>
//           </div>

//           {/* Account & Risk Row */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative group">
//               <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Account Balance</label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   value={accountBalance}
//                   onChange={handleBalanceChange}
//                   className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-12 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
//                 />
//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">USDT</span>
//               </div>
//             </div>

//             <div className="relative group">
//               <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Risk Limit</label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   value={riskPercentage}
//                   onChange={handleRiskChange}
//                   className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-10 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
//                 />
//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">%</span>
//               </div>
//             </div>
//           </div>

//           {/* Entry & Stop Loss Row */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative group">
//               <div className="flex justify-between items-end mb-1.5">
//                 <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider">Entry Price</label>
//                 <button
//                   onClick={() => fetchPrice(selectedPair.symbol)}
//                   disabled={isLoadingPrice}
//                   className="text-[10px] text-[#fcd535] hover:text-white transition-colors"
//                 >
//                   {isLoadingPrice ? 'Loading...' : 'Fetch Market'}
//                 </button>
//               </div>
//               <div className="relative">
//                 <input
//                   type="number"
//                   value={entryPrice}
//                   onChange={(e) => setEntryPrice(e.target.value)}
//                   className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-12 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
//                 />
//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">USDT</span>
//               </div>
//             </div>

//             <div className="relative group">
//               <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Stop Loss</label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   value={stopLossPrice}
//                   onChange={(e) => setStopLossPrice(e.target.value)}
//                   className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-12 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
//                 />
//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">USDT</span>
//               </div>
//             </div>
//           </div>

//           {/* Leverage */}
//           <div className="relative group w-1/2 pr-2">
//             <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Leverage</label>
//             <div className="relative">
//               <input
//                 type="number"
//                 value={leverage}
//                 onChange={handleLeverageChange}
//                 className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-8 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
//               />
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">x</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Results Panel */}
//         <div className="lg:col-span-5">
//           <div className="bg-[#181a20] border border-[#2b3139] rounded-xl p-5 h-full flex flex-col shadow-inner">
//             <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide border-b border-[#2b3139] pb-3">Trade Summary</h3>
//             {results ? (
//               <div className="flex flex-col gap-4 flex-1">
//                 <div className="flex justify-between items-center">
//                   <span className="text-[#848e9c] text-xs font-medium uppercase tracking-wider">Amount at Risk</span>
//                   <span className="font-mono text-sm text-[#f6465d] bg-[#f6465d]/10 px-2 py-0.5 rounded">${results.maxRiskUsdt}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <span className="text-[#848e9c] text-xs font-medium uppercase tracking-wider">Position Size</span>
//                   <div className="text-right">
//                     <div className="font-mono text-sm text-white">${results.positionSizeUsdt}</div>
//                     <div className="text-[10px] text-[#848e9c] mt-0.5">{results.positionSizeUnits} {selectedPair.baseAsset}</div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-[#848e9c] text-xs font-medium uppercase tracking-wider">Required Margin</span>
//                   <span className="font-mono text-sm text-[#fcd535]">${results.requiredMargin}</span>
//                 </div>

//                 <div className="mt-auto pt-4 border-t border-[#2b3139]">
//                   <span className="text-[10px] font-semibold text-[#848e9c] uppercase tracking-wider block mb-3">Suggested Targets (R:R)</span>
//                   <div className="grid grid-cols-3 gap-2">
//                     <div className="bg-[#1e2329] p-2 rounded border border-[#2b3139]/50 text-center hover:border-[#0ecb81]/30 transition-colors">
//                       <div className="text-[10px] text-[#848e9c] mb-1">TP 1:1</div>
//                       <div className="text-xs font-mono text-[#0ecb81]">{results.tp1}</div>
//                     </div>
//                     <div className="bg-[#1e2329] p-2 rounded border border-[#2b3139]/50 text-center hover:border-[#0ecb81]/50 transition-colors">
//                       <div className="text-[10px] text-[#848e9c] mb-1">TP 1:2</div>
//                       <div className="text-xs font-mono text-[#0ecb81]">{results.tp2}</div>
//                     </div>
//                     <div className="bg-[#1e2329] p-2นอน bg-[#1e2329] p-2 rounded border border-[#2b3139]/50 text-center hover:border-[#0ecb81]/80 transition-colors">
//                       <div className="text-[10px] text-[#848e9c] mb-1">TP 1:3</div>
//                       <div className="text-xs font-mono text-[#0ecb81] font-semibold">{results.tp3}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {results.isMarginExceeded && (
//                   <div className="mt-3 p-2.5 bg-[#f6465d]/10 border border-[#f6465d]/30 text-[#f6465d] text-[11px] rounded flex items-start gap-2">
//                     <span className="font-bold mt-0.5">!</span>
//                     <p>Margin exceeds account balance. Reduce leverage or lower risk.</p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex-1 flex items-center justify-center text-center px-4">
//                 <p className="text-[#848e9c] text-xs">Enter your trade parameters to generate risk profile and targets.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { calculatePosition } from '@/utils/riskCalculator';
import { getLivePrice, fetchAllUSDTPairs } from '@/utils/fetchPrices';

export default function Calculator({ defaultPairSymbol = 'ETHUSDT' }) {
  const initialBase = defaultPairSymbol.replace('USDT', '');

  const [availablePairs, setAvailablePairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState({ symbol: defaultPairSymbol, baseAsset: initialBase });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const [positionType, setPositionType] = useState('long');
  const [accountBalance, setAccountBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('crypto_calc_balance') || '1000';
    }
    return '1000';
  });
  
  const [riskPercentage, setRiskPercentage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('crypto_calc_risk') || '1';
    }
    return '1';
  });

  const [entryPrice, setEntryPrice] = useState('');
  const [stopLossPrice, setStopLossPrice] = useState('');
  
  const [leverage, setLeverage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('crypto_calc_leverage') || '10';
    }
    return '10';
  });

  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  useEffect(() => {
    const loadPairs = async () => {
      const pairs = await fetchAllUSDTPairs();
      setAvailablePairs(pairs);
    };
    loadPairs();
  }, []);

  const handleBalanceChange = (e) => {
    const val = e.target.value;
    setAccountBalance(val);
    localStorage.setItem('crypto_calc_balance', val);
  };

  const handleRiskChange = (e) => {
    const val = e.target.value;
    setRiskPercentage(val);
    localStorage.setItem('crypto_calc_risk', val);
  };

  const handleLeverageChange = (e) => {
    const val = e.target.value;
    setLeverage(val);
    localStorage.setItem('crypto_calc_leverage', val);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchPrice = async (symbol) => {
    setIsLoadingPrice(true);
    const price = await getLivePrice(symbol);
    if (price) {
      setEntryPrice(price.toString());
      const defaultSl = positionType === 'long' ? price * 0.99 : price * 1.01;
      setStopLossPrice(defaultSl.toFixed(4));
    }
    setIsLoadingPrice(false);
  };

  useEffect(() => {
    fetchPrice(selectedPair.symbol);
  }, [selectedPair]);

  const results = calculatePosition({
    accountBalance,
    riskPercentage,
    entryPrice,
    stopLossPrice,
    leverage,
    positionType,
  });

  const formatNumber = (num, decimals = 4) => {
    if (!num || isNaN(num)) return '0';
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
      useGrouping: false
    });
  };

  const filteredPairs = availablePairs.filter(pair => 
    pair.baseAsset.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div dir="ltr" className="w-full max-w-4xl mx-auto p-6 lg:p-8 bg-[#0b0e11] text-gray-100 rounded-2xl shadow-2xl border border-[#2b3139] font-sans transition-all text-left">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-[#2b3139] pb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white">Risk Calculator</h2>
          <p className="text-[#848e9c] text-sm mt-1">Optimize your position sizing and risk management.</p>
        </div>

        {/* Searchable Dropdown for Pairs */}
        <div className="relative w-full md:w-64" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-[#1e2329] border border-[#2b3139] rounded-lg px-4 py-2.5 text-sm font-medium hover:border-[#fcd535] transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <span className="text-[#fcd535] font-bold">{selectedPair.baseAsset}</span>
              <span className="text-[#848e9c]">/USDT</span>
            </span>
            <svg className={`w-4 h-4 text-[#848e9c] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-[#181a20] border border-[#2b3139] rounded-lg shadow-xl overflow-hidden">
              <div className="p-2 border-b border-[#2b3139]">
                <input
                  type="text"
                  placeholder="Search coin (e.g. BTC, PEPE)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#fcd535]"
                />
              </div>
              <ul className="max-h-60 overflow-y-auto custom-scrollbar">
                {filteredPairs.length > 0 ? (
                  filteredPairs.map((pair) => (
                    <li key={pair.symbol}>
                      <button
                        onClick={() => {
                          setSelectedPair(pair);
                          setIsDropdownOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                          selectedPair.symbol === pair.symbol 
                            ? 'bg-[#2b3139] text-[#fcd535]' 
                            : 'text-white hover:bg-[#1e2329]'
                        }`}
                      >
                        <span className="font-bold">{pair.baseAsset}</span>
                        <span className="text-xs text-[#848e9c]">/USDT</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-sm text-[#848e9c] text-center">No coins found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Segmented Control for Long/Short */}
          <div className="flex bg-[#1e2329] rounded-lg p-1 border border-[#2b3139]">
            <button
              onClick={() => setPositionType('long')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                positionType === 'long' ? 'bg-[#0ecb81] text-white shadow-md' : 'text-[#848e9c] hover:text-white'
              }`}
            >
              LONG
            </button>
            <button
              onClick={() => setPositionType('short')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                positionType === 'short' ? 'bg-[#f6465d] text-white shadow-md' : 'text-[#848e9c] hover:text-white'
              }`}
            >
              SHORT
            </button>
          </div>

          {/* Account & Risk Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Account Balance</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={accountBalance}
                  onChange={handleBalanceChange}
                  className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-12 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
                  style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">USDT</span>
              </div>
            </div>

            <div className="relative group">
              <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Risk Limit</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={riskPercentage}
                  onChange={handleRiskChange}
                  className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-10 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
                  style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">%</span>
              </div>
            </div>
          </div>

          {/* Entry & Stop Loss Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <div className="flex justify-between items-end mb-1.5">
                <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider">Entry Price</label>
                <button
                  onClick={() => fetchPrice(selectedPair.symbol)}
                  disabled={isLoadingPrice}
                  className="text-[10px] text-[#fcd535] hover:text-white transition-colors"
                >
                  {isLoadingPrice ? 'Loading...' : 'Fetch Market'}
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-12 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
                  style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">USDT</span>
              </div>
            </div>

            <div className="relative group">
              <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Stop Loss</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(e.target.value)}
                  className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-12 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
                  style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">USDT</span>
              </div>
            </div>
          </div>

          {/* Leverage */}
          <div className="relative group w-1/2 pr-2">
            <label className="block text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider mb-1.5">Leverage</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={leverage}
                onChange={handleLeverageChange}
                className="w-full bg-[#181a20] border border-[#2b3139] rounded-lg pl-3 pr-8 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] transition-colors"
                style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#848e9c] pointer-events-none">x</span>
            </div>
          </div>
        </div>

        {/* Right Column: Results Panel */}
        <div className="lg:col-span-5">
          <div className="bg-[#181a20] border border-[#2b3139] rounded-xl p-5 h-full flex flex-col shadow-inner">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide border-b border-[#2b3139] pb-3">Trade Summary</h3>
            {results ? (
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[#848e9c] text-xs font-medium uppercase tracking-wider">Amount at Risk</span>
                  <span className="font-mono text-sm text-[#f6465d] bg-[#f6465d]/10 px-2 py-0.5 rounded">${formatNumber(results.maxRiskUsdt, 2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#848e9c] text-xs font-medium uppercase tracking-wider">Position Size</span>
                  <div className="text-right">
                    <div className="font-mono text-sm text-white">${formatNumber(results.positionSizeUsdt, 2)}</div>
                    <div className="text-[10px] text-[#848e9c] mt-0.5 font-mono">{formatNumber(results.positionSizeUnits, 4)} {selectedPair.baseAsset}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#848e9c] text-xs font-medium uppercase tracking-wider">Required Margin</span>
                  <span className="font-mono text-sm text-[#fcd535]">${formatNumber(results.requiredMargin, 2)}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-[#2b3139]">
                  <span className="text-[10px] font-semibold text-[#848e9c] uppercase tracking-wider block mb-3">Suggested Targets (R:R)</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#1e2329] p-2 rounded border border-[#2b3139]/50 text-center hover:border-[#0ecb81]/30 transition-colors">
                      <div className="text-[10px] text-[#848e9c] mb-1">TP 1:1</div>
                      <div className="text-xs font-mono text-[#0ecb81]">{formatNumber(results.tp1, 4)}</div>
                    </div>
                    <div className="bg-[#1e2329] p-2 rounded border border-[#2b3139]/50 text-center hover:border-[#0ecb81]/50 transition-colors">
                      <div className="text-[10px] text-[#848e9c] mb-1">TP 1:2</div>
                      <div className="text-xs font-mono text-[#0ecb81]">{formatNumber(results.tp2, 4)}</div>
                    </div>
                    <div className="bg-[#1e2329] p-2 rounded border border-[#2b3139]/50 text-center hover:border-[#0ecb81]/80 transition-colors">
                      <div className="text-[10px] text-[#848e9c] mb-1">TP 1:3</div>
                      <div className="text-xs font-mono text-[#0ecb81] font-semibold">{formatNumber(results.tp3, 4)}</div>
                    </div>
                  </div>
                </div>

                {results.isMarginExceeded && (
                  <div className="mt-3 p-2.5 bg-[#f6465d]/10 border border-[#f6465d]/30 text-[#f6465d] text-[11px] rounded flex items-start gap-2">
                    <span className="font-bold mt-0.5">!</span>
                    <p>Margin exceeds account balance. Reduce leverage or lower risk.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center px4">
                <p className="text-[#848e9c] text-xs">Enter your trade parameters to generate risk profile and targets.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}