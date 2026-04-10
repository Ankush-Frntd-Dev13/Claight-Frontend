import { useState, useEffect } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'

interface CostItem {
  label: string
  percentage: number
  color: string
  bgColor: string
}

const costItems: CostItem[] = [
  { label: 'Raw Materials', percentage: 42, color: 'bg-[#14b8a6]', bgColor: 'bg-[#14b8a6]/15' },
  { label: 'Direct Labor', percentage: 18, color: 'bg-[#f59e0b]', bgColor: 'bg-[#f59e0b]/15' },
  { label: 'Overhead & Logistics', percentage: 15, color: 'bg-[#1e1b4b]', bgColor: 'bg-[#1e1b4b]/15' },
  { label: 'Utility Cost', percentage: 12, color: 'bg-[#6366f1]', bgColor: 'bg-[#6366f1]/15' },
]

const CostModelsCard = () => {
  const [animated, setAnimated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = () => {
    const newTab = window.open("about:blank", "_blank")
    setIsLoading(true)
    setTimeout(() => {
      if (newTab) {
        newTab.location.href =
          "https://cost-model.procurementresource.com?utam_cli=$2a$15$BkVVmRsU4w2da3yVLBERG.HuBS.gsQy5DWaL5YFaH1mh9Phtl4GaC"
      }
      setIsLoading(false)
    }, 2000)
  }

  useEffect(() => {
    const t = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <article onClick={handleOpen} className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full cursor-pointer hover:shadow-md hover:border-primary-200 transition-all duration-200">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-body text-lg font-semibold text-text-primary">Digital Cost Model</h2>
        <p className="text-xs text-text-muted mt-0.5 leading-relaxed w-full">
          An Always-on tool delivering precise cost breakdowns of raw materials, labor, utilities, and overheads to drive data-led supplier negotiations and cost benchmarking.
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
        <button
          onClick={handleOpen}
          disabled={isLoading}
          className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Opening...
            </>
          ) : (
            <>
              Open Digital Cost Model <ExternalLink size={12} />
            </>
          )}
        </button>
      </div>
    </article>
  )
}

export default CostModelsCard
