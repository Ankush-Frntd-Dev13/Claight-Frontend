import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const destinations = [
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Turkey', flag: '🇹🇷' },
]

const origins = [
  {
    name: 'Indonesia',
    flag: '🇮🇩',
    values: [
      { text: '25.0%', color: '#b8860b' },
      { text: '0.3%', color: '#10b981' },
      { text: '32.4 USD', color: '#b8860b' },
      { text: '31.2%', color: '#b8860b' },
    ],
  },
  {
    name: 'Malaysia',
    flag: '🇲🇾',
    values: [
      { text: '25.0%', color: '#b8860b' },
      { text: '0.3%', color: '#10b981' },
      { text: '32.4 USD', color: '#b8860b' },
      { text: '21.8%', color: '#b8860b' },
    ],
  },
  {
    name: 'Singapore',
    flag: '🇸🇬',
    values: [
      { text: '25.0%', color: '#b8860b' },
      { text: '0.3%', color: '#10b981' },
      { text: '32.4 USD', color: '#b8860b' },
      { text: '31.2%', color: '#b8860b' },
    ],
  },
]

const SourcingCompassCard = () => {
  return (
    <article className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-body text-lg font-semibold text-text-primary">Sourcing Compass</h2>
        <p className="text-xs text-text-muted mt-0.5 max-w-xs leading-relaxed">
          Instantly compare tariffs across all origin & destination country combinations.
        </p>
      </div>

      {/* Tariff Table */}
      <div className="flex-1 overflow-hidden -mx-1">
        <table className="w-full text-xs">
          {/* Header row */}
          <thead>
            <tr className="bg-gradient-to-r from-[#2d1b69] to-[#4c1d95] text-white">
              <th className="text-left py-2 px-3 rounded-tl-lg font-semibold whitespace-nowrap">
                Tariff %
              </th>
              {destinations.map((dest) => (
                <th key={dest.name} className="py-2 px-3 font-semibold whitespace-nowrap last:rounded-tr-lg">
                  <span className="flex items-center justify-center gap-1.5">
                    <span>{dest.name}</span>
                    <span>{dest.flag}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {origins.map((origin, i) => (
              <tr
                key={origin.name}
                className={i % 2 === 0 ? 'bg-primary-50/40' : 'bg-white'}
              >
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    <span className="text-base">{origin.flag}</span>
                    <span className="font-medium text-text-primary">{origin.name}</span>
                  </span>
                </td>
                {origin.values.map((val, j) => (
                  <td key={j} className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className="flex items-center justify-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: val.color }}
                      />
                      <span className="font-semibold" style={{ color: val.color }}>
                        {val.text}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Redirect link */}
      <div className="mt-4 pt-3 border-t border-border">
        <Link to="/sourcing-compass" className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors">
          Open Sourcing Compass <ExternalLink size={12} />
        </Link>
      </div>
    </article>
  )
}

export default SourcingCompassCard
