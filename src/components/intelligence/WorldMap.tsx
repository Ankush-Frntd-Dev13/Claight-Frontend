import { useEffect, useState, useMemo } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'


interface CountryFeature {
  type: 'Feature'
  id: string
  geometry: GeoJSON.Geometry
  properties: Record<string, unknown>
}

// Country coloring by ISO numeric code
const greenCountries = new Set(['840', '076', '124', '484']) // USA, Brazil, Canada, Mexico
const purpleCountries = new Set(['156', '356', '704', '764', '458']) // China, India, Vietnam, Thailand, Malaysia
const orangeCountries = new Set(['682', '784', '512', '634', '414', '360']) // Saudi, UAE, Oman, Qatar, Kuwait, Indonesia

const getCountryFill = (id: string) => {
  if (greenCountries.has(id)) return '#2aa683'
  if (purpleCountries.has(id)) return '#7c3aed'
  if (orangeCountries.has(id)) return '#f5a623'
  return '#ddd8ee' // light lavender for neutral countries
}

const getCountryStroke = (id: string) => {
  if (greenCountries.has(id)) return '#1e8c6e'
  if (purpleCountries.has(id)) return '#5b21b6'
  if (orangeCountries.has(id)) return '#d4891a'
  return '#c5c0d8'
}

interface MarkerData {
  coordinates: [number, number]
  label: string
  color: string
  textColor: string
  offsetY?: number
}

const markers: MarkerData[] = [
  { coordinates: [-98, 38], label: '40 Exporters', color: '#2aa683', textColor: '#1e8c6e' },
  { coordinates: [-55, -12], label: '40 Exporters', color: '#2aa683', textColor: '#1e8c6e', offsetY: 8 },
  { coordinates: [12, 50], label: '40 Exporters', color: '#2aa683', textColor: '#1e8c6e' },
  { coordinates: [5, 45], label: '42 Exporters', color: '#2aa683', textColor: '#1e8c6e' },
  { coordinates: [50, 24], label: '14 Exporters', color: '#f5a623', textColor: '#d4891a' },
  { coordinates: [80, 22], label: '12 Importers', color: '#7c3aed', textColor: '#6c3acd' },
  { coordinates: [105, 36], label: '12 Importers', color: '#7c3aed', textColor: '#6c3acd' },
  { coordinates: [120, 30], label: '40 Exporters', color: '#2aa683', textColor: '#1e8c6e' },
  { coordinates: [108, 2], label: '40 Exporters', color: '#7c3aed', textColor: '#6c3acd' },
  { coordinates: [134, -25], label: '40 Exporters', color: '#2aa683', textColor: '#1e8c6e' },
]

const routes: { from: [number, number]; to: [number, number]; color: string }[] = [
  { from: [-95, 38], to: [10, 48], color: '#2aa683' },
  { from: [15, 48], to: [48, 26], color: '#f5a623' },
  { from: [52, 24], to: [78, 22], color: '#7c3aed' },
  { from: [82, 22], to: [102, 34], color: '#7c3aed' },
  { from: [108, 34], to: [110, 5], color: '#7c3aed' },
  { from: [-50, -10], to: [10, 18], color: '#2aa683' },
]

const WIDTH = 900
const HEIGHT = 440

const WorldMap = () => {
  const [countries, setCountries] = useState<CountryFeature[]>([])

  const projection = useMemo(
    () =>
      geoMercator()
        .scale(130)
        .center([30, 20])
        .translate([WIDTH / 2, HEIGHT / 2]),
    []
  )

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  useEffect(() => {
    fetch('/countries-110m.json')
      .then((res) => res.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((topology: any) => {
        const geojson = feature(topology, topology.objects.countries) as unknown as GeoJSON.FeatureCollection
        setCountries(geojson.features as unknown as CountryFeature[])
      })
  }, [])

  if (!countries.length) {
    return (
      <div className="w-full aspect-[900/440] bg-[#eeeaf6] rounded-xl animate-pulse" />
    )
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-auto"
      aria-label="Global shipment map"
    >
      {/* Ocean background */}
      <rect width={WIDTH} height={HEIGHT} fill="#eeeaf6" />

      {/* Country shapes */}
      {countries.map((country) => {
        const d = pathGenerator(country as unknown as GeoJSON.Feature)
        if (!d) return null
        return (
          <path
            key={country.id}
            d={d}
            fill={getCountryFill(country.id)}
            stroke={getCountryStroke(country.id)}
            strokeWidth={0.5}
          />
        )
      })}

      {/* Trade route lines */}
      {routes.map((route, i) => {
        const from = projection(route.from)
        const to = projection(route.to)
        if (!from || !to) return null
        return (
          <line
            key={i}
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke={route.color}
            strokeWidth={1.5}
            strokeDasharray="5 3"
            opacity={0.5}
          />
        )
      })}

      {/* Markers with labels */}
      {markers.map((marker) => {
        const point = projection(marker.coordinates)
        if (!point) return null
        const [x, y] = point
        const labelY = y + (marker.offsetY ?? 16)

        return (
          <g key={marker.label + marker.coordinates.join(',')}>
            {/* Outer glow */}
            <circle cx={x} cy={y} r={7} fill={marker.color} opacity={0.15} />
            {/* White ring */}
            <circle cx={x} cy={y} r={4.5} fill="#fff" stroke={marker.color} strokeWidth={1.5} />
            {/* Center dot */}
            <circle cx={x} cy={y} r={2} fill={marker.color} />

            {/* Label badge */}
            <rect
              x={x - 38}
              y={labelY - 9}
              width={76}
              height={18}
              rx={9}
              fill="#fff"
              stroke={marker.color}
              strokeWidth={0.8}
              opacity={0.95}
            />
            <text
              x={x}
              y={labelY + 3}
              textAnchor="middle"
              fontSize="8"
              fontWeight="600"
              fill={marker.textColor}
              fontFamily="Inter, sans-serif"
            >
              {marker.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default WorldMap
