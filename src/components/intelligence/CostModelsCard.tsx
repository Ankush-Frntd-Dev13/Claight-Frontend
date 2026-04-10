import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CostItem {
  label: string
  percentage: number
  color: string
  bgColor: string
}

const costItems: CostItem[] = [
  { label: 'Raw Materials', percentage: 42, color: 'bg-[#14b8a6]', bgColor: 'bg-[#14b8a6]/15' },
  { label: 'Direct Labor', percentage: 28, color: 'bg-[#f59e0b]', bgColor: 'bg-[#f59e0b]/15' },
  { label: 'Overhead & Logistics', percentage: 30, color: 'bg-[#1e1b4b]', bgColor: 'bg-[#1e1b4b]/15' },
]

const CostModelsCard = () => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <article className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-body text-lg font-semibold text-text-primary">Cost Models</h2>
        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
          Breakdown of procurement cost across key categories.
        </p>
      </div>

      {/* Cost bars */}
      <div className="flex flex-col gap-4 mt-auto mb-auto">
        {costItems.map((item, i) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-text-secondary">{item.label}</span>
              <span className="text-sm font-semibold text-text-primary">{item.percentage}%</span>
            </div>
            <div className={`w-full h-2 rounded-full ${item.bgColor}`}>
              <div
                className={`h-full rounded-full ${item.color} transition-all ease-out`}
                style={{
                  width: animated ? `${item.percentage}%` : '0%',
                  transitionDuration: `${700 + i * 150}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Redirect link */}
      <div className="mt-4 pt-3 border-t border-border">
        <Link to="/cost-models" className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors">
          Open Cost Models <ExternalLink size={12} />
        </Link>
      </div>
    </article>
  )
}

export default CostModelsCard
