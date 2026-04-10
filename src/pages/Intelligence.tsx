import WelcomeHeader from '../components/intelligence/WelcomeHeader'
import Procure360Card from '../components/intelligence/Procure360Card'
import CostModelsCard from '../components/intelligence/CostModelsCard'
import SourcingCompassCard from '../components/intelligence/SourcingCompassCard'
import PriceDatabaseCard from '../components/intelligence/PriceDatabaseCard'
import InflationForecastingCard from '../components/intelligence/InflationForecastingCard'
import SustainabilityTrackerCard from '../components/intelligence/SustainabilityTrackerCard'

const Intelligence = () => {
  return (
    <section aria-label="Intelligence dashboard">
      <WelcomeHeader />

      {/* Top row - Procure360 + Cost Models */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div id="card-procure360" className="lg:col-span-3 rounded-2xl transition-shadow duration-500">
          <Procure360Card />
        </div>
        <div id="card-cost-models" className="lg:col-span-2 rounded-2xl transition-shadow duration-500">
          <CostModelsCard />
        </div>
      </div>

      {/* Second row - Sourcing Compass + FNF Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5">
        <div id="card-sourcing-compass" className="lg:col-span-2 rounded-2xl transition-shadow duration-500">
          <SourcingCompassCard />
        </div>
        <div id="card-inflation-forecasting" className="lg:col-span-3 rounded-2xl transition-shadow duration-500">
          <InflationForecastingCard />
        </div>
      </div>

      {/* Third row - Price Database + Sustainability Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <div id="card-price-database" className="rounded-2xl transition-shadow duration-500">
          <PriceDatabaseCard />
        </div>
        <div id="card-sustainability-tracker" className="rounded-2xl transition-shadow duration-500">
          <SustainabilityTrackerCard />
        </div>
      </div>
    </section>
  )
}

export default Intelligence
