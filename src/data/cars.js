// Car database — petrol models and their EV equivalents

export const PETROL_CARS = [
  // ── FORD ──────────────────────────────────────────────────────
  { id: 'ford-fiesta',       make: 'Ford',         model: 'Fiesta',               mpg: 48, co2Gkm: 115, purchasePrice: 22000, insuranceAnnual: 850,  evEquivalentId: 'peugeot-e208' },
  { id: 'ford-focus',        make: 'Ford',         model: 'Focus',                mpg: 45, co2Gkm: 130, purchasePrice: 25000, insuranceAnnual: 900,  evEquivalentId: 'mg4' },
  { id: 'ford-puma',         make: 'Ford',         model: 'Puma',                 mpg: 44, co2Gkm: 132, purchasePrice: 26500, insuranceAnnual: 890,  evEquivalentId: 'mg4' },
  { id: 'ford-kuga',         make: 'Ford',         model: 'Kuga',                 mpg: 38, co2Gkm: 168, purchasePrice: 33000, insuranceAnnual: 1050, evEquivalentId: 'kia-ev6' },
  { id: 'ford-mondeo',       make: 'Ford',         model: 'Mondeo',               mpg: 45, co2Gkm: 165, purchasePrice: 28000, insuranceAnnual: 950,  evEquivalentId: 'tesla-model3' },
  { id: 'ford-galaxy',       make: 'Ford',         model: 'Galaxy',               mpg: 38, co2Gkm: 170, purchasePrice: 38000, insuranceAnnual: 1100, evEquivalentId: 'hyundai-ioniq5' },
  // ── VOLKSWAGEN ────────────────────────────────────────────────
  { id: 'vw-polo',           make: 'Volkswagen',   model: 'Polo',                 mpg: 52, co2Gkm: 108, purchasePrice: 22500, insuranceAnnual: 800,  evEquivalentId: 'byd-dolphin' },
  { id: 'vw-golf',           make: 'Volkswagen',   model: 'Golf',                 mpg: 50, co2Gkm: 120, purchasePrice: 30000, insuranceAnnual: 950,  evEquivalentId: 'vw-id3' },
  { id: 'vw-golf-gti',       make: 'Volkswagen',   model: 'Golf GTI',             mpg: 38, co2Gkm: 168, purchasePrice: 37000, insuranceAnnual: 1250, evEquivalentId: 'tesla-model3' },
  { id: 'vw-tiguan',         make: 'Volkswagen',   model: 'Tiguan',               mpg: 40, co2Gkm: 148, purchasePrice: 35000, insuranceAnnual: 1100, evEquivalentId: 'vw-id4' },
  { id: 'vw-passat',         make: 'Volkswagen',   model: 'Passat',               mpg: 47, co2Gkm: 135, purchasePrice: 33000, insuranceAnnual: 1000, evEquivalentId: 'tesla-model3' },
  { id: 'vw-t-roc',          make: 'Volkswagen',   model: 'T-Roc',                mpg: 42, co2Gkm: 140, purchasePrice: 28000, insuranceAnnual: 950,  evEquivalentId: 'mg4' },
  // ── TOYOTA ────────────────────────────────────────────────────
  { id: 'toyota-aygo-x',     make: 'Toyota',       model: 'Aygo X',               mpg: 53, co2Gkm: 106, purchasePrice: 18500, insuranceAnnual: 750,  evEquivalentId: 'peugeot-e208' },
  { id: 'toyota-yaris',      make: 'Toyota',       model: 'Yaris',                mpg: 68, co2Gkm: 92,  purchasePrice: 23000, insuranceAnnual: 800,  evEquivalentId: 'peugeot-e208' },
  { id: 'toyota-corolla',    make: 'Toyota',       model: 'Corolla',              mpg: 58, co2Gkm: 105, purchasePrice: 28000, insuranceAnnual: 880,  evEquivalentId: 'mg4' },
  { id: 'toyota-chr',        make: 'Toyota',       model: 'C-HR',                 mpg: 52, co2Gkm: 120, purchasePrice: 30000, insuranceAnnual: 950,  evEquivalentId: 'mg4' },
  { id: 'toyota-rav4',       make: 'Toyota',       model: 'RAV4',                 mpg: 47, co2Gkm: 143, purchasePrice: 38000, insuranceAnnual: 1100, evEquivalentId: 'hyundai-ioniq5' },
  { id: 'toyota-camry',      make: 'Toyota',       model: 'Camry',                mpg: 55, co2Gkm: 120, purchasePrice: 34000, insuranceAnnual: 1000, evEquivalentId: 'tesla-model3' },
  // ── BMW ───────────────────────────────────────────────────────
  { id: 'bmw-1series',       make: 'BMW',          model: '1 Series',             mpg: 47, co2Gkm: 128, purchasePrice: 32000, insuranceAnnual: 1100, evEquivalentId: 'cupra-born' },
  { id: 'bmw-3series',       make: 'BMW',          model: '3 Series',             mpg: 42, co2Gkm: 145, purchasePrice: 38000, insuranceAnnual: 1200, evEquivalentId: 'bmw-i4' },
  { id: 'bmw-5series',       make: 'BMW',          model: '5 Series',             mpg: 38, co2Gkm: 165, purchasePrice: 52000, insuranceAnnual: 1450, evEquivalentId: 'bmw-i4' },
  { id: 'bmw-x1',            make: 'BMW',          model: 'X1',                   mpg: 40, co2Gkm: 155, purchasePrice: 38000, insuranceAnnual: 1200, evEquivalentId: 'bmw-ix1' },
  { id: 'bmw-x3',            make: 'BMW',          model: 'X3',                   mpg: 36, co2Gkm: 173, purchasePrice: 48000, insuranceAnnual: 1400, evEquivalentId: 'bmw-ix1' },
  { id: 'bmw-x5',            make: 'BMW',          model: 'X5',                   mpg: 30, co2Gkm: 215, purchasePrice: 65000, insuranceAnnual: 1800, evEquivalentId: 'mercedes-eqa' },
  // ── MERCEDES-BENZ ─────────────────────────────────────────────
  { id: 'mercedes-aclass',   make: 'Mercedes-Benz',model: 'A-Class',              mpg: 44, co2Gkm: 128, purchasePrice: 32000, insuranceAnnual: 1050, evEquivalentId: 'cupra-born' },
  { id: 'mercedes-cclass',   make: 'Mercedes-Benz',model: 'C-Class',              mpg: 40, co2Gkm: 155, purchasePrice: 42000, insuranceAnnual: 1300, evEquivalentId: 'mercedes-eqa' },
  { id: 'mercedes-eclass',   make: 'Mercedes-Benz',model: 'E-Class',              mpg: 38, co2Gkm: 168, purchasePrice: 53000, insuranceAnnual: 1500, evEquivalentId: 'bmw-i4' },
  { id: 'mercedes-glc',      make: 'Mercedes-Benz',model: 'GLC',                  mpg: 35, co2Gkm: 178, purchasePrice: 50000, insuranceAnnual: 1450, evEquivalentId: 'mercedes-eqa' },
  { id: 'mercedes-gle',      make: 'Mercedes-Benz',model: 'GLE',                  mpg: 30, co2Gkm: 208, purchasePrice: 68000, insuranceAnnual: 1900, evEquivalentId: 'mercedes-eqa' },
  // ── AUDI ──────────────────────────────────────────────────────
  { id: 'audi-a1',           make: 'Audi',         model: 'A1',                   mpg: 48, co2Gkm: 120, purchasePrice: 24000, insuranceAnnual: 880,  evEquivalentId: 'peugeot-e208' },
  { id: 'audi-a3',           make: 'Audi',         model: 'A3',                   mpg: 47, co2Gkm: 125, purchasePrice: 32000, insuranceAnnual: 1050, evEquivalentId: 'cupra-born' },
  { id: 'audi-a4',           make: 'Audi',         model: 'A4',                   mpg: 43, co2Gkm: 148, purchasePrice: 40000, insuranceAnnual: 1200, evEquivalentId: 'tesla-model3' },
  { id: 'audi-q3',           make: 'Audi',         model: 'Q3',                   mpg: 40, co2Gkm: 158, purchasePrice: 36000, insuranceAnnual: 1150, evEquivalentId: 'bmw-ix1' },
  { id: 'audi-q5',           make: 'Audi',         model: 'Q5',                   mpg: 36, co2Gkm: 175, purchasePrice: 50000, insuranceAnnual: 1400, evEquivalentId: 'hyundai-ioniq5' },
  { id: 'audi-q7',           make: 'Audi',         model: 'Q7',                   mpg: 30, co2Gkm: 210, purchasePrice: 68000, insuranceAnnual: 1900, evEquivalentId: 'mercedes-eqa' },
  // ── VAUXHALL ──────────────────────────────────────────────────
  { id: 'vauxhall-corsa',    make: 'Vauxhall',     model: 'Corsa',                mpg: 50, co2Gkm: 117, purchasePrice: 20000, insuranceAnnual: 820,  evEquivalentId: 'vauxhall-corsa-e' },
  { id: 'vauxhall-astra',    make: 'Vauxhall',     model: 'Astra',                mpg: 47, co2Gkm: 128, purchasePrice: 25000, insuranceAnnual: 900,  evEquivalentId: 'vw-id3' },
  { id: 'vauxhall-mokka',    make: 'Vauxhall',     model: 'Mokka',                mpg: 44, co2Gkm: 138, purchasePrice: 26000, insuranceAnnual: 920,  evEquivalentId: 'vauxhall-corsa-e' },
  { id: 'vauxhall-grandland', make: 'Vauxhall',    model: 'Grandland',            mpg: 40, co2Gkm: 158, purchasePrice: 30000, insuranceAnnual: 1000, evEquivalentId: 'kia-ev6' },
  // ── NISSAN ────────────────────────────────────────────────────
  { id: 'nissan-micra',      make: 'Nissan',       model: 'Micra',                mpg: 52, co2Gkm: 112, purchasePrice: 17000, insuranceAnnual: 780,  evEquivalentId: 'peugeot-e208' },
  { id: 'nissan-juke',       make: 'Nissan',       model: 'Juke',                 mpg: 42, co2Gkm: 142, purchasePrice: 25000, insuranceAnnual: 900,  evEquivalentId: 'mg4' },
  { id: 'nissan-qashqai',    make: 'Nissan',       model: 'Qashqai',              mpg: 40, co2Gkm: 148, purchasePrice: 30000, insuranceAnnual: 970,  evEquivalentId: 'nissan-ariya' },
  { id: 'nissan-xtrail',     make: 'Nissan',       model: 'X-Trail',              mpg: 36, co2Gkm: 170, purchasePrice: 36000, insuranceAnnual: 1100, evEquivalentId: 'nissan-ariya' },
  // ── HONDA ─────────────────────────────────────────────────────
  { id: 'honda-jazz',        make: 'Honda',        model: 'Jazz',                 mpg: 58, co2Gkm: 105, purchasePrice: 23500, insuranceAnnual: 840,  evEquivalentId: 'peugeot-e208' },
  { id: 'honda-civic',       make: 'Honda',        model: 'Civic',                mpg: 47, co2Gkm: 125, purchasePrice: 28000, insuranceAnnual: 900,  evEquivalentId: 'mg4' },
  { id: 'honda-hrv',         make: 'Honda',        model: 'HR-V',                 mpg: 50, co2Gkm: 118, purchasePrice: 30000, insuranceAnnual: 960,  evEquivalentId: 'mg4' },
  { id: 'honda-crv',         make: 'Honda',        model: 'CR-V',                 mpg: 40, co2Gkm: 155, purchasePrice: 38000, insuranceAnnual: 1100, evEquivalentId: 'hyundai-ioniq5' },
  // ── HYUNDAI ───────────────────────────────────────────────────
  { id: 'hyundai-i10',       make: 'Hyundai',      model: 'i10',                  mpg: 53, co2Gkm: 109, purchasePrice: 16000, insuranceAnnual: 750,  evEquivalentId: 'peugeot-e208' },
  { id: 'hyundai-i20',       make: 'Hyundai',      model: 'i20',                  mpg: 50, co2Gkm: 118, purchasePrice: 20500, insuranceAnnual: 820,  evEquivalentId: 'byd-dolphin' },
  { id: 'hyundai-i30',       make: 'Hyundai',      model: 'i30',                  mpg: 47, co2Gkm: 128, purchasePrice: 24000, insuranceAnnual: 880,  evEquivalentId: 'mg4' },
  { id: 'hyundai-kona',      make: 'Hyundai',      model: 'Kona',                 mpg: 44, co2Gkm: 138, purchasePrice: 26000, insuranceAnnual: 920,  evEquivalentId: 'mg4' },
  { id: 'hyundai-tucson',    make: 'Hyundai',      model: 'Tucson',               mpg: 41, co2Gkm: 146, purchasePrice: 29500, insuranceAnnual: 955,  evEquivalentId: 'hyundai-ioniq5' },
  { id: 'hyundai-santafe',   make: 'Hyundai',      model: 'Santa Fe',             mpg: 35, co2Gkm: 175, purchasePrice: 45000, insuranceAnnual: 1300, evEquivalentId: 'hyundai-ioniq5' },
  // ── KIA ───────────────────────────────────────────────────────
  { id: 'kia-picanto',       make: 'Kia',          model: 'Picanto',              mpg: 55, co2Gkm: 108, purchasePrice: 16000, insuranceAnnual: 750,  evEquivalentId: 'peugeot-e208' },
  { id: 'kia-rio',           make: 'Kia',          model: 'Rio',                  mpg: 52, co2Gkm: 114, purchasePrice: 19000, insuranceAnnual: 800,  evEquivalentId: 'byd-dolphin' },
  { id: 'kia-ceed',          make: 'Kia',          model: "Cee'd",               mpg: 47, co2Gkm: 128, purchasePrice: 24000, insuranceAnnual: 880,  evEquivalentId: 'mg4' },
  { id: 'kia-sportage',      make: 'Kia',          model: 'Sportage',             mpg: 42, co2Gkm: 143, purchasePrice: 30500, insuranceAnnual: 960,  evEquivalentId: 'kia-ev6' },
  { id: 'kia-sorento',       make: 'Kia',          model: 'Sorento',              mpg: 35, co2Gkm: 178, purchasePrice: 46000, insuranceAnnual: 1300, evEquivalentId: 'kia-ev6' },
  // ── RENAULT ───────────────────────────────────────────────────
  { id: 'renault-clio',      make: 'Renault',      model: 'Clio',                 mpg: 50, co2Gkm: 116, purchasePrice: 20000, insuranceAnnual: 815,  evEquivalentId: 'peugeot-e208' },
  { id: 'renault-megane',    make: 'Renault',      model: 'Megane',               mpg: 46, co2Gkm: 130, purchasePrice: 24000, insuranceAnnual: 880,  evEquivalentId: 'vw-id3' },
  { id: 'renault-captur',    make: 'Renault',      model: 'Captur',               mpg: 44, co2Gkm: 132, purchasePrice: 24500, insuranceAnnual: 890,  evEquivalentId: 'mg4' },
  { id: 'renault-kadjar',    make: 'Renault',      model: 'Kadjar',               mpg: 40, co2Gkm: 155, purchasePrice: 26000, insuranceAnnual: 940,  evEquivalentId: 'kia-ev6' },
  // ── PEUGEOT ───────────────────────────────────────────────────
  { id: 'peugeot-208',       make: 'Peugeot',      model: '208',                  mpg: 52, co2Gkm: 112, purchasePrice: 21500, insuranceAnnual: 810,  evEquivalentId: 'peugeot-e208' },
  { id: 'peugeot-308',       make: 'Peugeot',      model: '308',                  mpg: 48, co2Gkm: 125, purchasePrice: 27000, insuranceAnnual: 900,  evEquivalentId: 'vw-id3' },
  { id: 'peugeot-2008',      make: 'Peugeot',      model: '2008',                 mpg: 46, co2Gkm: 130, purchasePrice: 25000, insuranceAnnual: 880,  evEquivalentId: 'mg4' },
  { id: 'peugeot-3008',      make: 'Peugeot',      model: '3008',                 mpg: 40, co2Gkm: 155, purchasePrice: 34000, insuranceAnnual: 1050, evEquivalentId: 'kia-ev6' },
  // ── CITROEN ───────────────────────────────────────────────────
  { id: 'citroen-c3',        make: 'Citroën',      model: 'C3',                   mpg: 51, co2Gkm: 114, purchasePrice: 19500, insuranceAnnual: 800,  evEquivalentId: 'peugeot-e208' },
  { id: 'citroen-c4',        make: 'Citroën',      model: 'C4',                   mpg: 47, co2Gkm: 128, purchasePrice: 25000, insuranceAnnual: 880,  evEquivalentId: 'vw-id3' },
  { id: 'citroen-c5aircross',make: 'Citroën',      model: 'C5 Aircross',          mpg: 38, co2Gkm: 162, purchasePrice: 30000, insuranceAnnual: 980,  evEquivalentId: 'kia-ev6' },
  // ── SEAT / CUPRA ──────────────────────────────────────────────
  { id: 'seat-ibiza',        make: 'SEAT',         model: 'Ibiza',                mpg: 51, co2Gkm: 110, purchasePrice: 20500, insuranceAnnual: 800,  evEquivalentId: 'byd-dolphin' },
  { id: 'seat-leon',         make: 'SEAT',         model: 'Leon',                 mpg: 47, co2Gkm: 125, purchasePrice: 25000, insuranceAnnual: 880,  evEquivalentId: 'cupra-born' },
  { id: 'seat-arona',        make: 'SEAT',         model: 'Arona',                mpg: 44, co2Gkm: 135, purchasePrice: 23000, insuranceAnnual: 860,  evEquivalentId: 'mg4' },
  { id: 'seat-ateca',        make: 'SEAT',         model: 'Ateca',                mpg: 40, co2Gkm: 152, purchasePrice: 28000, insuranceAnnual: 960,  evEquivalentId: 'kia-ev6' },
  // ── SKODA ─────────────────────────────────────────────────────
  { id: 'skoda-fabia',       make: 'Skoda',        model: 'Fabia',                mpg: 52, co2Gkm: 110, purchasePrice: 20000, insuranceAnnual: 800,  evEquivalentId: 'byd-dolphin' },
  { id: 'skoda-octavia',     make: 'Skoda',        model: 'Octavia',              mpg: 48, co2Gkm: 120, purchasePrice: 27000, insuranceAnnual: 870,  evEquivalentId: 'vw-id3' },
  { id: 'skoda-superb',      make: 'Skoda',        model: 'Superb',               mpg: 45, co2Gkm: 135, purchasePrice: 34000, insuranceAnnual: 1000, evEquivalentId: 'tesla-model3' },
  { id: 'skoda-kamiq',       make: 'Skoda',        model: 'Kamiq',                mpg: 44, co2Gkm: 136, purchasePrice: 24000, insuranceAnnual: 880,  evEquivalentId: 'mg4' },
  { id: 'skoda-karoq',       make: 'Skoda',        model: 'Karoq',                mpg: 40, co2Gkm: 152, purchasePrice: 28000, insuranceAnnual: 960,  evEquivalentId: 'kia-ev6' },
  { id: 'skoda-kodiaq',      make: 'Skoda',        model: 'Kodiaq',               mpg: 36, co2Gkm: 172, purchasePrice: 38000, insuranceAnnual: 1150, evEquivalentId: 'hyundai-ioniq5' },
  // ── MAZDA ─────────────────────────────────────────────────────
  { id: 'mazda-2',           make: 'Mazda',        model: 'Mazda2',               mpg: 54, co2Gkm: 108, purchasePrice: 19500, insuranceAnnual: 800,  evEquivalentId: 'peugeot-e208' },
  { id: 'mazda-3',           make: 'Mazda',        model: 'Mazda3',               mpg: 48, co2Gkm: 122, purchasePrice: 26000, insuranceAnnual: 890,  evEquivalentId: 'mg4' },
  { id: 'mazda-cx30',        make: 'Mazda',        model: 'CX-30',                mpg: 44, co2Gkm: 136, purchasePrice: 28000, insuranceAnnual: 930,  evEquivalentId: 'mg4' },
  { id: 'mazda-cx5',         make: 'Mazda',        model: 'CX-5',                 mpg: 38, co2Gkm: 165, purchasePrice: 33000, insuranceAnnual: 1050, evEquivalentId: 'kia-ev6' },
  // ── MINI ──────────────────────────────────────────────────────
  { id: 'mini-cooper',       make: 'MINI',         model: 'Cooper',               mpg: 44, co2Gkm: 134, purchasePrice: 26000, insuranceAnnual: 920,  evEquivalentId: 'mini-electric' },
  { id: 'mini-clubman',      make: 'MINI',         model: 'Clubman',              mpg: 42, co2Gkm: 142, purchasePrice: 30000, insuranceAnnual: 980,  evEquivalentId: 'cupra-born' },
  { id: 'mini-countryman',   make: 'MINI',         model: 'Countryman',           mpg: 38, co2Gkm: 162, purchasePrice: 34000, insuranceAnnual: 1050, evEquivalentId: 'bmw-ix1' },
  // ── FIAT ──────────────────────────────────────────────────────
  { id: 'fiat-panda',        make: 'Fiat',         model: 'Panda',                mpg: 52, co2Gkm: 112, purchasePrice: 16000, insuranceAnnual: 760,  evEquivalentId: 'peugeot-e208' },
  { id: 'fiat-500',          make: 'Fiat',         model: '500',                  mpg: 49, co2Gkm: 120, purchasePrice: 19000, insuranceAnnual: 810,  evEquivalentId: 'mini-electric' },
  { id: 'fiat-500x',         make: 'Fiat',         model: '500X',                 mpg: 40, co2Gkm: 152, purchasePrice: 26000, insuranceAnnual: 920,  evEquivalentId: 'mg4' },
  { id: 'fiat-tipo',         make: 'Fiat',         model: 'Tipo',                 mpg: 46, co2Gkm: 130, purchasePrice: 20000, insuranceAnnual: 820,  evEquivalentId: 'vw-id3' },
  // ── LAND ROVER ────────────────────────────────────────────────
  { id: 'lr-evoque',         make: 'Land Rover',   model: 'Range Rover Evoque',   mpg: 35, co2Gkm: 175, purchasePrice: 45000, insuranceAnnual: 1500, evEquivalentId: 'bmw-ix1' },
  { id: 'lr-disco-sport',    make: 'Land Rover',   model: 'Discovery Sport',      mpg: 32, co2Gkm: 192, purchasePrice: 42000, insuranceAnnual: 1400, evEquivalentId: 'hyundai-ioniq5' },
  { id: 'lr-defender',       make: 'Land Rover',   model: 'Defender',             mpg: 28, co2Gkm: 225, purchasePrice: 55000, insuranceAnnual: 1700, evEquivalentId: 'mercedes-eqa' },
  { id: 'lr-rr-sport',       make: 'Land Rover',   model: 'Range Rover Sport',    mpg: 24, co2Gkm: 245, purchasePrice: 80000, insuranceAnnual: 2200, evEquivalentId: 'mercedes-eqa' },
  // ── JAGUAR ────────────────────────────────────────────────────
  { id: 'jaguar-xe',         make: 'Jaguar',       model: 'XE',                   mpg: 42, co2Gkm: 148, purchasePrice: 38000, insuranceAnnual: 1250, evEquivalentId: 'tesla-model3' },
  { id: 'jaguar-xf',         make: 'Jaguar',       model: 'XF',                   mpg: 38, co2Gkm: 168, purchasePrice: 48000, insuranceAnnual: 1450, evEquivalentId: 'bmw-i4' },
  { id: 'jaguar-fpace',      make: 'Jaguar',       model: 'F-Pace',               mpg: 33, co2Gkm: 192, purchasePrice: 55000, insuranceAnnual: 1700, evEquivalentId: 'bmw-ix1' },
  // ── VOLVO ─────────────────────────────────────────────────────
  { id: 'volvo-xc40',        make: 'Volvo',        model: 'XC40',                 mpg: 38, co2Gkm: 162, purchasePrice: 38000, insuranceAnnual: 1150, evEquivalentId: 'bmw-ix1' },
  { id: 'volvo-xc60',        make: 'Volvo',        model: 'XC60',                 mpg: 35, co2Gkm: 178, purchasePrice: 50000, insuranceAnnual: 1400, evEquivalentId: 'hyundai-ioniq5' },
  { id: 'volvo-xc90',        make: 'Volvo',        model: 'XC90',                 mpg: 30, co2Gkm: 212, purchasePrice: 68000, insuranceAnnual: 1900, evEquivalentId: 'mercedes-eqa' },
  { id: 'volvo-s60',         make: 'Volvo',        model: 'S60',                  mpg: 40, co2Gkm: 158, purchasePrice: 42000, insuranceAnnual: 1200, evEquivalentId: 'tesla-model3' },
  // ── DACIA ─────────────────────────────────────────────────────
  { id: 'dacia-sandero',     make: 'Dacia',        model: 'Sandero',              mpg: 52, co2Gkm: 112, purchasePrice: 13500, insuranceAnnual: 720,  evEquivalentId: 'peugeot-e208' },
  { id: 'dacia-duster',      make: 'Dacia',        model: 'Duster',               mpg: 42, co2Gkm: 148, purchasePrice: 19500, insuranceAnnual: 830,  evEquivalentId: 'mg4' },
  { id: 'dacia-jogger',      make: 'Dacia',        model: 'Jogger',               mpg: 46, co2Gkm: 132, purchasePrice: 17000, insuranceAnnual: 780,  evEquivalentId: 'mg4' },
  // ── SUZUKI ────────────────────────────────────────────────────
  { id: 'suzuki-swift',      make: 'Suzuki',       model: 'Swift',                mpg: 55, co2Gkm: 105, purchasePrice: 18500, insuranceAnnual: 780,  evEquivalentId: 'peugeot-e208' },
  { id: 'suzuki-vitara',     make: 'Suzuki',       model: 'Vitara',               mpg: 44, co2Gkm: 138, purchasePrice: 24000, insuranceAnnual: 880,  evEquivalentId: 'mg4' },
  { id: 'suzuki-scross',     make: 'Suzuki',       model: 'S-Cross',              mpg: 40, co2Gkm: 155, purchasePrice: 26000, insuranceAnnual: 920,  evEquivalentId: 'mg4' },
  // ── ALFA ROMEO ────────────────────────────────────────────────
  { id: 'alfa-giulia',       make: 'Alfa Romeo',   model: 'Giulia',               mpg: 38, co2Gkm: 168, purchasePrice: 45000, insuranceAnnual: 1400, evEquivalentId: 'bmw-i4' },
  { id: 'alfa-stelvio',      make: 'Alfa Romeo',   model: 'Stelvio',              mpg: 34, co2Gkm: 185, purchasePrice: 52000, insuranceAnnual: 1600, evEquivalentId: 'bmw-ix1' },
  { id: 'alfa-tonale',       make: 'Alfa Romeo',   model: 'Tonale',               mpg: 42, co2Gkm: 148, purchasePrice: 38000, insuranceAnnual: 1200, evEquivalentId: 'kia-ev6' },
  // ── SUBARU ────────────────────────────────────────────────────
  { id: 'subaru-outback',    make: 'Subaru',       model: 'Outback',              mpg: 34, co2Gkm: 182, purchasePrice: 36000, insuranceAnnual: 1100, evEquivalentId: 'hyundai-ioniq5' },
  { id: 'subaru-forester',   make: 'Subaru',       model: 'Forester',             mpg: 32, co2Gkm: 195, purchasePrice: 38000, insuranceAnnual: 1150, evEquivalentId: 'hyundai-ioniq5' },
  // ── LEXUS ─────────────────────────────────────────────────────
  { id: 'lexus-ux',          make: 'Lexus',        model: 'UX',                   mpg: 55, co2Gkm: 110, purchasePrice: 35000, insuranceAnnual: 1050, evEquivalentId: 'bmw-ix1' },
  { id: 'lexus-nx',          make: 'Lexus',        model: 'NX',                   mpg: 50, co2Gkm: 128, purchasePrice: 44000, insuranceAnnual: 1250, evEquivalentId: 'hyundai-ioniq5' },
  { id: 'lexus-rx',          make: 'Lexus',        model: 'RX',                   mpg: 42, co2Gkm: 155, purchasePrice: 58000, insuranceAnnual: 1600, evEquivalentId: 'mercedes-eqa' },
  // ── PORSCHE ───────────────────────────────────────────────────
  { id: 'porsche-macan',     make: 'Porsche',      model: 'Macan',                mpg: 30, co2Gkm: 210, purchasePrice: 62000, insuranceAnnual: 1900, evEquivalentId: 'bmw-ix1' },
  { id: 'porsche-cayenne',   make: 'Porsche',      model: 'Cayenne',              mpg: 24, co2Gkm: 255, purchasePrice: 80000, insuranceAnnual: 2400, evEquivalentId: 'mercedes-eqa' },
]

