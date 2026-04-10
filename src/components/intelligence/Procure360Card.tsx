import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import WorldMap from './WorldMap'

const Procure360Card = () => {
  return (
    <article className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full">
      {/* Header */}
      <div className="mb-2">
        <h2 className="font-body text-lg font-semibold text-text-primary">Procure360</h2>
        <p className="text-xs text-text-muted mt-0.5 max-w-xs leading-relaxed">
          Real-time global mapping and tracking for millions of trade data.
        </p>
      </div>

      {/* World Map with outer border */}
      <div className="flex-1 border border-border rounded-xl overflow-hidden">
        <WorldMap />
      </div>

      {/* Redirect link */}
      <div className="mt-4 pt-3 border-t border-border">
        <Link to="/procure360" className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors">
          Open Procure360 <ExternalLink size={12} />
        </Link>
      </div>
    </article>
  )
}

export default Procure360Card
