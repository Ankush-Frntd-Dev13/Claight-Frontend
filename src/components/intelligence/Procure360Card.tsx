import WorldMap from './WorldMap'

const Procure360Card = () => {
  return (
    <article className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full">
      {/* Header */}
      <div className="mb-2">
        <h2 className="font-body text-lg font-semibold text-text-primary">Procure 360</h2>
        <p className="text-xs text-text-muted mt-0.5 w-full leading-relaxed">
          Leverages global trade data across 100+ countries to benchmark suppliers, identify sourcing opportunities, and optimize supply chain strategies.
        </p>
      </div>

      {/* World Map with outer border */}
      <div className="flex-1 border border-border rounded-xl overflow-hidden">
        <WorldMap />
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-border">
        <span className="flex items-center gap-1 text-xs font-semibold text-text-muted">
          Open Procure 360
        </span>
      </div>
    </article>
  )
}

export default Procure360Card
