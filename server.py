import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

TAX_RATES = {
    "USA": {
        "AL": 0.04, "AK": 0.00, "AZ": 0.056, "AR": 0.065, "CA": 0.0725,
        "CO": 0.029, "CT": 0.0635, "DE": 0.00, "FL": 0.06, "GA": 0.04,
        "HI": 0.04, "ID": 0.06, "IL": 0.0625, "IN": 0.07, "IA": 0.06,
        "KS": 0.065, "KY": 0.06, "LA": 0.0445, "ME": 0.055, "MD": 0.06,
        "MA": 0.0625, "MI": 0.06, "MN": 0.06875, "MS": 0.07, "MO": 0.04225,
        "MT": 0.00, "NE": 0.055, "NV": 0.0685, "NH": 0.00, "NJ": 0.06625,
        "NM": 0.05125, "NY": 0.04, "NC": 0.0475, "ND": 0.05, "OH": 0.0575,
        "OK": 0.045, "OR": 0.00, "PA": 0.06, "RI": 0.07, "SC": 0.06,
        "SD": 0.045, "TN": 0.07, "TX": 0.0625, "UT": 0.061, "VT": 0.06,
        "VA": 0.053, "WA": 0.065, "WV": 0.06, "WI": 0.05, "WY": 0.04,
        "DC": 0.06
    },
    "CANADA": {
        "AB": 0.05,    # GST
        "BC": 0.12,    # GST + PST
        "MB": 0.12,    # GST + PST
        "NB": 0.15,    # HST
        "NL": 0.15,    # HST
        "NT": 0.05,    # GST
        "NS": 0.15,    # HST
        "NU": 0.05,    # GST
        "ON": 0.13,    # HST
        "PE": 0.15,    # HST
        "QC": 0.14975, # GST + QST
        "SK": 0.11,    # GST + PST
        "YT": 0.05     # GST
    },
    "INDIA": {
        "ALL": 0.18
    }
}

STATE_NAMES = {
    "USA": {
        "ALABAMA": "AL", "ALASKA": "AK", "ARIZONA": "AZ", "ARKANSAS": "AR",
        "CALIFORNIA": "CA", "COLORADO": "CO", "CONNECTICUT": "CT", "DELAWARE": "DE",
        "FLORIDA": "FL", "GEORGIA": "GA", "HAWAII": "HI", "IDAHO": "ID",
        "ILLINOIS": "IL", "INDIANA": "IN", "IOWA": "IA", "KANSAS": "KS",
        "KENTUCKY": "KY", "LOUISIANA": "LA", "MAINE": "ME", "MARYLAND": "MD",
        "MASSACHUSETTS": "MA", "MICHIGAN": "MI", "MINNESOTA": "MN", "MISSISSIPPI": "MS",
        "MISSOURI": "MO", "MONTANA": "MT", "NEBRASKA": "NE", "NEVADA": "NV",
        "NEW HAMPSHIRE": "NH", "NEW JERSEY": "NJ", "NEW MEXICO": "NM", "NEW YORK": "NY",
        "NORTH CAROLINA": "NC", "NORTH DAKOTA": "ND", "OHIO": "OH", "OKLAHOMA": "OK",
        "OREGON": "OR", "PENNSYLVANIA": "PA", "RHODE ISLAND": "RI", "SOUTH CAROLINA": "SC",
        "SOUTH DAKOTA": "SD", "TENNESSEE": "TN", "TEXAS": "TX", "UTAH": "UT",
        "VERMONT": "VT", "VIRGINIA": "VA", "WASHINGTON": "WA", "WEST VIRGINIA": "WV",
        "WISCONSIN": "WI", "WYOMING": "WY", "WASHINGTON DC": "DC", "DISTRICT OF COLUMBIA": "DC"
    },
    "CANADA": {
        "ALBERTA": "AB", "BRITISH COLUMBIA": "BC", "MANITOBA": "MB",
        "NEW BRUNSWICK": "NB", "NEWFOUNDLAND AND LABRADOR": "NL", "NORTHWEST TERRITORIES": "NT",
        "NOVA SCOTIA": "NS", "NUNAVUT": "NU", "ONTARIO": "ON", "PRINCE EDWARD ISLAND": "PE",
        "QUEBEC": "QC", "SASKATCHEWAN": "SK", "YUKON": "YT"
    }
}

def calculate_tax(country, amount, state=None):
    country = country.upper()
    if country not in TAX_RATES:
        raise ValueError(f"Country '{country}' is not supported.")
    
    if country == "INDIA":
        rate = TAX_RATES["INDIA"]["ALL"]
    else:
        if not state:
            raise ValueError(f"State/Province is required for {country}.")
        state = state.upper()
        if state in STATE_NAMES.get(country, {}):
            state = STATE_NAMES[country][state]
        if state not in TAX_RATES[country]:
            raise ValueError(f"State/Province '{state}' is not valid for {country}.")
        rate = TAX_RATES[country][state]

    tax_amount = amount * rate
    total_amount = amount + tax_amount

    return {
        "country": country,
        "state": state,
        "amount": amount,
        "tax_rate": rate,
        "tax_amount": tax_amount,
        "total_amount": total_amount
    }

class TaxAPIHandler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/calculate-tax':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                country = data.get('country')
                amount = float(data.get('amount', 0))
                state = data.get('state')
                result = calculate_tax(country, amount, state)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "data": result}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "service": "ACA Python Tax API"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, TaxAPIHandler)
    print("ACA Python Tax REST API Server running on port 8000...")
    httpd.serve_forever()
