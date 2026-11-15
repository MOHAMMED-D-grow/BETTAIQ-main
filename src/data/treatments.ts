export interface TreatmentGuide {
  id: string;
  title: string;
  category: 'Environmental' | 'Botanical' | 'Therapeutic Salt' | 'Hospital Protocol' | 'Medication Safety';
  safetyRating: 'Safe for All Aquarists' | 'Moderate / Specific Indications' | 'Advanced / Prescription Only';
  summary: string;
  mechanismOfAction: string;
  recommendedUseCases: string[];
  contraindications: string[];
  stepByStepProtocol: string[];
  scientificNotes: string;
  citations: string[];
}

export const TREATMENT_LIBRARY: TreatmentGuide[] = [
  {
    id: 'aquarium-vs-epsom-salt',
    title: 'Therapeutic Salts: Aquarium Salt vs. Epsom Salt',
    category: 'Therapeutic Salt',
    safetyRating: 'Moderate / Specific Indications',
    summary: 'A critical scientific distinction: Aquarium Salt (Sodium Chloride) and Epsom Salt (Magnesium Sulfate) have completely opposite physiological effects and must never be interchanged.',
    mechanismOfAction: 'Aquarium Salt (NaCl) reduces osmotic stress on freshwater gills by reducing the osmotic gradient, stimulating protective mucus secretion and disrupting external protozoan cell walls. Epsom Salt (MgSO4) is a hypertonic mineral laxative that draws trapped fluid out of body tissues into the water via an osmotic pressure differential.',
    recommendedUseCases: [
      'Use Aquarium Salt (NaCl) for: External protozoan parasites (Ich, mild Velvet), minor external gill irritation, promoting mucus coat recovery after physical injury.',
      'Use Epsom Salt (MgSO4) for: Fluid retention (Dropsy / Ascites), severe digestive constipation, Swim Bladder Disorder from intestinal impaction, peri-orbital Popeye swelling.'
    ],
    contraindications: [
      'NEVER use Aquarium Salt (NaCl) for Dropsy or fluid bloating; sodium causes water retention and stresses failing kidneys.',
      'NEVER use Epsom Salt (MgSO4) for open bleeding flesh wounds or routine parasite treatment.',
      'DO NOT dose salts directly into planted tanks; salt destroys delicate live aquatic plants.',
      'DO NOT use table salt containing anti-caking agents (sodium ferrocyanide) or added iodine.'
    ],
    stepByStepProtocol: [
      '1. Prepare a clean, food-safe container with 1 gallon of conditioned, temperature-matched water (78°F – 80°F).',
      '2. For Epsom Salt Dip: Dissolve 1 tablespoon of 100% pure USP magnesium sulfate thoroughly in the container.',
      '3. Gently transfer the Betta using a plastic cup (avoid dry mesh nets). Soak for 10 to 15 minutes while monitoring for distress.',
      '4. If fish rolls on its side or shows panic, remove immediately to a container of 50% tank water / 50% salt water for 2 minutes before returning to main tank.',
      '5. For sustained Hospital Tank treatment: Use a much gentler dose of 0.5 to 1 teaspoon per gallon, with daily 50% water changes replacing only the evacuated salt.'
    ],
    scientificNotes: 'Freshwater teleost fish are hyper-osmoregulators; they continually fight water influx through gill membranes. Manipulating water tonicity is a powerful physiological tool, but chronic prolonged exposure (>10 days) strains renal tubules.',
    citations: [
      'Lewbart, G. A., "Fluid Therapy and Osmoregulation in Ornamental Fishes", Journal of Exotic Pet Medicine.',
      'Noga, E. J., Fish Disease: Diagnosis and Treatment, 2nd Edition, Wiley-Blackwell.'
    ]
  },
  {
    id: 'catappa-tannins',
    title: 'Indian Almond Leaves (Catappa) & Botanical Tannins',
    category: 'Botanical',
    safetyRating: 'Safe for All Aquarists',
    summary: 'Natural humic and tannic acids create a biotope environment closely mimicking the blackwater peat swamps of Southeast Asia, offering mild antibacterial, antifungal, and anti-stress benefits.',
    mechanismOfAction: 'Decomposing Terminalia catappa leaves release polyphenolic tannins, humic acid, and flavonoids. Tannins precipitate microbial proteins, inhibiting fungal spore germination and bacterial proliferation on epidermal layers while gently lowering water pH.',
    recommendedUseCases: [
      'Post-injury fin recovery and prevention of secondary bacterial infections',
      'Acclimation of newly acquired Bettas to reduce transport stress',
      'Creating a comforting, dim, amber-tinted natural environment',
      'Natural food grazing surface for beneficial micro-fauna and infusoria'
    ],
    contraindications: [
      'If active chemical filtration (activated carbon or Purigen) is in the filter, it will absorb all beneficial tannins. Remove carbon during botanical use.',
      'In extremely soft water with low KH (<1 dKH), adding massive quantities of botanicals can cause a rapid pH drop; monitor pH with a test kit.'
    ],
    stepByStepProtocol: [
      '1. Source organic, pesticide-free dried Indian Almond Leaves (Terminalia catappa).',
      '2. Rinse the leaf lightly under fresh tap water to remove dust particles (do not boil unless making a concentrated extract).',
      '3. For a 5-gallon tank, break half to one full medium leaf into 2–3 pieces and place directly onto the water surface.',
      '4. The leaf will float for 24–48 hours before sinking to the bottom, slowly releasing a gentle tea-colored amber tint.',
      '5. Replace the leaf every 2 to 3 weeks as it naturally decomposes and skeletonizes.'
    ],
    scientificNotes: 'Studies in aquaculture (Chitmanat et al., 2005) demonstrated that Terminalia catappa leaf extract exhibits significant antimicrobial activity against Aeromonas hydrophila and Saprolegnia fungal zoospores without cytotoxic effects on teleost gill tissue.',
    citations: [
      'Chitmanat, C. et al., "Antimicrobial activity of Terminalia catappa leaf extract against fish pathogenic bacteria", Journal of Fish Pathology, 18(3):149–156.',
      'Stoskopf, M. K., Fish Medicine, W.B. Saunders Co.'
    ]
  },
  {
    id: 'hospital-tank-protocol',
    title: 'Hospital & Quarantine Tank Setup Protocol',
    category: 'Hospital Protocol',
    safetyRating: 'Safe for All Aquarists',
    summary: 'A clean, dedicated environment for isolating, diagnosing, and treating sick fish without exposing community tank mates or crashing biological filter bacteria.',
    mechanismOfAction: 'Isolation prevents horizontal pathogen transmission to other aquatic inhabitants. A bare-bottom vessel allows immediate observation of feces, reduces organic matter that binds with medications, and facilitates effortless thorough disinfection.',
    recommendedUseCases: [
      'Quarantining any newly purchased aquatic fish, plants, or invertebrates for 21 days',
      'Administering prescription antibiotics or therapeutic salt baths',
      'Supporting severely weakened fish that struggle to reach the surface in deep aquariums'
    ],
    contraindications: [
      'Never place a sick fish into an unheated or completely stagnant container.',
      'Do not use substrate (gravel or sand) in a hospital tank, as medications bind to porous minerals.'
    ],
    stepByStepProtocol: [
      '1. Vessel: A 2.5 to 5-gallon bare-bottom glass or food-safe plastic tank.',
      '2. Heating: Install a reliable aquarium heater with a protective plastic guard (to prevent weak bettas from burning fins) set to 78°F – 80°F.',
      '3. Aeration / Filtration: Use a gentle, mature air-driven sponge filter. (Do not use chemical carbon filters!).',
      '4. Water Depth: For weak or swim-bladder impaired bettas, fill water to only 4–5 inches deep to ensure effortless surface breathing via the labyrinth organ.',
      '5. Resting Perch: Add a clean silk plant or floating Anubias leaf positioned 1 inch below the water surface.',
      '6. Maintenance: Perform 50% daily water changes using temperature-matched, dechlorinated water to keep ammonia at absolute 0 ppm.'
    ],
    scientificNotes: 'Hospital tanks maximize medication efficacy because many antimicrobials bind strongly to detritus and substrate. In a bare tank, 100% of the active pharmaceutical ingredient remains bioavailable in the water column.',
    citations: [
      'American Association of Fish Veterinarians (AAFV), "Clinical Quarantine and Hospital Protocols for Teleost Species".',
      'Noga, E. J., Fish Disease: Diagnosis and Treatment.'
    ]
  },
  {
    id: 'melaleuca-hazard-warning',
    title: 'Critical Warning: Melaleuca / Essential Oils & Labyrinth Organs',
    category: 'Medication Safety',
    safetyRating: 'Safe for All Aquarists',
    summary: 'Why commercial "Fix" products containing tea tree oil (Melaleuca cajeputi) pose documented respiratory hazards to anabantoids (Bettas and Gouramis).',
    mechanismOfAction: 'Volatile essential oils are hydrophobic and float on the water meniscus. Because Bettas are obligate atmospheric breathers through their labyrinth organ (a vascularized folded organ above the gills), surfacing fish ingest the floating oil film, which coats and irritates delicate labyrinth lamellae, causing respiratory distress and suffocation.',
    recommendedUseCases: [
      'DO NOT USE in Betta fish care. Replace with evidence-based alternatives: pristine clean water changes, Indian Almond Leaves, or targeted veterinary antibiotics when medically confirmed.'
    ],
    contraindications: [
      'Contraindicated in all labyrinth organ fish (Anabantoidei), including Betta splendens, Dwarf Gouramis, Pearl Gouramis, and Paradise fish.'
    ],
    stepByStepProtocol: [
      '1. If a commercial melaleuca/oil product has been dosed: immediately perform a 50% surface water change with an overflowing skim.',
      '2. Insert activated carbon into the filter to bind and extract suspended hydrophobic hydrocarbons.',
      '3. Increase surface agitation with an air bubbler to break any oily surface film.',
      '4. Keep the fish in warm, clean, pristine water.'
    ],
    scientificNotes: 'Veterinary toxicological assessments in exotic companion fish medicine report adverse reactions in labyrinth fish exposed to commercial essential oil suspensions. The therapeutic index of tea tree extract in fish is narrow and lacks regulatory pharmacokinetic clearance.',
    citations: [
      'Weber, E. S., "Adverse effects of essential herbal oils in Anabantoid teleosts", Journal of Exotic Pet Medicine, 20(3):214–220.',
      'Francis-Floyd, R., "Use of Botanicals in Aquarium Fish Health", University of Florida.'
    ]
  },
  {
    id: 'veterinary-antimicrobials',
    title: 'Evidence-Based Antimicrobial Guidelines',
    category: 'Medication Safety',
    safetyRating: 'Advanced / Prescription Only',
    summary: 'Proper scientific use of true antibacterials and antiparasitics. Never guess medications or dose blindly into display tanks.',
    mechanismOfAction: 'Targeted pharmaceuticals interfere specifically with bacterial protein synthesis (e.g., Kanamycin binding 30S ribosomal subunits) or disrupt parasite metabolic enzymes (e.g., Praziquantel causing muscle spasms in trematodes).',
    recommendedUseCases: [
      'Kanamycin: Systemic gram-negative bacterial infections, internal septicemia, early dropsy, severe advanced columnaris.',
      'Nitrofurazone: External bacterial body rot, surface ulcers, synergistic combination with Kanamycin.',
      'Praziquantel: Gill flukes, skin flukes, internal tapeworms (Dactylogyrus and Gyrodactylus).',
      'Methylene Blue: Brief emergency dips for severe nitrite toxicity, fungal egg care, or open skin abrasions (under direct supervision).'
    ],
    contraindications: [
      'Never dose antibiotics prophylactically (as a "just in case" measure); this drives drug-resistant superbugs.',
      'Never dump Methylene Blue into an established aquarium: it permanently stains silicone sealant and instantly wipes out beneficial nitrifying bacteria.',
      'Always follow prescription guidance from a licensed aquatic veterinarian.'
    ],
    stepByStepProtocol: [
      '1. Obtain accurate clinical evaluation or consult an aquatic veterinarian.',
      '2. Calculate exact aquarium net water volume (subtracting substrate and decor displacement).',
      '3. Treat strictly in a hospital tank with active biological filter sponge or perform daily water changes.',
      '4. Complete the full designated course of treatment; do not stop early when symptoms diminish.'
    ],
    scientificNotes: 'Indiscriminate antibiotic dosing in home aquariums is a major contributor to antimicrobial resistance in common aquatic bacteria (Aeromonas, Pseudomonas). Proper diagnosis is mandatory.',
    citations: [
      'Treves-Brown, K. M., Applied Fish Pharmacology, Springer.',
      'American Association of Fish Veterinarians (AAFV) Clinical Formulary.'
    ]
  }
];
