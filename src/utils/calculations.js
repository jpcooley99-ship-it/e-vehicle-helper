import { CONSTANTS } from '../data/constants.js'
import { getDistance } from '../data/distances.js'

// ── Fuel / Energy costs ──────────────────────────────────────────────────────

export function calcAnnualPetrolCost(mpg, annualMiles) {
  const pricePerGallon = CONSTANTS.PETROL_PRICE_PER_LITRE * CONSTANTS.LITRES_PER_GALLON
  return (annualMiles / mpg) * pricePerGallon
}

export function calcAnnualEvCost(milesPerKwh, annualMiles, chargingRate) {
  return (annualMiles / milesPerKwh) * chargingRate
}

export function resolveChargingRate(hasSolar, hasHomeChrg, userElecRate) {
  if (hasSolar) return CONSTANTS.SOLAR_CHARGING_RATE
  if (hasHomeChrg) return userElecRate ?? CONSTANTS.HOME_ELECTRICITY_RATE
  return CONSTANTS.PUBLIC_CHARGING_RATE
}

// ── Road tax ─────────────────────────────────────────────────────────────────

export function calcPetrolVed(co2Gkm) {
  if (co2Gkm <= 100) return CONSTANTS.PETROL_VED_LOW_EMISSIONS
  if (co2Gkm <= 150) return CONSTANTS.PETROL_VED_MID_EMISSIONS
  return CONSTANTS.PETROL_VED_HIGH_EMISSIONS
}

export function calcEvVed(yearOfPurchase = 1) {
  // Year 1 is free, standard rate thereafter (from April 2025)
  return yearOfPurchase === 1 ? CONSTANTS.EV_VED_FIRST_YEAR : CONSTANTS.EV_VED_STANDARD
}

// ── Congestion charge ─────────────────────────────────────────────────────────

function isLondon(location) {
  if (!location) return false
  return location.trim().toLowerCase().includes('london')
}

export function calcAnnualCongestionCharge(userLocation, destinations, commutesDaysPerWeek = 5) {
  const relevant = [userLocation, ...(destinations || [])].filter(Boolean)
  const hasLondon = relevant.some(isLondon)
  if (!hasLondon) return { petrol: 0, ev: 0 }
  // Since Dec 2025 EV discount ended — both pay
  const daysPerYear = commutesDaysPerWeek * 47 // ~47 working weeks
  const annual = daysPerYear * CONSTANTS.CONGESTION_CHARGE_PER_DAY
  return { petrol: annual, ev: annual }
}

// ── Running cost summary ──────────────────────────────────────────────────────

export function calcYearlyRunningCosts({
  petrolCar,
  evCar,
  annualMiles,
  chargingRate,
  userLocation,
  destinations,
}) {
  const petrolFuel = calcAnnualPetrolCost(petrolCar.mpg, annualMiles)
  const evEnergy = calcAnnualEvCost(evCar.milesPerKwh, annualMiles, chargingRate)

  const petrolInsurance = petrolCar.insuranceAnnual
  const evInsurance = evCar.insuranceAnnual

  const petrolMaintenance = CONSTANTS.PETROL_MAINTENANCE_PER_YEAR
  const evMaintenance = CONSTANTS.EV_MAINTENANCE_PER_YEAR

  const petrolVed = calcPetrolVed(petrolCar.co2Gkm)
  const evVed = calcEvVed(2) // standard rate (year 2+)

  const congestion = calcAnnualCongestionCharge(userLocation, destinations)

  const petrolTotal =
    petrolFuel + petrolInsurance + petrolMaintenance + petrolVed + congestion.petrol
  const evTotal =
    evEnergy + evInsurance + evMaintenance + evVed + congestion.ev

  return {
    petrol: {
      fuel: petrolFuel,
      insurance: petrolInsurance,
      maintenance: petrolMaintenance,
      ved: petrolVed,
      congestion: congestion.petrol,
      total: petrolTotal,
    },
    ev: {
      energy: evEnergy,
      insurance: evInsurance,
      maintenance: evMaintenance,
      ved: evVed,
      congestion: congestion.ev,
      total: evTotal,
    },
    annualSaving: petrolTotal - evTotal,
  }
}

