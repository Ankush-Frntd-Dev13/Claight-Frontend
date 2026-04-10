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
      <div className="grid grid-cols-1 lg:grid-cols-20 gap-5">
        <div id="card-procure360" className="lg:col-span-11 rounded-2xl transition-shadow duration-500">
          <Procure360Card />
        </div>
        <div id="card-cost-models" className="lg:col-span-9 rounded-2xl transition-shadow duration-500">
          <CostModelsCard />
        </div>
      </div>

      {/* Second row - Sourcing Compass + Commodity Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-20 gap-5 mt-5">
        <div id="card-sourcing-compass" className="lg:col-span-11 rounded-2xl transition-shadow duration-500 overflow-hidden">
          <SourcingCompassCard />
        </div>
        <div id="card-inflation-forecasting" className="lg:col-span-9 rounded-2xl transition-shadow duration-500">
          <InflationForecastingCard />
        </div>
      </div>

      {/* Third row - Price Database + Sustainability Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-20 gap-5 mt-5">
        <div id="card-price-database" className="lg:col-span-11 rounded-2xl transition-shadow duration-500">
          <PriceDatabaseCard />
        </div>
        <div id="card-sustainability-tracker" className="lg:col-span-9 rounded-2xl transition-shadow duration-500">
          <SustainabilityTrackerCard />
        </div>
      </div>
    </section>
  )
}

export default Intelligence
