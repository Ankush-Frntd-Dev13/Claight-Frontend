import { ExternalLink, AlertTriangle, TrendingDown, ShoppingCart, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const metricCards = [
  {
    label: 'Compounds at Risk',
    value: '7',
    subtitle: 'High volatility + bullish trend',
    subtitleColor: 'text-text-muted',
    icon: <AlertTriangle size={16} />,
    iconColor: 'text-orange-500',
  },
  {
    label: 'Weighted Forecast Impact',
    value: '-1.1%',
    valueColor: 'text-[#10b981]',
    subtitle: 'Price-weighted avg change',
    subtitleColor: 'text-text-muted',
    icon: <TrendingDown size={16} />,
    iconColor: 'text-[#10b981]',
  },
  {
    label: 'Forward Buy Alerts',
    value: '19',
    subtitle: 'Lock in prices now',
    subtitleColor: 'text-danger-500',
    icon: <ShoppingCart size={16} />,
    iconColor: 'text-danger-500',
  },
  {
    label: 'Delay Opportunities',
    value: '26',
    subtitle: 'Wait for price drops',
    subtitleColor: 'text-[#10b981]',
    icon: <Clock size={16} />,
    iconColor: 'text-[#10b981]',
  },
]

const InflationForecastingCard = () => {
  return (
    <article className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full">
      {/* Top label + title */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold tracking-widest text-primary-500 uppercase mb-1">
          F&F Intelligence · Market Overview
        </p>
        <h2 className="font-body text-lg font-semibold text-text-primary">FNF Intelligence</h2>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
          <span>🧪</span> 61 Fragrances
        </span>
        <span className="text-text-muted text-xs">·</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
          <span>💧</span> 18 Flavours
        </span>
        <span className="text-text-muted text-xs">·</span>
        <span className="text-xs text-text-muted">79 compounds tracked</span>
      </div>

      {/* Metric cards - clean layout */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 flex-1">
        {metricCards.map((card) => (
          <div key={card.label} className="flex flex-col border border-border rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold tracking-wider text-text-muted uppercase leading-tight">
                {card.label}
              </p>
              <span className={card.iconColor}>{card.icon}</span>
            </div>
            <p className={`text-2xl font-bold font-body leading-tight ${card.valueColor || 'text-text-primary'}`}>
              {card.value}
            </p>
            <p className={`text-[10px] font-medium mt-0.5 ${card.subtitleColor}`}>
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Redirect link */}
      <div className="mt-4 pt-3 border-t border-border">
        <Link to="/inflation-forecasting" className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors">
          Open FNF Intelligence <ExternalLink size={12} />
        </Link>
      </div>
    </article>
  )
}

export default InflationForecastingCard
