import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface PriceItem {
  symbol: string
  name: string
  subtitle?: string
  price: string
  change: string
  positive: boolean
  stable?: boolean
  color: string
  bgColor: string
  chartData: { v: number }[]
}

const priceItems: PriceItem[] = [
  {
    symbol: 'AL',
    name: 'Acetic Acid',
    // subtitle: 'Cash / Tonne',
    price: '$451.53',
    change: '-25%',
    positive: true,
    color: '#14b8a6',
    bgColor: '#ccfbf1',
    chartData: [
      { v: 40 }, { v: 42 }, { v: 38 }, { v: 45 }, { v: 43 }, { v: 47 },
      { v: 44 }, { v: 48 }, { v: 46 }, { v: 50 }, { v: 49 }, { v: 52 },
    ],
  },
  {
    symbol: 'CU',
    name: 'Phenol',
    // subtitle: 'LME Stocks',
    price: '$1127.35',
    change: '+7.9%',
    positive: false,
    color: '#ef4444',
    bgColor: '#fef2f2',
    chartData: [
      { v: 55 }, { v: 53 }, { v: 56 }, { v: 52 }, { v: 50 }, { v: 51 },
      { v: 48 }, { v: 46 }, { v: 47 }, { v: 44 }, { v: 43 }, { v: 42 },
    ],
  },
  {
    symbol: 'PP',
    name: 'Methanol',
    // subtitle: 'CFR SE Asia',
    price: '$319.58',
    change: 'Stable',
    positive: true,
    stable: true,
    color: '#7c3aed',
    bgColor: '#ede9fe',
    chartData: [
      { v: 30 }, { v: 31 }, { v: 30 }, { v: 31 }, { v: 30 }, { v: 31 },
      { v: 30 }, { v: 31 }, { v: 30 }, { v: 31 }, { v: 30 }, { v: 31 },
    ],
  },
]

const PriceDatabaseCard = () => {
  return (
    <article
      className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-body text-lg font-semibold text-text-primary">Price Database</h2>
        <p className="text-xs text-text-muted mt-0.5 max-w-md leading-relaxed">
          Real-time global mapping tracking 42,000 active nodes across 12 maritime corridors.
        </p>
      </div>

      {/* Price rows */}
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {priceItems.map((item) => (
          <div key={item.symbol} className="flex items-center gap-3">
            {/* Symbol badge */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: item.bgColor, color: item.color }}
            >
              {item.symbol}
            </div>

            {/* Name */}
            <div className="w-28 shrink-0">
              <p className="text-sm font-semibold text-text-primary leading-tight">{item.name}</p>
            </div>

            {/* Sparkline chart */}
            <div className="flex-1 h-8">
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
            <div className="text-right w-24 shrink-0">
              <p className="text-sm font-bold text-text-primary">{item.price}</p>
              <div className="flex items-center justify-end gap-0.5">
                {!item.stable && (
                  item.positive
                    ? <TrendingUp size={10} className="text-success-500" />
                    : <TrendingDown size={10} className="text-danger-500" />
                )}
                <span
                  className={`text-[10px] font-medium ${
                    item.stable
                      ? 'text-text-muted'
                      : item.positive
                        ? 'text-success-500'
                        : 'text-danger-500'
                  }`}
                >
                  {item.stable ? '— Stable' : item.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Redirect link */}
      <div className="mt-4 pt-3 border-t border-border">
        <Link to="/price-database" className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors">
          Open Price Database <ExternalLink size={12} />
        </Link>
      </div>
    </article>
  )
}

export default PriceDatabaseCard
