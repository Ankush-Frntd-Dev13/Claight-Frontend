import { useState } from "react";
import { TrendingUp, TrendingDown, ExternalLink, Loader2 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface PriceItem {
  symbol: string;
  name: string;
  subtitle?: string;
  price: string;
  change: string;
  positive: boolean;
  stable?: boolean;
  color: string;
  bgColor: string;
  chartData: { v: number }[];
}

const priceItems: PriceItem[] = [
  {
    symbol: "AL",
    name: "Acetic Acid",
    // subtitle: 'Cash / Tonne',
    price: "$451.53",
    change: "-25%",
    positive: true,
    color: "#14b8a6",
    bgColor: "#ccfbf1",
    chartData: [
      { v: 40 },
      { v: 42 },
      { v: 38 },
      { v: 45 },
      { v: 43 },
      { v: 47 },
      { v: 44 },
      { v: 48 },
      { v: 46 },
      { v: 50 },
      { v: 49 },
      { v: 52 },
    ],
  },
  {
    symbol: "CU",
    name: "Phenol",
    // subtitle: 'LME Stocks',
    price: "$1127.35",
    change: "+7.9%",
    positive: false,
    color: "#ef4444",
    bgColor: "#fef2f2",
    chartData: [
      { v: 55 },
      { v: 53 },
      { v: 56 },
      { v: 52 },
      { v: 50 },
      { v: 51 },
      { v: 48 },
      { v: 46 },
      { v: 47 },
      { v: 44 },
      { v: 43 },
      { v: 42 },
    ],
  },
  {
    symbol: "PP",
    name: "Methanol",
    // subtitle: 'CFR SE Asia',
    price: "$319.58",
    change: "Stable",
    positive: true,
    stable: true,
    color: "#7c3aed",
    bgColor: "#ede9fe",
    chartData: [
      { v: 30 },
      { v: 31 },
      { v: 30 },
      { v: 31 },
      { v: 30 },
      { v: 31 },
      { v: 30 },
      { v: 31 },
      { v: 30 },
      { v: 31 },
      { v: 30 },
      { v: 31 },
    ],
  },
];

const PriceDatabaseCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    const newTab = window.open("about:blank", "_blank");
    setIsLoading(true);
    setTimeout(() => {
      if (newTab) {
        newTab.location.href =
          // "https://price-database.procurementresource.com/login?utam_cli=$2a$15$BkVVmRsU4w2da3yVLBERG.HuBS.gsQy5DWaL5YFaH1mh9Phtl4GaC"
          "https://www.procurementresource.com/Account/Login";
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <article
      onClick={handleOpen}
      className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full cursor-pointer hover:shadow-md hover:border-primary-200 transition-all duration-200"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-body text-lg font-semibold text-text-primary">
          Price Database
        </h2>
        <p className="text-sm text-text-muted mt-0.5 w-full leading-relaxed">
          A centralized repository of structured price data across markets, time
          periods, and geographies, enabling analysis, benchmarking, and trend
          insights.
        </p>
      </div>

      {/* Price rows */}
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {priceItems.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center gap-2 sm:gap-3 min-w-0"
          >
            {/* Symbol badge */}
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: item.bgColor, color: item.color }}
            >
              {item.symbol}
            </div>

            {/* Name */}
            <div className="min-w-0 shrink-0">
              <p className="text-xs sm:text-sm font-semibold text-text-primary leading-tight truncate">
                {item.name}
              </p>
            </div>

            {/* Sparkline chart */}
            <div className="flex-1 h-8 min-w-0 hidden sm:block">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.chartData}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={item.color}
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Price + change */}
            <div className="text-right shrink-0 ml-auto">
              <p className="text-xs sm:text-sm font-bold text-text-primary">
                {item.price}
              </p>
              <div className="flex items-center justify-end gap-0.5">
                {!item.stable &&
                  (item.positive ? (
                    <TrendingUp size={10} className="text-success-500" />
                  ) : (
                    <TrendingDown size={10} className="text-danger-500" />
                  ))}
                <span
                  className={`text-[10px] font-medium ${
                    item.stable
                      ? "text-text-muted"
                      : item.positive
                        ? "text-success-500"
                        : "text-danger-500"
                  }`}
                >
                  {item.stable ? "— Stable" : item.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-border">
        <span className="flex items-center gap-1 text-xs font-semibold text-primary-500">
          {isLoading ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Opening...
            </>
          ) : (
            <>
              Open Price Database <ExternalLink size={12} />
            </>
          )}
        </span>
      </div>
    </article>
  );
};

export default PriceDatabaseCard;
