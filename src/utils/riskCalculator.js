/**
 * Crypto Position Size & Risk/Reward Calculator Core
 */

export function calculatePosition({
  accountBalance,   // رصيد الحساب بالـ USDT
  riskPercentage,   // نسبة المخاطرة (مثال: 1 أو 2)
  entryPrice,       // سعر الدخول
  stopLossPrice,    // سعر وقف الخسارة
  leverage = 1,     // الرافعة المالية (افتراضياً 1)
  positionType = 'long' // نوع الصفقة: 'long' أو 'short'
}) {
  // التحقق من صحة المدخلات الأساسية
  const balance = parseFloat(accountBalance);
  const risk = parseFloat(riskPercentage);
  const entry = parseFloat(entryPrice);
  const stopLoss = parseFloat(stopLossPrice);
  const lev = parseFloat(leverage);

  if (!balance || !risk || !entry || !stopLoss || entry === stopLoss || balance <= 0 || risk <= 0) {
    return null;
  }

  // 1. حساب أقصى مبلغ معرض للخسارة (Max Risk Amount in USDT)
  const maxRiskUsdt = balance * (risk / 100);

  // 2. حساب نسبة تغير السعر حتى وقف الخسارة (Stop Loss Percentage)
  const priceDiff = Math.abs(entry - stopLoss);
  const stopLossPercent = (priceDiff / entry) * 100;

  // 3. حساب حجم الصفقة الإجمالي (Position Size)
  const positionSizeUsdt = maxRiskUsdt / (stopLossPercent / 100);
  const positionSizeUnits = positionSizeUsdt / entry;

  // 4. حساب الهامش المطلوب من المحفظة (Required Margin) بناءً على الرافعة المالية
  const requiredMargin = positionSizeUsdt / lev;

  // 5. حساب مستويات أخذ الأرباح (Take Profit Levels: TP1=1:1, TP2=1:2, TP3=1:3)
  const isLong = positionType === 'long';
  const tp1 = isLong ? entry + priceDiff : entry - priceDiff;
  const tp2 = isLong ? entry + (priceDiff * 2) : entry - (priceDiff * 2);
  const tp3 = isLong ? entry + (priceDiff * 3) : entry - (priceDiff * 3);

  return {
    maxRiskUsdt: maxRiskUsdt.toFixed(2),
    positionSizeUsdt: positionSizeUsdt.toFixed(2),
    positionSizeUnits: positionSizeUnits.toFixed(4),
    requiredMargin: requiredMargin.toFixed(2),
    stopLossPercent: stopLossPercent.toFixed(2),
    tp1: tp1.toFixed(4),
    tp2: tp2.toFixed(4),
    tp3: tp3.toFixed(4),
    isMarginExceeded: requiredMargin > balance // تنبيه إذا كان الهامش المطلوب أكبر من رصيد الحساب
  };
}