// ── Break-even analysis ───────────────────────────────────────────────────────

export function calcBreakEven(petrolPrice, evPrice, annualSaving) {
  const premium = evPrice - petrolPrice
  if (annualSaving <= 0) return { years: null, months: null, never: true }
  const totalYears = premium / annualSaving
  const years = Math.floor(totalYears)
  const months = Math.round((totalYears - years) * 12)
  return { years, months, never: false }
}

export function calcCumulativeCosts(petrolCar, evCar, annualSaving, years = 10) {
  const data = []
  let petrolRunning = petrolCar.purchasePrice
  let evRunning = evCar.purchasePrice

  const petrolAnnual = calcAnnualPetrolCost(petrolCar.mpg, 8000) + petrolCar.insuranceAnnual +
    CONSTANTS.PETROL_MAINTENANCE_PER_YEAR + calcPetrolVed(petrolCar.co2Gkm)
  const evAnnual = petrolAnnual - annualSaving

  for (let y = 0; y <= years; y++) {
    data.push({
      year: y,
      petrol: Math.round(petrolRunning),
      ev: Math.round(evRunning),
    })
    petrolRunning += petrolAnnual
    evRunning += evAnnual
  }
  return data
}

// ── Carbon ───────────────────────────────────────────────────────────────────

export function calcCO2(petrolCar, evCar, annualMiles) {
  const litresUsed = (annualMiles / petrolCar.mpg) * CONSTANTS.LITRES_PER_GALLON
  const petrolCO2 = litresUsed * CONSTANTS.CO2_PER_LITRE_PETROL

  const kwhUsed = annualMiles / evCar.milesPerKwh
  const evCO2 = kwhUsed * CONSTANTS.GRID_CARBON_INTENSITY

  const saving = petrolCO2 - evCO2

  return {
    petrolKgPerYear: Math.round(petrolCO2),
    evKgPerYear: Math.round(evCO2),
    savingKgPerYear: Math.round(saving),
    vegetarianMonths: Math.round((saving / CONSTANTS.VEGETARIAN_CO2_SAVING_PER_YEAR) * 12),
    treesEquivalent: Math.round(saving / CONSTANTS.TREE_CO2_ABSORPTION_PER_YEAR),
  }
}

// ── Journey analysis ──────────────────────────────────────────────────────────

export function calcJourney(origin, destination, evCar) {
  const distance = getDistance(origin, destination)
  const range = evCar.rangeMiles
  const batteryKwh = evCar.batteryKwh
  const milesPerKwh = evCar.milesPerKwh

  if (!distance) return null

  const usableRange = range * (1 - CONSTANTS.MIN_BATTERY_REMAINING)

  if (distance <= usableRange) {
    return {
      origin,
      destination,
      distanceMiles: distance,
      stopsNeeded: 0,
      chargingTime50kw: 0,
      chargingTime150kw: 0,
      withinRange: true,
    }
  }

  // How many stops needed
  const stopsNeeded = Math.ceil((distance - usableRange) / usableRange)

  // kWh to add per stop to ensure 25% buffer on arrival at destination
  const energyPerLeg = usableRange / milesPerKwh // kWh for usable range leg
  const chargeNeeded = energyPerLeg * 0.8 // charge to ~80% (common rapid charge target)

  // Time (hours) = kWh / kW, convert to minutes
  const time50kw = Math.round((chargeNeeded / CONSTANTS.RAPID_CHARGER_50KW) * 60)
  const time150kw = Math.round((chargeNeeded / CONSTANTS.RAPID_CHARGER_150KW) * 60)

  return {
    origin,
    destination,
    distanceMiles: distance,
    stopsNeeded,
    chargingTime50kw: time50kw,
    chargingTime150kw: time150kw,
    withinRange: false,
  }
}
