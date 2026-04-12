import { useState } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'
import WorldMap from './WorldMap'

const Procure360Card = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = () => {
    const newTab = window.open('about:blank', '_blank')
    setIsLoading(true)
    setTimeout(() => {
      if (newTab) {
        newTab.location.href =
          'https://Procure360.procurementresource.com/'
      }
      setIsLoading(false)
    }, 2000)
  }

  return (
    <article
      onClick={handleOpen}
      className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full cursor-pointer hover:shadow-md hover:border-primary-200 transition-all duration-200"
    >
      {/* Header */}
      <div className="mb-2">
        <h2 className="font-body text-lg font-semibold text-text-primary">Procure 360</h2>
        <p className="text-sm text-text-muted mt-0.5 w-full leading-relaxed">
          Leverages global trade data across 100+ countries to benchmark suppliers, identify sourcing opportunities, and optimize supply chain strategies.
        </p>
      </div>

      {/* World Map with outer border */}
      <div className="flex-1 border border-border rounded-xl overflow-hidden">
        <WorldMap />
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
              Open Procure 360 <ExternalLink size={12} />
            </>
          )}
        </span>
      </div>
    </article>
  )
}

export default Procure360Card
