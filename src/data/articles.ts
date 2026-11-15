export interface Article {
  id: string;
  title: string;
  category: 'Anatomy' | 'Myth Busting' | 'Water Chemistry' | 'Botanicals' | 'Behavior';
  readTime: string;
  author: string;
  credentials: string;
  reviewDate: string;
  summary: string;
  keyTakeaways: string[];
  content: string[];
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const KNOWLEDGE_ARTICLES: Article[] = [
  {
    id: 'myth-of-the-betta-puddle',
    title: 'The Myth of the Betta Puddle: The Truth About Wild Betta Habitats',
    category: 'Myth Busting',
    readTime: '5 min read',
    author: 'Dr. Evelyn Vance, PhD',
    credentials: 'Aquatic Ecologist & Freshwater Teleost Specialist',
    reviewDate: 'October 2026',
    summary: 'The pervasive pet store myth that Bettas naturally live and thrive in tiny mud puddles or animal footprints has caused decades of neglect. Here is what field research in Thailand and Cambodia really reveals.',
    keyTakeaways: [
      'Wild Bettas live in sprawling, interconnected floodplains, rice paddies, and slow-moving streams spanning thousands of square feet.',
      'Mud puddles during the dry season are catastrophic survival bottlenecks where thousands die, not their preferred home.',
      'A minimum 5-gallon aquarium with a gentle filter and heater is essential for humane long-term welfare.'
    ],
    content: [
      'For decades, retail stores have sold Betta splendens in tiny novelty jars and unheated bowls under the marketing claim that "in nature, bettas live in muddy hoof-prints and shallow puddles." This claims confuses temporary catastrophic drought survival with a healthy natural biotope.',
      'Field studies in the Chao Phraya and Mekong river basins show that wild Bettas inhabit vast, shallow, densely vegetated marshlands, rice paddies, and slow swamp creeks. While the water may only be 6 to 12 inches deep, each individual fish commands a horizontal territory of up to 3 to 5 square feet filled with dense aquatic vegetation (such as Hydrilla, Utricularia, and Salvinia).',
      'The volume of water in their wild territories provides massive dilution for biological waste. In a tiny unheated 0.5-gallon bowl, fish waste (ammonia) accumulates within 24 to 48 hours to toxic concentrations that burn gill tissue and suppress immune responses.',
      'Furthermore, Southeast Asian tropical waters maintain a consistent thermal band of 78°F to 82°F (25.5°C to 27.7°C). Kept in room-temperature bowls (68°F–72°F), a Betta’s metabolism plummets, digestion halts, and they become lethargic, leading keepers to mistakenly believe bettas are naturally inactive.'
    ],
    tags: ['Aquarium Myth', 'Tank Size', 'Habitat', 'Ecology']
  },
  {
    id: 'understanding-the-labyrinth-organ',
    title: 'Understanding the Labyrinth Organ: How Bettas Breathe Atmospheric Air',
    category: 'Anatomy',
    readTime: '6 min read',
    author: 'Marcus Sterling, DVM',
    credentials: 'Board Certified Aquatic Veterinarian',
    reviewDate: 'September 2026',
    summary: 'An exploration of the unique suprabranchial organ that allows anabantoid fish to thrive in low-oxygen tropical backwaters, and why surface access and humidity matter in your tank.',
    keyTakeaways: [
      'The labyrinth organ is an auxiliary breathing structure located above the gills, folded with high vascularization.',
      'Bettas are obligate air breathers: if barred from reaching the water surface, adult Bettas will drown despite having gills.',
      'A sealed aquarium lid keeps the ambient air above the water warm and humid, protecting delicate labyrinth membranes from cold shock.'
    ],
    content: [
      'Belonging to the suborder Anabantoidei, Betta splendens possesses one of nature’s most fascinating evolutionary adaptations: the labyrinth organ. This specialized suprabranchial organ is derived from the first epibranchial bone and features intricate, labyrinthine folds lined with a rich capillary network.',
      'In warm, stagnant Southeast Asian swamps, dissolved oxygen in the water column frequently drops close to 0 mg/L due to decaying vegetation and elevated water temperature. While standard fish would suffocate, Bettas rise to the surface, take a gulp of air, and force it into the labyrinth chamber, where oxygen diffuses directly into the bloodstream.',
      'Crucially, adult Bettas are obligate air breathers. Research confirms that while their conventional gills supply roughly 40% of their metabolic oxygen needs, the labyrinth organ supplies the remaining 60%. If a Betta is trapped under an ornament or mesh and prevented from reaching atmospheric air, it will drown.',
      'This anatomy also explains why aquarium lids are critical: in winter, breathing cold dry room air (below 70°F) directly into a warm 80°F respiratory organ can induce thermal inflammation of the labyrinth lamellae, leading to secondary respiratory infections.'
    ],
    tags: ['Anatomy', 'Physiology', 'Labyrinth Organ', 'Tank Lids']
  },
  {
    id: 'science-of-indian-almond-leaves',
    title: 'The Science of Indian Almond Leaves (Catappa): Tannins & Fish Immunity',
    category: 'Botanicals',
    readTime: '4 min read',
    author: 'Dr. Evelyn Vance, PhD',
    credentials: 'Aquatic Ecologist & Freshwater Teleost Specialist',
    reviewDate: 'October 2026',
    summary: 'Why botanicals and blackwater tannins are not merely decorative, but act as proven physiological buffers, mild antimicrobials, and anti-stress agents.',
    keyTakeaways: [
      'Terminalia catappa leaves release humic acid, tannic acid, and flavonoids.',
      'Tannins mildly lower pH and bind heavy metals, while precipitating bacterial surface proteins.',
      'Blackwater conditions replicate natural wild Betta environments, drastically lowering cortisol (stress hormone) levels.'
    ],
    content: [
      'For generations, traditional Southeast Asian Betta breeders have aged water using dried leaves from the Indian Almond tree (Terminalia catappa). Modern biochemical analysis has validated this time-honored practice.',
      'As dry Catappa leaves steep in aquarium water, they release complex polyphenolic compounds: hydrolyzable tannins, humic acids, and ellagic acid. In natural blackwater streams, these compounds tint the water amber or tea-colored and create an oligotrophic environment hostile to opportunistic pathogens.',
      'Microbiological studies demonstrate that tannic compounds alter the permeability of bacterial cell walls, inhibiting opportunistic pathogens such as Aeromonas hydrophila and saprolegniaceous water molds. While not a substitute for clinical pharmaceuticals in advanced acute infections, Catappa leaf tannins provide a formidable defensive shield for fin tissue regeneration.',
      'Furthermore, the gentle reduction in light penetration caused by the amber tint mimics the sheltered, shaded canopy of wild wetlands, helping high-strung, long-finned varieties feel secure and display richer natural coloration.'
    ],
    tags: ['Botanicals', 'Catappa', 'Tannins', 'Immune Health']
  },
  {
    id: 'stress-stripes-vs-marble-genes',
    title: 'Stress Stripes vs. Natural Marble Gene: Deciphering Betta Color Changes',
    category: 'Behavior',
    readTime: '5 min read',
    author: 'Elena Gomez, MSc',
    credentials: 'Ichthyology & Color Genetics Researcher',
    reviewDate: 'October 2026',
    summary: 'Is your Betta sick or simply expressing transposable genetic elements? How to tell the difference between physiological stress and the famous jumping transposon marble gene.',
    keyTakeaways: [
      'Horizontal pale stripes running head-to-tail indicate severe systemic stress, poor water, or terror.',
      'Vertical bars (breeding bars) in female bettas indicate reproductive readiness, not distress.',
      'The "jumping gene" (transposon) causes marble, koi, and samurai bettas to change colors dramatically over weeks and months as a harmless genetic trait.'
    ],
    content: [
      'Few things cause new Betta keepers more anxiety than seeing their fish change color overnight. Understanding whether the shift is neuro-hormonal (stress) or genetic is essential for proper aquarium management.',
      'Stress Stripes: When a Betta is subjected to cold water, toxic ammonia, transport shock, or aggressive tank mates, neuroendocrine triggers cause melanophores to contract unevenly, revealing two prominent horizontal dark or pale stripes stretching from the snout to the caudal peduncle. This is an urgent warning sign indicating that water parameters, temperature, or tank compatibility must be evaluated immediately.',
      'Marble Genetics: If your vibrant blue-and-white Koi Betta suddenly develops black patches or turns completely solid navy blue over several weeks, you are witnessing the "jumping gene" transposon first isolated by legendary breeder Orville Gulley in the 1970s. These mobile genetic elements hop between chromosomes, switching pigment synthesis on and off throughout the fish’s adult life. This is completely natural, harmless, and one of the most mesmerizing spectacles in fishkeeping.'
    ],
    tags: ['Genetics', 'Stress Stripes', 'Marble Gene', 'Behavior']
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Tank Setup',
    question: 'Why is a 5-gallon tank considered the ethical minimum for a single Betta?',
    answer: 'A 5-gallon tank is the minimum volume required to establish a stable, self-sustaining biological nitrogen cycle. Smaller volumes (1–2 gallons) lack sufficient water mass to buffer against rapid temperature swings and dangerous ammonia spikes from normal daily waste. In addition, 5 gallons provides horizontal swimming room and accommodates an adjustable heater and low-flow sponge filter.'
  },
  {
    id: 'faq-2',
    category: 'Equipment',
    question: 'Do Bettas really need an aquarium heater if my house is warm?',
    answer: 'Yes, absolutely. Bettas are tropical ectotherms that require a stable water temperature between 78°F and 80°F (25.5°C to 26.6°C). Ambient room air is typically 68°F to 72°F, which makes aquarium water several degrees cooler due to evaporative cooling. Chilled water severely suppresses their immune system, halts digestion, and leads to lethal opportunistic infections.'
  },
  {
    id: 'faq-3',
    category: 'Health',
    question: 'Why should I never use "Bettafix" or tea tree oil remedies for my Betta?',
    answer: 'Bettafix and similar products contain low concentrations of Melaleuca (tea tree oil). Because essential oils are hydrophobic, they form an invisible microscopic film across the water surface. As Bettas surface to inhale air with their labyrinth organ, the oil coats the delicate respiratory lamellae, causing chemical irritation, gasping, and documented cases of suffocation in anabantoid fish.'
  },
  {
    id: 'faq-4',
    category: 'Nutrition',
    question: 'Can I feed my Betta cooked green peas if it looks bloated?',
    answer: 'No. Unlike herbivorous goldfish, Betta splendens are obligate insectivores and carnivores. Their short gastrointestinal tract lacks the cellulase enzymes required to break down dense plant fiber, meaning peas can worsen impactions. The safe, evidence-based remedy for Betta constipation is 24–48 hours of fasting followed by thawed frozen Daphnia (water fleas), whose chitinous exoskeletons act as a gentle natural laxative.'
  },
  {
    id: 'faq-5',
    category: 'Behavior',
    question: 'My Betta is making clusters of bubbles at the water surface. Does this mean it is happy?',
    answer: 'Bubble nests are built by sexually mature male Bettas in response to instinctual breeding impulses. While it does indicate the water is still enough for bubbles to hold together and the fish is not acutely incapacitated, bubble nesting is an instinctive reproductive behavior, not an absolute barometer of happiness or water safety. Always test water parameters with a liquid test kit rather than relying on bubble nests.'
  },
  {
    id: 'faq-6',
    category: 'Tank Mates',
    question: 'Can two female Bettas live together peacefully?',
    answer: 'No. While female Betta "sororities" are popularized on social media, scientific observation confirms they are extraordinarily high-stress environments. Domesticated female Bettas still possess strong territorial hierarchies, leading to chronic sub-clinical stress, suppressed immune function, and sudden aggressive attacks. Female Bettas thrive best when housed singly.'
  },
  {
    id: 'faq-7',
    category: 'Water Chemistry',
    question: 'How often should I change the water in a cycled 5-gallon Betta tank?',
    answer: 'In an established, cycled 5-gallon tank with a filter, perform a 20% to 25% water change once every 7 days using a gravel siphon to remove substrate waste. Always match the temperature of the new water and add a high-quality dechlorinator (such as Seachem Prime) before adding it to the tank.'
  },
  {
    id: 'faq-8',
    category: 'Health',
    question: 'How do I tell the difference between Ich and Velvet?',
    answer: 'Ich presents as distinct, individual white nodules that look like grains of coarse kosher salt scattered on the fins and body. Velvet presents as a microscopic, ultra-fine yellowish-gold or copper dust that covers the fish like a velvet cloth. Velvet is best spotted by turning off room lights and shining a direct LED flashlight beam across the fish in a dark room.'
  }
];
