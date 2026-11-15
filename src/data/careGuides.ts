export interface WaterParameter {
  parameter: string;
  idealRange: string;
  dangerThreshold: string;
  unit: string;
  purpose: string;
  correctionAction: string;
}

export interface TankMate {
  species: string;
  category: 'Safe' | 'Conditional / Tank Size Dependent' | 'Strictly Incompatible';
  recommendedTankSize: string;
  temperament: string;
  notes: string;
}

export const WATER_PARAMETERS: WaterParameter[] = [
  {
    parameter: 'Temperature',
    idealRange: '78°F – 80°F (25.5°C – 26.6°C)',
    dangerThreshold: '< 74°F or > 84°F',
    unit: '°F / °C',
    purpose: 'Bettas are tropical ectotherms. Warm temperatures power metabolic enzymes, immune antibody production, and digestion.',
    correctionAction: 'Install a submersible digital adjustable aquarium heater (5W per gallon). Never rely on ambient room temperature.'
  },
  {
    parameter: 'Ammonia (NH3/NH4+)',
    idealRange: '0.00 ppm',
    dangerThreshold: '> 0.25 ppm',
    unit: 'ppm (mg/L)',
    purpose: 'Fish excrete toxic ammonia through gills. Even trace amounts cause gill hyperplasia, chemical burns, and suffocation.',
    correctionAction: 'Immediate 50% water change with Seachem Prime. Ensure filter has established beneficial nitrifying bacteria.'
  },
  {
    parameter: 'Nitrite (NO2-)',
    idealRange: '0.00 ppm',
    dangerThreshold: '> 0.25 ppm',
    unit: 'ppm (mg/L)',
    purpose: 'Intermediate byproduct of the nitrogen cycle. Nitrite binds to teleost hemoglobin, forming methemoglobin which cannot carry oxygen.',
    correctionAction: 'Immediate water change. Add aquarium salt or Prime to block nitrite uptake across gill lamellae.'
  },
  {
    parameter: 'Nitrate (NO3-)',
    idealRange: '< 20 ppm',
    dangerThreshold: '> 40 ppm',
    unit: 'ppm (mg/L)',
    purpose: 'Final oxidation byproduct of the nitrogen cycle. Less toxic than ammonia/nitrite, but chronic high levels suppress immunity.',
    correctionAction: 'Perform regular 25% weekly water changes. Introduce live fast-growing plants like Salvinia, Hornwort, or Pothos roots.'
  },
  {
    parameter: 'pH (Acidity / Alkalinity)',
    idealRange: '6.8 – 7.5 (Stable)',
    dangerThreshold: '< 6.0 or > 8.2',
    unit: 'pH scale',
    purpose: 'Stability is far more critical than an exact number. Wild Bettas tolerate mildly acidic peat waters.',
    correctionAction: 'Do not use chemical pH buffers that cause lethal swings. Use natural driftwood or Indian Almond leaves for gentle moderation.'
  },
  {
    parameter: 'General Hardness (GH)',
    idealRange: '3 – 8 dGH (50 – 140 ppm)',
    dangerThreshold: '> 18 dGH',
    unit: 'dGH / ppm',
    purpose: 'Provides essential dissolved divalent cations (calcium and magnesium) required for bone density and osmoregulation.',
    correctionAction: 'Dilute with reverse osmosis (RO) water if overly hard; remineralize RO water with equilibrium salts if pure RO is used.'
  }
];

export const NITROGEN_CYCLE_STAGES = [
  {
    stage: 1,
    title: 'Organic Waste & Ammonia Spikes',
    subtext: 'Days 1 – 10',
    description: 'Fish respiration, feces, and uneaten high-protein food decompose into toxic un-ionized ammonia (NH3). Without biological filter bacteria, ammonia accumulates rapidly to lethal levels.',
    keyPlayer: 'Heterotrophic decomposer bacteria',
    targetReading: 'Ammonia rising to 2.0 – 4.0 ppm'
  },
  {
    stage: 2,
    title: 'Nitrosomonas Colonization & Nitrite Peak',
    subtext: 'Days 10 – 24',
    description: 'Beneficial autotrophic bacteria (Nitrosomonas spp.) colonize the porous biological media in your sponge or filter canister. They consume ammonia and convert it into toxic nitrite (NO2-).',
    keyPlayer: 'Nitrosomonas bacteria',
    targetReading: 'Ammonia drops toward 0 ppm; Nitrite spikes high'
  },
  {
    stage: 3,
    title: 'Nitrospira Colonization & Nitrate Emergence',
    subtext: 'Days 25 – 40',
    description: 'A second distinct group of nitrifying bacteria (Nitrospira spp.) multiplies, converting toxic nitrite into significantly less harmful nitrate (NO3-).',
    keyPlayer: 'Nitrospira bacteria',
    targetReading: 'Nitrite drops to 0.00 ppm; Nitrate begins to rise'
  },
  {
    stage: 4,
    title: 'Fully Cycled Equilibrium',
    subtext: 'Ongoing Biological Balance',
    description: 'The biological ecosystem is complete. The filter instantly converts any ammonia produced into nitrate. Regular weekly 20–25% water changes manually export accumulated nitrates.',
    keyPlayer: 'Established Biofilm + Live Plants',
    targetReading: 'Ammonia: 0 ppm | Nitrite: 0 ppm | Nitrate: < 20 ppm'
  }
];