export const EV_CARS = [
  { id: 'peugeot-e208',    make: 'Peugeot',       model: 'e-208',    milesPerKwh: 3.9, batteryKwh: 51,   rangeMiles: 224, purchasePrice: 32000, insuranceAnnual: 970  },
  { id: 'vauxhall-corsa-e',make: 'Vauxhall',      model: 'Corsa-e',  milesPerKwh: 3.9, batteryKwh: 50,   rangeMiles: 222, purchasePrice: 32000, insuranceAnnual: 980  },
  { id: 'byd-dolphin',     make: 'BYD',           model: 'Dolphin',  milesPerKwh: 4.0, batteryKwh: 60.4, rangeMiles: 265, purchasePrice: 26000, insuranceAnnual: 950  },
  { id: 'mini-electric',   make: 'MINI',          model: 'Electric', milesPerKwh: 4.0, batteryKwh: 40.7, rangeMiles: 145, purchasePrice: 34000, insuranceAnnual: 1050 },
  { id: 'mg4',             make: 'MG',            model: 'MG4',      milesPerKwh: 4.1, batteryKwh: 64,   rangeMiles: 281, purchasePrice: 26500, insuranceAnnual: 1000 },
  { id: 'vw-id3',          make: 'Volkswagen',    model: 'ID.3',     milesPerKwh: 3.8, batteryKwh: 77,   rangeMiles: 336, purchasePrice: 35500, insuranceAnnual: 1050 },
  { id: 'cupra-born',      make: 'Cupra',         model: 'Born',     milesPerKwh: 3.9, batteryKwh: 77,   rangeMiles: 340, purchasePrice: 37000, insuranceAnnual: 1100 },
  { id: 'vw-id4',          make: 'Volkswagen',    model: 'ID.4',     milesPerKwh: 3.5, batteryKwh: 82,   rangeMiles: 323, purchasePrice: 42000, insuranceAnnual: 1150 },
  { id: 'tesla-model3',    make: 'Tesla',         model: 'Model 3',  milesPerKwh: 4.1, batteryKwh: 82,   rangeMiles: 358, purchasePrice: 42990, insuranceAnnual: 1350 },
  { id: 'tesla-modely',    make: 'Tesla',         model: 'Model Y',  milesPerKwh: 3.8, batteryKwh: 82,   rangeMiles: 331, purchasePrice: 45990, insuranceAnnual: 1400 },
  { id: 'bmw-i4',          make: 'BMW',           model: 'i4',       milesPerKwh: 3.6, batteryKwh: 83.9, rangeMiles: 365, purchasePrice: 55000, insuranceAnnual: 1500 },
  { id: 'bmw-ix1',         make: 'BMW',           model: 'iX1',      milesPerKwh: 3.5, batteryKwh: 64.7, rangeMiles: 272, purchasePrice: 48000, insuranceAnnual: 1400 },
  { id: 'mercedes-eqa',    make: 'Mercedes-Benz', model: 'EQA',      milesPerKwh: 3.5, batteryKwh: 70.5, rangeMiles: 270, purchasePrice: 50000, insuranceAnnual: 1600 },
  { id: 'kia-ev6',         make: 'Kia',           model: 'EV6',      milesPerKwh: 3.7, batteryKwh: 77.4, rangeMiles: 328, purchasePrice: 46000, insuranceAnnual: 1200 },
  { id: 'hyundai-ioniq5',  make: 'Hyundai',       model: 'IONIQ 5',  milesPerKwh: 3.6, batteryKwh: 77.4, rangeMiles: 300, purchasePrice: 45000, insuranceAnnual: 1200 },
  { id: 'nissan-ariya',    make: 'Nissan',        model: 'Ariya',    milesPerKwh: 3.6, batteryKwh: 87,   rangeMiles: 329, purchasePrice: 45000, insuranceAnnual: 1200 },
]

export function getPetrolCarById(id)   { return PETROL_CARS.find(c => c.id === id) }
export function getEvCarById(id)       { return EV_CARS.find(c => c.id === id) }
export function getEvEquivalent(petrolCarId) {
  const petrol = getPetrolCarById(petrolCarId)
  if (!petrol) return null
  return getEvCarById(petrol.evEquivalentId)
}
