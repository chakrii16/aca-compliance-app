import type { Config } from '@netlify/functions'

const TAX_RATES: Record<string, Record<string, number>> = {
  USA: {
    AL: 0.04, AK: 0.0, AZ: 0.056, AR: 0.065, CA: 0.0725,
    CO: 0.029, CT: 0.0635, DE: 0.0, FL: 0.06, GA: 0.04,
    HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07, IA: 0.06,
    KS: 0.065, KY: 0.06, LA: 0.0445, ME: 0.055, MD: 0.06,
    MA: 0.0625, MI: 0.06, MN: 0.06875, MS: 0.07, MO: 0.04225,
    MT: 0.0, NE: 0.055, NV: 0.0685, NH: 0.0, NJ: 0.06625,
    NM: 0.05125, NY: 0.04, NC: 0.0475, ND: 0.05, OH: 0.0575,
    OK: 0.045, OR: 0.0, PA: 0.06, RI: 0.07, SC: 0.06,
    SD: 0.045, TN: 0.07, TX: 0.0625, UT: 0.061, VT: 0.06,
    VA: 0.053, WA: 0.065, WV: 0.06, WI: 0.05, WY: 0.04,
    DC: 0.06,
  },
  CANADA: {
    AB: 0.05, BC: 0.12, MB: 0.12, NB: 0.15, NL: 0.15,
    NT: 0.05, NS: 0.15, NU: 0.05, ON: 0.13, PE: 0.15,
    QC: 0.14975, SK: 0.11, YT: 0.05,
  },
  INDIA: {
    ALL: 0.18,
  },
}

const STATE_NAMES: Record<string, Record<string, string>> = {
  USA: {
    ALABAMA: 'AL', ALASKA: 'AK', ARIZONA: 'AZ', ARKANSAS: 'AR',
    CALIFORNIA: 'CA', COLORADO: 'CO', CONNECTICUT: 'CT', DELAWARE: 'DE',
    FLORIDA: 'FL', GEORGIA: 'GA', HAWAII: 'HI', IDAHO: 'ID',
    ILLINOIS: 'IL', INDIANA: 'IN', IOWA: 'IA', KANSAS: 'KS',
    KENTUCKY: 'KY', LOUISIANA: 'LA', MAINE: 'ME', MARYLAND: 'MD',
    MASSACHUSETTS: 'MA', MICHIGAN: 'MI', MINNESOTA: 'MN', MISSISSIPPI: 'MS',
    MISSOURI: 'MO', MONTANA: 'MT', NEBRASKA: 'NE', NEVADA: 'NV',
    'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ', 'NEW MEXICO': 'NM', 'NEW YORK': 'NY',
    'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', OHIO: 'OH', OKLAHOMA: 'OK',
    OREGON: 'OR', PENNSYLVANIA: 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
    'SOUTH DAKOTA': 'SD', TENNESSEE: 'TN', TEXAS: 'TX', UTAH: 'UT',
    VERMONT: 'VT', VIRGINIA: 'VA', WASHINGTON: 'WA', 'WEST VIRGINIA': 'WV',
    WISCONSIN: 'WI', WYOMING: 'WY', 'WASHINGTON DC': 'DC', 'DISTRICT OF COLUMBIA': 'DC',
  },
  CANADA: {
    ALBERTA: 'AB', 'BRITISH COLUMBIA': 'BC', MANITOBA: 'MB',
    'NEW BRUNSWICK': 'NB', 'NEWFOUNDLAND AND LABRADOR': 'NL', 'NORTHWEST TERRITORIES': 'NT',
    'NOVA SCOTIA': 'NS', NUNAVUT: 'NU', ONTARIO: 'ON', 'PRINCE EDWARD ISLAND': 'PE',
    QUEBEC: 'QC', SASKATCHEWAN: 'SK', YUKON: 'YT',
  },
}

function calculateTax(countryInput: string, amount: number, stateInput: string | null, isInclusive: boolean) {
  const country = countryInput.toUpperCase()
  if (!TAX_RATES[country]) {
    throw new Error(`Country '${countryInput}' is not supported.`)
  }

  let state: string | null = null
  let rate: number

  if (country === 'INDIA') {
    rate = amount >= 500000 ? TAX_RATES.INDIA.ALL : 0.0
  } else {
    if (!stateInput) {
      throw new Error(`State/Province is required for ${country}.`)
    }
    state = stateInput.toUpperCase()
    const stateNames = STATE_NAMES[country] || {}
    if (stateNames[state]) {
      state = stateNames[state]
    }
    if (!(state in TAX_RATES[country])) {
      throw new Error(`State/Province '${stateInput}' is not valid for ${country}.`)
    }
    rate = TAX_RATES[country][state]
  }

  const baseAmount = amount
  const taxAmount = amount * rate
  const totalAmount = isInclusive ? baseAmount - taxAmount : baseAmount + taxAmount

  return {
    country,
    state,
    amount: baseAmount,
    tax_rate: rate,
    tax_amount: taxAmount,
    total_amount: totalAmount,
    is_inclusive: isInclusive,
  }
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ status: 'error', message: 'Method not allowed' }, { status: 405 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body.country !== 'string') {
    return Response.json({ status: 'error', message: 'country is required.' }, { status: 400 })
  }

  try {
    const amount = parseFloat(body.amount) || 0
    const state = typeof body.state === 'string' ? body.state : null
    const isInclusive = Boolean(body.is_inclusive)
    const result = calculateTax(body.country, amount, state, isInclusive)
    return Response.json({ status: 'success', data: result })
  } catch (err) {
    return Response.json({ status: 'error', message: err instanceof Error ? err.message : String(err) }, { status: 400 })
  }
}

export const config: Config = {
  path: '/api/calculate-tax',
  method: 'POST',
}