export const TANK_MATES: TankMate[] = [
  {
    species: 'Nerite Snails (Zebra, Tiger, Horned)',
    category: 'Safe',
    recommendedTankSize: '5+ gallons',
    temperament: 'Peaceful, slow-moving algae grazer',
    notes: 'Outstanding tank mates. Their rounded low-profile shells leave almost no fleshy tentacles exposed for curious bettas to nip. Cannot reproduce in freshwater.'
  },
  {
    species: 'Amano Shrimp (Caridina multidentata)',
    category: 'Safe',
    recommendedTankSize: '5+ gallons',
    temperament: 'Busy, peaceful scavenger',
    notes: 'Large enough (1.5 – 2 inches) that adult bettas cannot swallow them. Excellent hair algae eaters. Provide moss and hideaways.'
  },
  {
    species: 'Mystery Snails (Pomacea bridgesii)',
    category: 'Safe',
    recommendedTankSize: '10+ gallons',
    temperament: 'Peaceful herbivore / detritivore',
    notes: 'Colorful and active. High bio-load, so 10 gallons minimum is recommended. Bettas may occasionally inspect their long eye siphons.'
  },
  {
    species: 'Harlequin Rasboras (Trigonostigma heteromorpha)',
    category: 'Conditional / Tank Size Dependent',
    recommendedTankSize: '15+ gallons (School of 6–8 minimum)',
    temperament: 'Peaceful, calm schooling fish',
    notes: 'Native to the same Southeast Asian peat habitats as Bettas. Gentle, non-nippy schooling behavior. Never keep in tanks under 15 gallons.'
  },
  {
    species: 'Pygmy Corydoras (Corydoras pygmaeus)',
    category: 'Conditional / Tank Size Dependent',
    recommendedTankSize: '10 – 15+ gallons (Group of 6+)',
    temperament: 'Extremely peaceful bottom dweller',
    notes: 'Stays at the substrate level, avoiding the Betta’s surface territory. Requires soft sand substrate and established water parameters.'
  },
  {
    species: 'Cherry Shrimp (Neocaridina davidi)',
    category: 'Conditional / Tank Size Dependent',
    recommendedTankSize: '5+ gallons (Dense live plants required)',
    temperament: 'Docile dwarf shrimp',
    notes: 'Depends heavily on individual Betta temperament. Some bettas ignore them, while assertive bettas view bright red juvenile shrimp as live food.'
  },
  {
    species: 'Tiger Barbs / Serpae Tetras',
    category: 'Strictly Incompatible',
    recommendedTankSize: 'Incompatible',
    temperament: 'Aggressive fin-nipping schoolers',
    notes: 'Notorious fin-nippers that will relentlessly shred a Betta’s delicate caudal and dorsal fins, causing severe physical trauma and fatal stress.'
  },
  {
    species: 'Fancy Guppies (Poecilia reticulata)',
    category: 'Strictly Incompatible',
    recommendedTankSize: 'Incompatible',
    temperament: 'Active, long-finned livebearers',
    notes: 'Male Bettas often mistake brightly colored, flowing-finned male guppies for rival male bettas, leading to severe territorial attacks.'
  },
  {
    species: 'Gouramis (Dwarf, Pearl, Three-Spot)',
    category: 'Strictly Incompatible',
    recommendedTankSize: 'Incompatible',
    temperament: 'Territorial labyrinth fish',
    notes: 'Close taxonomic relatives that inhabit the exact same top-level labyrinth niche. Guaranteed territory fights and stress.'
  },
  {
    species: 'Second Male Betta (Betta splendens)',
    category: 'Strictly Incompatible',
    recommendedTankSize: 'NEVER CO-HOUSE',
    temperament: 'Hyper-territorial intraspecific aggression',
    notes: 'Two male domesticated Bettas will fight until severe mutilation or death occurs. Always house male Bettas in separate individual aquariums.'
  }
];

export const FEEDING_GUIDE = {
  dietaryClassification: 'Obligate Insectivorous Carnivores',
  wildDiet: 'Mosquito larvae (wigglers), bloodworms, fruit flies, small crustaceans, water fleas, surface insects.',
  stomachSizeRule: 'A Betta’s stomach is roughly the size of its eyeball. Never feed more than 2 to 4 small pellets per meal.',
  feedingFrequency: '1 to 2 small feedings per day, 6 days per week. Include 1 weekly fasting day to promote gastrointestinal clearing.',
  recommendedFoods: [
    {
      name: 'High-Protein Insect Pellets (Fluval Bug Bites, Northfin)',
      type: 'Core Staple',
      benefit: 'Black soldier fly larvae base matches natural insectivorous digestive enzyme balance with minimal starches.'
    },
    {
      name: 'Frozen Bloodworms & Brine Shrimp',
      type: 'Nutritional Treat (2–3x weekly)',
      benefit: 'Provides moisture and digestible proteins. Thaw a tiny pinch in a cup of tank water before pipetting.'
    },
    {
      name: 'Frozen / Live Daphnia (Water Fleas)',
      type: 'Digestive Aid & Laxative',
      benefit: 'Natural roughage and chitin that gently prevents constipation and swim bladder bloating.'
    }
  ],
  foodsToAvoid: [
    'Low-quality generic flakes high in wheat middlings and corn filler',
    'Freeze-dried foods fed dry without pre-soaking (causes dry bloat in stomach)',
    'Vegetables like peas (Bettas lack enzymes to digest plant cellulose properly)'
  ]
};
