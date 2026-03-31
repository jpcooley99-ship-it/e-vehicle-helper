// Approximate road distances in miles between major UK cities
// Only one direction stored — lookup function handles both directions

export const UK_CITIES = [
  'London',
  'Birmingham',
  'Manchester',
  'Leeds',
  'Liverpool',
  'Bristol',
  'Sheffield',
  'Newcastle',
  'Edinburgh',
  'Glasgow',
  'Cardiff',
  'Nottingham',
  'Southampton',
  'Brighton',
  'Oxford',
  'Cambridge',
  'Leicester',
  'York',
  'Exeter',
  'Aberdeen',
]

// Distance matrix — city pairs (alphabetical order for each pair)
// Format: 'CityA|CityB': miles
const DISTANCE_MAP = {
  'Aberdeen|Edinburgh': 126,
  'Aberdeen|Glasgow': 145,
  'Aberdeen|Newcastle': 246,
  'Birmingham|Bristol': 87,
  'Birmingham|Cambridge': 96,
  'Birmingham|Cardiff': 110,
  'Birmingham|Edinburgh': 295,
  'Birmingham|Exeter': 165,
  'Birmingham|Glasgow': 295,
  'Birmingham|Leeds': 119,
  'Birmingham|Leicester': 43,
  'Birmingham|Liverpool': 99,
  'Birmingham|London': 120,
  'Birmingham|Manchester': 86,
  'Birmingham|Newcastle': 178,
  'Birmingham|Nottingham': 50,
  'Birmingham|Oxford': 65,
  'Birmingham|Sheffield': 76,
  'Birmingham|Southampton': 130,
  'Birmingham|York': 138,
  'Brighton|Cambridge': 101,
  'Brighton|London': 53,
  'Brighton|Oxford': 100,
  'Brighton|Southampton': 64,
  'Bristol|Cardiff': 45,
  'Bristol|Exeter': 80,
  'Bristol|London': 120,
  'Bristol|Oxford': 75,
  'Bristol|Southampton': 76,
  'Cambridge|Leeds': 154,
  'Cambridge|Leicester': 73,
  'Cambridge|London': 60,
  'Cambridge|Nottingham': 72,
  'Cardiff|Exeter': 120,
  'Cardiff|London': 155,
  'Cardiff|Southampton': 110,
  'Edinburgh|Glasgow': 47,
  'Edinburgh|Leeds': 214,
  'Edinburgh|London': 405,
  'Edinburgh|Manchester': 220,
  'Edinburgh|Newcastle': 105,
  'Edinburgh|York': 193,
  'Exeter|London': 172,
  'Exeter|Southampton': 110,
  'Glasgow|Leeds': 212,
  'Glasgow|Liverpool': 221,
  'Glasgow|London': 400,
  'Glasgow|Manchester': 215,
  'Glasgow|Newcastle': 154,
  'Leeds|Leicester': 102,
  'Leeds|Liverpool': 75,
  'Leeds|London': 195,
  'Leeds|Manchester': 43,
  'Leeds|Newcastle': 95,
  'Leeds|Nottingham': 74,
  'Leeds|Sheffield': 36,
  'Leeds|York': 25,
  'Leicester|London': 101,
  'Leicester|Manchester': 105,
  'Leicester|Nottingham': 27,
  'Leicester|Sheffield': 55,
  'Liverpool|London': 212,
  'Liverpool|Manchester': 35,
  'Liverpool|Sheffield': 76,
  'London|Manchester': 207,
  'London|Newcastle': 277,
  'London|Nottingham': 127,
  'London|Oxford': 60,
  'London|Sheffield': 168,
  'London|Southampton': 79,
  'London|York': 210,
  'Manchester|Newcastle': 172,
  'Manchester|Nottingham': 75,
  'Manchester|Sheffield': 38,
  'Manchester|York': 68,
  'Newcastle|Sheffield': 130,
  'Newcastle|York': 83,
  'Nottingham|Sheffield': 38,
  'Nottingham|York': 80,
  'Oxford|Southampton': 65,
  'Sheffield|York': 30,
  'Southampton|York': 210,
}

function normaliseCityName(name) {
  return name.trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export function getDistance(cityA, cityB) {
  const a = normaliseCityName(cityA)
  const b = normaliseCityName(cityB)

  if (a === b) return 0

  const key1 = `${a}|${b}`
  const key2 = `${b}|${a}`

  if (DISTANCE_MAP[key1] !== undefined) return DISTANCE_MAP[key1]
  if (DISTANCE_MAP[key2] !== undefined) return DISTANCE_MAP[key2]

  // Fallback: estimate via known cities
  return estimateDistanceViaLondon(a, b)
}

// Very rough fallback — route via London if direct not found
function estimateDistanceViaLondon(cityA, cityB) {
  const toA = getDirectDistance(cityA, 'London')
  const toB = getDirectDistance(cityB, 'London')
  if (toA && toB) return Math.round((toA + toB) * 0.85) // crude estimate
  return 250 // default unknown
}

function getDirectDistance(city, reference) {
  const key1 = `${city}|${reference}`
  const key2 = `${reference}|${city}`
  return DISTANCE_MAP[key1] || DISTANCE_MAP[key2] || null
}
