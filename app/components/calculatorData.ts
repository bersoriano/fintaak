export interface Provider {
  id: string;
  name: string;
  emoji: string;
  getFixedFee: (amount: number) => number;
  getMarkupPct: (amount: number) => number;
}

export const MID_RATE = 17.4;

export const providers: Provider[] = [
  {
    id: "sendwave",
    name: "Sendwave",
    emoji: "⚡",
    getFixedFee: () => 0,
    getMarkupPct: () => 0.75,
  },
  {
    id: "paysend",
    name: "Paysend",
    emoji: "💳",
    getFixedFee: () => 0.99,
    getMarkupPct: () => 0.85,
  },
  {
    id: "moneygram",
    name: "Moneygram",
    emoji: "🟠",
    getFixedFee: (amount) => {
      if (amount <= 200) return 3.9;
      if (amount <= 500) return 5.5;
      if (amount <= 1000) return 6.99;
      return 7.99;
    },
    getMarkupPct: () => 0.55,
  },
  {
    id: "western-union",
    name: "Western Union",
    emoji: "🟡",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 400 ? 1.85 : 1.15),
  },
  {
    id: "ria",
    name: "Ria Money Transfer",
    emoji: "🟢",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 600 ? 1.2 : 1.1),
  },
  {
    id: "felix-pago",
    name: "Felix Pago",
    emoji: "🦊",
    getFixedFee: () => 2.99,
    getMarkupPct: () => 1.7,
  },
  {
    id: "remitly",
    name: "Remitly",
    emoji: "📲",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 500 ? 3.88 : 1.45),
  },
  {
    id: "worldremit",
    name: "WorldRemit",
    emoji: "🌍",
    getFixedFee: () => 1.99,
    getMarkupPct: () => 2.3,
  },
];

export const PRESETS = [200, 500, 1000, 2000];

export function calcProvider(provider: Provider, amount: number) {
  const fixedFee = provider.getFixedFee(amount);
  const markupPct = provider.getMarkupPct(amount);
  const providerRate = MID_RATE * (1 - markupPct / 100);
  const hiddenFxCost = (markupPct / 100) * amount;
  const totalCost = fixedFee + hiddenFxCost;
  const totalPct = (totalCost / amount) * 100;
  const received = amount * providerRate;
  const idealReceived = amount * MID_RATE;
  const lostMXN = idealReceived - received;

  return {
    fixedFee,
    markupPct,
    providerRate,
    hiddenFxCost,
    totalCost,
    totalPct,
    received,
    idealReceived,
    lostMXN,
  };
}

export function formatMXN(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatUSD(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
