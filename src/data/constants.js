export const CONSTANTS = {
  // Fuel
  PETROL_PRICE_PER_LITRE: 1.45,
  LITRES_PER_GALLON: 4.546,

  // Electricity
  HOME_ELECTRICITY_RATE: 0.28,       // £/kWh
  PUBLIC_CHARGING_RATE: 0.65,        // £/kWh
  SOLAR_CHARGING_RATE: 0.00,         // £/kWh (free)

  // Carbon
  CO2_PER_LITRE_PETROL: 2.31,        // kg
  GRID_CARBON_INTENSITY: 0.18,       // kg CO₂/kWh

  // Equivalents
  VEGETARIAN_CO2_SAVING_PER_YEAR: 600, // kg/year
  TREE_CO2_ABSORPTION_PER_YEAR: 22,    // kg/year

  // Maintenance
  PETROL_MAINTENANCE_PER_YEAR: 800,   // £
  EV_MAINTENANCE_PER_YEAR: 400,       // £

  // Road tax (VED) 2025+
  EV_VED_FIRST_YEAR: 0,
  EV_VED_STANDARD: 190,              // £/year (standard rate from April 2025)
  PETROL_VED_LOW_EMISSIONS: 190,     // £/year for <100g/km CO₂
  PETROL_VED_MID_EMISSIONS: 220,     // £/year for 101-150g/km CO₂
  PETROL_VED_HIGH_EMISSIONS: 330,    // £/year for >150g/km CO₂

  // Congestion charge (London)
  CONGESTION_CHARGE_PER_DAY: 15,     // £ per day (EV discount ended Dec 2025)
  WORKING_DAYS_PER_YEAR: 235,

  // Charging
  RAPID_CHARGER_50KW: 50,            // kW
  RAPID_CHARGER_150KW: 150,          // kW
  MIN_BATTERY_REMAINING: 0.25,       // 25% buffer target on arrival

  // Battery degradation
  BATTERY_CAPACITY_5YR: 0.90,
  BATTERY_CAPACITY_10YR: 0.80,

  // Analysis period
  ANALYSIS_YEARS: 10,
}
