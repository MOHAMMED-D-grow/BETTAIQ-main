export interface SimilarCondition {
  name: string;
  distinction: string;
}

export interface HealthCondition {
  id: string;
  name: string;
  category: 'Bacterial' | 'Parasitic' | 'Fungal' | 'Environmental' | 'Digestive' | 'Systemic';
  severity: 'Mild' | 'Moderate' | 'High' | 'Critical';
  image: string;
  primarySymptoms: string[];
  possibleCauses: string[];
  similarConditions: SimilarCondition[];
  safeImmediateSteps: string[];
  evidenceTreatmentGuidance: string[];
  whatNOTToDo: string[];
  prevention: string[];
  vetConsultationTriggers: string[];
  evidenceSource: string;
  reviewDate: string;
  detailedOverview: string;
}

export const HEALTH_CONDITIONS: HealthCondition[] = [
  {
    id: 'fin-rot',
    name: 'Fin & Tail Rot (Bacterial / Environmental)',
    category: 'Bacterial',
    severity: 'Moderate',
    image: '/src/assets/images/disease_fin_rot_1793250018761.jpg',
    primarySymptoms: [
      'Frayed, ragged, or disintegrating fin edges',
      'Black, dark brown, or bloody red margins on fin margins',
      'Loss of fin webbing leaving bare ray bones exposed',
      'Clamped fins held close to the body'
    ],
    possibleCauses: [
      'Elevated ammonia, nitrite, or nitrate levels degrading protective mucus coat',
      'Secondary bacterial opportunistic invasion (Pseudomonas fluorescens or Aeromonas hydrophila)',
      'Physical tearing on plastic decor or rough gravel followed by poor water hygiene',
      'Chronic chilling due to tank temperature below 76°F (24.4°C)'
    ],
    similarConditions: [
      {
        name: 'Crowntail Natural Ray Webbing',
        distinction: 'Crowntails naturally possess reduced webbing between rays, but ray tips remain clean and clear without black necrotic margins or fraying.'
      },
      {
        name: 'Fin Biting / Mechanical Tearing',
        distinction: 'Fin biting produces sudden clean circular chunks missing overnight, whereas fin rot exhibits gradual melting with discoloration.'
      }
    ],
    safeImmediateSteps: [
      'Test water parameters immediately using a liquid test kit (API Master Test Kit); target Ammonia: 0 ppm, Nitrite: 0 ppm, Nitrate: <20 ppm.',
      'Perform a 25% – 30% temperature-matched water change with quality water conditioner (Seachem Prime or equivalent).',
      'Verify water temperature is stabilized between 78°F – 80°F (25.5°C – 26.6°C). Chilled bettas have suppressed immune responses.',
      'Introduce clean Indian Almond Leaves (Catappa) to gently release protective tannins and humic acids into the water.',
      'Remove any abrasive artificial plants, sharp rocks, or unbaffled high-suction filter intakes.'
    ],
    evidenceTreatmentGuidance: [
      'Primary treatment for mild to moderate cases is environmental optimization: pristine water with zero ammonia/nitrite and mild tannins.',
      'For severe progressive bacterial rot reaching the caudal peduncle: isolate in a bare-bottom hospital tank and administer veterinary-approved antimicrobials (such as Kanamycin or Maracyn 2) under professional guidance.',
      'Always remove chemical activated carbon from the filter before administering medications.'
    ],
    whatNOTToDo: [
      'DO NOT blindly dose broad-spectrum antibiotics into the main display aquarium; doing so destroys the biological nitrogen cycle.',
      'DO NOT use oil-based herbal extracts (such as Melaleuca / Bettafix); volatile oils can accumulate at the surface and compromise the labyrinth organ.',
      'DO NOT increase water temperature above 80°F if bacterial columnaris is also suspected, as heat accelerates bacterial multiplication.'
    ],
    prevention: [
      'Maintain weekly 20% to 25% water changes.',
      'Ensure a cycled filter is present in an aquarium of at least 5 gallons.',
      'Only use smooth silk plants or live aquarium plants (Anubias, Java Fern, Cryptocoryne).'
    ],
    vetConsultationTriggers: [
      'Rot reaches the base of the caudal peduncle (body flesh).',
      'Red streaks extend along the spine or body wall (septicemia).',
      'No improvement after 7 days of pristine water quality and botanical tannin therapy.'
    ],
    evidenceSource: 'Francis-Floyd, R. et al., "Bacterial Diseases of Fish", University of Florida Aquatic Animal Health Extension (FA-14); Merck Veterinary Manual.',
    reviewDate: 'October 2026',
    detailedOverview: 'Fin rot is almost universally an environmental disease in origin. Healthy bettas possess a robust mucosal immune barrier. When water parameters degrade or physical micro-tears occur, ubiquitous opportunistic water bacteria colonize the fin tissue. In early stages, pristine warm water is the safest and most effective therapeutic protocol.'
  },
  {
    id: 'ich',
    name: 'Ich / White Spot Disease (Ichthyophthirius multifiliis)',
    category: 'Parasitic',
    severity: 'High',
    image: '/src/assets/images/disease_ich_white_spot_1793250036516.jpg',
    primarySymptoms: [
      'Distinct, salt-grain-sized white nodules (0.5–1.0 mm) scattered across body, fins, and head',
      'Flashing or rubbing rapidly against substrate, filter pipes, or driftwood',
      'Lethargy, clamped fins, and heavy respiratory gill pumping',
      'Skin slime thickening in response to parasite irritation'
    ],
    possibleCauses: [
      'Infection by the ciliated protozoan Ichthyophthirius multifiliis',
      'Introduction of unquarantined new plants, live foods, or snails harboring tomont cysts',
      'Sudden severe temperature drop (e.g. failing heater or unconditioned cold water change)'
    ],
    similarConditions: [
      {
        name: 'Velvet Disease (Piscinoodinium)',
        distinction: 'Velvet spots are microscopic (0.01 mm) with a golden or rust-colored powder appearance under directed flashlight, unlike the discrete salt grains of Ich.'
      },
      {
        name: 'Epistylis (Ciliophoran ectocommensal)',
        distinction: 'Epistylis lesions are raised, fluffy, variable in size, and typically grow on fin ray tips rather than scattered evenly across the body.'
      }
    ],
    safeImmediateSteps: [
      'Confirm thermal heater capability; gradually elevate water temperature to 82°F – 84°F (1°F every 3 hours) to accelerate the parasite life cycle only if columnaris is ruled out.',
      'Increase surface aeration using an air stone, as higher water temperatures contain less dissolved oxygen.',
      'Perform thorough gravel vacuuming every 48 hours to siphon out tomont cysts resting on the tank floor before they erupt into infectious theronts.',
      'If medical treatment is indicated, consult an aquatic veterinarian or use trusted Ich remedies (formalin/malachite green combinations) strictly per manufacturer instructions with carbon filter inserts removed.'
    ],
    evidenceTreatmentGuidance: [
      'Theront-targeted protozoacide therapy: Ich medications can only penetrate the free-swimming theront stage, not the embedded trophont or cyst stage.',
      'Maintain continuous therapeutic concentration throughout the 10-14 day lifecycle depending on water temperature.',
      'Daily 25% water changes with gravel siphon before redosing ensures cyst density reduction.'
    ],
    whatNOTToDo: [
      'DO NOT stop treatment immediately when white spots disappear from the fish; the parasite is only vulnerable to medication during the free-swimming theront phase after detaching from the host.',
      'DO NOT use aquarium salt if you have live plants or sensitive snails in the same tank without moving the fish to a bare-bottom hospital setup.'
    ],
    prevention: [
      'Quarantine all newly acquired plants, invertebrates, and live foods for 2 to 3 weeks before introducing to your betta aquarium.',
      'Keep a calibrated digital thermometer in the tank to catch heater failures early.'
    ],
    vetConsultationTriggers: [
      'Fish exhibits severe respiratory distress or gasping continuously at the surface.',
      'White spots cover more than 40% of the body surface within 24 hours.',
      'Parasite shows resistance to standard protozoacide protocol after 5 days.'
    ],
    evidenceSource: 'Noga, E. J., Fish Disease: Diagnosis and Treatment, 2nd Ed., Wiley-Blackwell; AAFV Parasitology Guidelines; Merck Veterinary Manual.',
    reviewDate: 'September 2026',
    detailedOverview: 'Ich is caused by an obligate protozoan ectoparasite that embeds beneath the host epidermis, where medications cannot penetrate. Treatment relies on targeting the vulnerable free-swimming theront life-stage through environmental temperature control, gravel siphoning, and approved aquatic protozoacides.'
  },
  {
    id: 'velvet',
    name: 'Velvet / Gold Dust Disease (Piscinoodinium pillulare)',
    category: 'Parasitic',
    severity: 'Critical',
    image: '/src/assets/images/disease_velvet_gold_1793250058297.jpg',
    primarySymptoms: [
      'Fine, microscopic yellowish-gold or rust-colored powder dusting the body (best seen with a flashlight directed in a dark room)',
      'Intense, rapid flashing and erratic darting against hard surfaces',
      'Severe clamped fins and rapid opercular (gill) movements',
      'Skin sloughing or peeling in advanced stages'
    ],
    possibleCauses: [
      'Infection by the parasitic dinoflagellate Piscinoodinium pillulare',
      'Contaminated water, nets, or live food from infected systems',
      'High stress, poor water quality, or immunosuppression'
    ],
    similarConditions: [
      {
        name: 'Ich (White Spot)',
        distinction: 'Ich has larger, stark white, round salt-like spots, while Velvet creates a continuous shimmering golden/amber dusting across the cuticle.'
      },
      {
        name: 'Natural Metallic Scale Iridophores',
        distinction: 'Healthy metallic scales glisten under light without behavioral flashing, rapid breathing, or fin clamping.'
      }
    ],
    safeImmediateSteps: [
      'Black out the aquarium: Velvet dinoflagellates contain chlorophyll and utilize photosynthesis to supplement their nutrition; turning off all lights and covering the tank with a dark towel deprives them of light energy.',
      'Raise temperature slightly to 80°F – 82°F to hasten life cycle while maintaining vigorous surface aeration.',
      'Prepare a hospital quarantine tank for targeted protozoan treatment (copper sulfate or aquatic acriflavine under veterinary guidance).',
      'Test and match water parameters diligently.'
    ],
    evidenceTreatmentGuidance: [
      'Copper-based or acriflavine protozoan medications are standard clinical treatments for Piscinoodinium.',
      'Complete darkness for 7 to 10 days prevents dinoflagellate photosynthetic energy production.',
      'Perform 30% daily water changes in quarantine before redosing.'
    ],
    whatNOTToDo: [
      'DO NOT confuse Velvet with Ich: Velvet spots are vastly smaller, golden-yellow/amber, and give a velvet cloth-like dusting rather than distinct salt crystals.',
      'DO NOT dose copper in a display tank containing snails or shrimp, as copper is lethal to all aquatic invertebrates.'
    ],
    prevention: [
      'Strict quarantine protocols for any aquatic life.',
      'Disinfect nets and equipment between aquariums using a 10% bleach solution or potassium permanganate dip followed by dechlorinator.'
    ],
    vetConsultationTriggers: [
      'Severe respiratory collapse or lethargy at the bottom.',
      'Widespread skin ulceration.',
      'Immediate veterinary consultation is strongly recommended due to high mortality of untreated Velvet.'
    ],
    evidenceSource: 'Durborow, R. M., "Protozoan Parasites", Southern Regional Aquaculture Center (SRAC Publication No. 4701); Merck Veterinary Manual.',
    reviewDate: 'October 2026',
    detailedOverview: 'Velvet is caused by Piscinoodinium, an armored dinoflagellate that anchors into the epithelial tissue of the skin and gills with root-like rhizocysts, causing severe tissue necrosis and respiratory impairment. Because dinospores possess chloroplasts, complete darkness combined with specific protozoacides is a critical triage measure.'
  },
  {
    id: 'fungal-infection',
    name: 'Fungal Infection / Water Mold (Saprolegniasis)',
    category: 'Fungal',
    severity: 'Moderate',
    image: '/src/assets/images/disease_fungal_growth_1793250078676.jpg',
    primarySymptoms: [
      'Fluffy, cotton-like or woolly white/gray tufts protruding from skin or fin abrasions',
      'Localized growths typically originating on a pre-existing physical injury or bite wound',
      'Lethargy and loss of appetite as secondary inflammation increases',
      'Fins sticking together where mold filaments entangle'
    ],
    possibleCauses: [
      'Opportunistic infection by oomycetes such as Saprolegnia or Achlya species',
      'Secondary invasion of damaged skin following netting trauma or fin nipping',
      'Decaying uneaten organic food or high particulate matter in the substrate',
      'Cold water temperatures (<75°F) impairing the fish\'s epidermal defense enzymes'
    ],
    similarConditions: [
      {
        name: 'Columnaris (Flavobacterium columnare)',
        distinction: 'Columnaris is a flat, pale or yellowish bacterial lesion forming a saddleback or mouth erosion, whereas true Saprolegnia features raised, cotton-wool-like fluffy tufts.'
      },
      {
        name: 'Excess Slime Coat Sloughing',
        distinction: 'Slime coat shedding looks like a translucent veil over the body without distinct projecting fungal hyphae.'
      }
    ],
    safeImmediateSteps: [
      'Check and stabilize water temperature between 78°F – 80°F (chilled water drastically promotes Saprolegnia germination).',
      'Perform a 30% water change to eliminate suspended organic spores and decaying matter.',
      'Add pure Catappa (Indian Almond) leaves: natural tannins exhibit proven antifungal and antibacterial properties.',
      'Isolate in a clean hospital tank if the display tank has decaying organic debris.'
    ],
    evidenceTreatmentGuidance: [
      'Topical treatment with methylene blue or povidone-iodine swab by an experienced keeper or vet for localized external tufts.',
      'Aquatic antifungal medications containing phenoxyethanol or malachite green administered per clinical guidelines in quarantine.',
      'Maintain pristine water parameters to allow epidermal re-epithelialization.'
    ],
    whatNOTToDo: [
      'DO NOT scrape off the fungal tufts vigorously with dry tools; this tears viable epidermal tissue and worsens the wound.',
      'DO NOT treat with broad-spectrum antibacterials alone, as antibacterials have zero efficacy against eukaryotic fungal pathogens.'
    ],
    prevention: [
      'Ensure smooth aquarium decor without sharp edges.',
      'Promptly siphon out uneaten food pellets after 5 minutes.',
      'Maintain strong biological filtration and consistent warm water.'
    ],
    vetConsultationTriggers: [
      'Fungal growth spreads over more than 25% of the body surface.',
      'Tufts invade the gill chamber, interfering with respiration.',
      'No regression after 4 days of clean water and antifungal therapy.'
    ],
    evidenceSource: 'Noga, E. J., Fish Disease: Diagnosis and Treatment; Stoskopf, M. K., Fish Medicine; Merck Veterinary Manual.',
    reviewDate: 'October 2026',
    detailedOverview: 'Saprolegniasis is an opportunistic water mold infection. Oomycetes are ubiquitous in aquatic systems, feeding on decaying organic matter. They cannot penetrate intact, healthy fish skin; rather, they require a broken mucus barrier or epidermal wound. Treatment focuses on eradicating the mold hyphae and allowing healthy skin regeneration.'
  },
  {
    id: 'dropsy',
    name: 'Dropsy (Pineconing & Fluid Retention)',
    category: 'Systemic',
    severity: 'Critical',
    image: '/src/assets/images/disease_dropsy_pinecone_1793250103232.jpg',
    primarySymptoms: [
      'Scales protruding outward like a pinecone (best seen when viewing the fish from directly above)',
      'Severe, symmetrical abdominal distension and fluid edema (ascites)',
      'Bulging eyes (secondary bilateral exophthalmia)',
      'Profound lethargy, clamped fins, pale or stringy white feces, and loss of appetite'
    ],
    possibleCauses: [
      'End-stage organ failure (kidney failure, hepatic lipidosis, or heart failure)',
      'Systemic internal bacterial infection (Aeromonas or Edwardsiella) breaking osmoregulatory capillary permeability',
      'Chronic severe environmental stress, toxicity, or genetic predisposition'
    ],
    similarConditions: [
      {
        name: 'Severe Constipation / Overfeeding',
        distinction: 'Constipation causes localized stomach bulging, but scales remain completely flat against the body when viewed from directly above.'
      },
      {
        name: 'Egg-Binding in Females',
        distinction: 'Egg-laden females display rounded bellies with an ovipositor egg spot, but scales stay smooth and flat.'
      }
    ],
    safeImmediateSteps: [
      'Isolate immediately into a dedicated, heated (78°F – 80°F) bare-bottom hospital tank with an air stone to prevent exhaustion.',
      'Administer USP pure Epsom salt (Magnesium Sulfate) at 1 to 2 teaspoons per gallon in the hospital tank; the hypertonic magnesium solution draws excess retained fluid out of the body tissues through osmotic pressure.',
      'Consult an aquatic veterinarian immediately for prescription veterinary injectable or oral antimicrobials (such as Kanamycin in hospital water).',
      'Keep water pristine with daily 50% matched water changes in the hospital environment.'
    ],
    evidenceTreatmentGuidance: [
      'Osmotic relief through Epsom salt (1–2 tsp/gal) reduces coelomic fluid pressure.',
      'Broad-spectrum internal bacterial therapy with Kanamycin or Maracyn 2 before irreversible nephric failure sets in.',
      'Nutritional support with vitamin-fortified medicated foods if the fish is still eating.'
    ],
    whatNOTToDo: [
      'DO NOT use aquarium salt (sodium chloride); sodium ions can worsen fluid retention in failing kidneys.',
      'DO NOT delay action: once pineconing is fully pronounced across the entire body, renal damage is frequently irreversible.',
      'DO NOT expose other fish in community setups to sick fish fluids.'
    ],
    prevention: [
      'Never allow nitrate levels to exceed 20 ppm over prolonged periods.',
      'Avoid low-quality, expired flake foods with oxidised fats that stress liver enzymes.',
      'Maintain stable, warm thermal parameters year-round.'
    ],
    vetConsultationTriggers: [
      'ANY sign of outward scale pineconing requires immediate veterinary guidance, as prognosis is guarded without rapid clinical intervention.'
    ],
    evidenceSource: 'Lewbart, G. A., "Fluid Therapy and Osmoregulation in Ornamental Fishes", Journal of Exotic Pet Medicine; AAFV Clinical Protocols; Merck Veterinary Manual.',
    reviewDate: 'October 2026',
    detailedOverview: 'Dropsy is not a singular pathogen, but rather a clinical symptom of severe osmoregulatory failure. Freshwater fish are hyperosmotic to their surroundings; water constantly enters their bodies, and the kidneys must excrete dilute urine. When internal organs fail, excess fluid accumulates in the coelomic cavity, pushing the scale pockets outward.'
  },
  {
    id: 'swim-bladder',
    name: 'Swim Bladder Disorder (Buoyancy Malfunction)',
    category: 'Digestive',
    severity: 'Moderate',
    image: '/src/assets/images/variety_plakat_betta_1793164846135.jpg',
    primarySymptoms: [
      'Inability to maintain neutral buoyancy: floating involuntarily at surface, sinking to gravel, or listing sideways',
      'Distended or swollen abdomen directly beneath the swim bladder area',
      'Curved "S-shaped" spine posture when struggling to swim upright',
      'Difficulty swimming downward to explore or feed'
    ],
    possibleCauses: [
      'Constipation from dry commercial pellets expanding inside the stomach and pressing against the pneumatic swim bladder duct',
      'Overfeeding or lack of dietary fiber/moisture',
      'Low water temperature (<76°F) slowing gastrointestinal peristalsis',
      'Bacterial infection of the swim bladder chamber or physical trauma from a fall/jump'
    ],
    similarConditions: [
      {
        name: 'Dropsy',
        distinction: 'Dropsy involves fluid retention with outward scale pineconing, whereas swim bladder disorder alters balance without scale protrusion.'
      },
      {
        name: 'Congenital Double Tail Spinal Kyphosis',
        distinction: 'Double tail bettas often possess shorter bodies and mild swimming idiosyncrasies from hatching that are non-pathological.'
      }
    ],
    safeImmediateSteps: [
      'Fasting period: Stop all feeding for 24 to 48 hours to allow the gastrointestinal tract to clear naturally.',
      'Raise water temperature to a stable 79°F – 80°F to optimize enzymatic digestion.',
      'Lower the water level in the tank (or provide floating resting surfaces like Betta hammocks or Anubias leaves 1 inch below surface) so the fish can reach atmospheric air without exhausting itself.',
      'If bloating persists after 48 hours of fasting, offer thawed frozen Daphnia (water fleas), which act as a safe, natural, high-roughage laxative for carnivorous fish.',
      'Consider a pure Epsom salt bath (1 tablespoon USP pure magnesium sulfate per 1 gallon of conditioned water for 15 minutes in a separate container) to reduce fluid pressure via osmotic gradient.'
    ],
    evidenceTreatmentGuidance: [
      'Dietary management: 24-48h fast followed by live or thawed frozen Daphnia to promote natural gastrointestinal motility.',
      'Warm water maintenance at 80°F accelerates metabolic enzyme kinetics.',
      'Bacterial swim bladder infections unresponsive to diet require veterinary antimicrobial therapy.'
    ],
    whatNOTToDo: [
      'DO NOT feed green peas to a Betta fish; unlike herbivorous goldfish, Bettas are strict insectivores/carnivores and cannot digest fibrous plant cellulose, which can worsen impactions.',
      'DO NOT use regular table salt (sodium chloride) for constipation or dropsy, as sodium promotes fluid retention rather than osmotic relief.'
    ],
    prevention: [
      'Pre-soak dry pellet foods in tank water for 2 minutes before feeding to prevent in-stomach expansion.',
      'Incorporate a diverse diet of frozen bloodworms, brine shrimp, and daphnia alongside high-protein pellets.',
      'Incorporate one regular weekly "fasting day" into the feeding schedule.'
    ],
    vetConsultationTriggers: [
      'Fish has remained positively or negatively buoyant for >5 days with no improvement.',
      'Scales begin to protrude outwards like a pinecone (early signs of dropsy).',
      'Fish exhibits complete spinal deformation or inability to reach the surface.'
    ],
    evidenceSource: 'Francis-Floyd, R., "Swim Bladder Disease in Ornamental Fish", VM-156, University of Florida College of Veterinary Medicine; Merck Veterinary Manual.',
    reviewDate: 'October 2026',
    detailedOverview: 'The swim bladder is a gas-filled hydrostatic organ that controls buoyancy. In Bettas, the organ is anatomically contiguous with the stomach. When overfed dry pellets expand, or constipation develops, physical compression directly interferes with swim bladder volume regulation.'
  },
  {
    id: 'columnaris',
    name: 'Columnaris / Cotton Mouth (Flavobacterium columnare)',
    category: 'Bacterial',
    severity: 'Critical',
    image: '/src/assets/images/disease_fungal_growth_1793250078676.jpg',
    primarySymptoms: [
      'Cotton-like or pale grayish-white tufts around the mouth, snout, or head',
      'Pale, faded "saddleback" patch across the dorsal ridge behind the head',
      'Rapidly fraying fins accompanied by milky skin lesions',
      'Sudden rapid deterioration, loss of appetite, and lethargy'
    ],
    possibleCauses: [
      'Infection by the gram-negative, gliding bacterium Flavobacterium columnare',
      'High organic load in substrate, inadequate biological filtration',
      'High water temperatures (>82°F) can trigger hyper-virulent strains of Columnaris'
    ],
    similarConditions: [
      {
        name: 'True Fungus (Saprolegnia)',
        distinction: 'Saprolegnia forms long fluffy filaments projecting off open wounds; Columnaris forms flat grayish erosive plaques and saddlebacks.'
      },
      {
        name: 'Mouth Abrasion from Glass Surfing',
        distinction: 'Physical rubbing produces slight redness without rapid tissue erosion or fuzzy bacterial plaques.'
      }
    ],
    safeImmediateSteps: [
      'DO NOT raise the aquarium temperature. Unlike Ich, Columnaris bacteria replicate exponentially faster at temperatures above 78°F. Lower or maintain temperature around 75°F – 76°F while treating under vet guidance.',
      'Quarantine the affected fish in a dedicated hospital tank immediately.',
      'Conduct a 30% water change to reduce bacterial density and organic waste.',
      'Consult an aquatic vet or licensed professional for targeted veterinary antibacterial medications (such as Kanamycin + Nitrofurazone combination therapy).'
    ],
    evidenceTreatmentGuidance: [
      'Temperature control: lower to 75°F to inhibit Flavobacterium columnare replication.',
      'Combined synergistic antibacterial therapy with Kanamycin and Nitrofurazone administered in hospital quarantine.',
      'Maintain strong aeration due to bacterial gill lamellar degradation.'
    ],
    whatNOTToDo: [
      'DO NOT mistake Columnaris for a benign true fungal infection; Columnaris is a fast-moving, aggressive bacterial pathogen.',
      'DO NOT turn up aquarium heat.'
    ],
    prevention: [
      'Do not overcrowd tank or allow uneaten high-protein foods to decay on the substrate.',
      'Regular vacuuming of waste and maintenance of clean biological filter media.'
    ],
    vetConsultationTriggers: [
      'Lesion spreads to body saddle within 12 to 24 hours.',
      'Mouth erosion prevents closing jaws or breathing.'
    ],
    evidenceSource: 'Declercq, A. M. et al., "Columnaris disease in fish: a review with emphasis on bacterium-host interactions", Veterinary Research; Merck Veterinary Manual.',
    reviewDate: 'September 2026',
    detailedOverview: 'Columnaris is a devastating, fast-acting bacterial infection caused by Flavobacterium columnare. Often misdiagnosed as "mouth fungus" due to fuzzy white tufts, it requires urgent antibacterial therapy and careful temperature containment, as excessive heat substantially increases bacterial virulence.'
  },
  {
    id: 'popeye',
    name: 'Popeye / Exophthalmia (Unilateral or Bilateral)',
    category: 'Bacterial',
    severity: 'High',
    image: '/src/assets/images/editorial_veiltail_betta_1793165696708.jpg',
    primarySymptoms: [
      'One eye (unilateral) or both eyes (bilateral) noticeably protruding or swelling out of the eye socket',
      'Hazy, cloudy cornea or bloody ring around the orbital rim',
      'Reduced spatial awareness, bumping into glass or missing food when striking',
      'Lethargy and sheltering in dark corners'
    ],
    possibleCauses: [
      'Unilateral (one eye): Physical blunt trauma from bumping into sharp tank ornaments, or vigorous thrashing against a net',
      'Bilateral (both eyes): Systemic internal bacterial infection, fluid buildup, or poor water quality causing fluid accumulation behind both orbits'
    ],
    similarConditions: [
      {
        name: 'Natural Anatomical Prominence',
        distinction: 'Some Betta varieties naturally have prominent eyes, but both lenses remain crystal clear without orbital fluid distention or cloudiness.'
      },
      {
        name: 'Dropsy Complication',
        distinction: 'Dropsy causes bilateral Popeye secondary to whole-body fluid accumulation, accompanied by distinct scale pineconing.'
      }
    ],
    safeImmediateSteps: [
      'Assess whether one or both eyes are affected. Unilateral cases often resolve with pristine water and botanical tannins.',
      'Move to hospital tank if display tank has high water currents or aggressive tank mates.',
      'Add pure Epsom salt (1 tsp per gallon) to help relieve peri-orbital fluid swelling.',
      'Ensure pristine water (0 ammonia, 0 nitrite, <10 nitrate) to prevent opportunistic infection of the injured eye tissue.'
    ],
    evidenceTreatmentGuidance: [
      'Unilateral trauma: pristine conditioned water with Indian Almond leaves and 1 tsp/gal Epsom salt.',
      'Bilateral systemic infection: oral or waterborne broad-spectrum antimicrobials (Kanamycin) under veterinary supervision.',
      'Dim aquarium lighting to protect hypersensitive optical retinas.'
    ],
    whatNOTToDo: [
      'DO NOT handle the fish with dry nets; use a smooth plastic specimen container to prevent corneal abrasion.',
      'DO NOT leave sharp, jagged rock structures or fake plants in the aquarium.'
    ],
    prevention: [
      'Inspect aquarium decorations for sharp burrs with a nylon pantyhose test before placing in tank.',
      'Keep tank water cycled and free of particulate debris.'
    ],
    vetConsultationTriggers: [
      'Eye turns completely opaque white or ruptures.',
      'Both eyes swell concurrently with abdominal distention.',
      'Swelling does not diminish after 5 days of clean water care.'
    ],
    evidenceSource: 'Wildgoose, W. H., BSAVA Manual of Ornamental Fish, 2nd Ed., British Small Animal Veterinary Association; Merck Veterinary Manual.',
    reviewDate: 'October 2026',
    detailedOverview: 'Exophthalmia, commonly known as Popeye, is the protrusion of one or both globes from the orbit. Distinguishing between unilateral injury-related trauma and bilateral systemic illness is crucial for selecting appropriate interventions.'
  }
];
