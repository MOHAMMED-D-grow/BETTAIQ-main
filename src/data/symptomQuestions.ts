export interface SymptomOption {
  id: string;
  label: string;
  description: string;
  severityWeight: number; // 1 to 5
  associatedConditions: string[];
}

export interface QuestionStep {
  stepNumber: number;
  title: string;
  prompt: string;
  helpText: string;
  options: SymptomOption[];
}

export const QUESTIONNAIRE_STEPS: QuestionStep[] = [
  {
    stepNumber: 1,
    title: 'Visible Physical Characteristics',
    prompt: 'What unusual physical signs or markings do you observe on the fish’s body or fins?',
    helpText: 'Select all that clearly apply. Look closely with adequate lighting.',
    options: [
      {
        id: 'frayed-fins',
        label: 'Ragged, torn, or disintegrating fin edges',
        description: 'Fins look frayed, melted, or have black/red margins at edges.',
        severityWeight: 2,
        associatedConditions: ['fin-rot']
      },
      {
        id: 'white-salt-spots',
        label: 'Distinct white grains (like coarse salt)',
        description: 'Small individual white specks scattered over fins and body.',
        severityWeight: 3,
        associatedConditions: ['ich']
      },
      {
        id: 'gold-velvet-dust',
        label: 'Fine yellowish-gold or copper dust',
        description: 'Microscopic dusting visible under flashlight beam in dark room.',
        severityWeight: 4,
        associatedConditions: ['velvet']
      },
      {
        id: 'pineconing-scales',
        label: 'Scales sticking outward like a pinecone',
        description: 'Best seen looking straight down from above; body looks prickly.',
        severityWeight: 5,
        associatedConditions: ['dropsy']
      },
      {
        id: 'protruding-eye',
        label: 'One or both eyes bulging or cloudy',
        description: 'Eye socket noticeably swollen outward from skull.',
        severityWeight: 3,
        associatedConditions: ['popeye', 'dropsy']
      },
      {
        id: 'cotton-mouth-tufts',
        label: 'Cottony white or pale gray tufts around mouth / saddle',
        description: 'Fuzzy or flat grayish patch around snout or dorsal ridge.',
        severityWeight: 5,
        associatedConditions: ['columnaris']
      },
      {
        id: 'distended-belly',
        label: 'Swollen, rounded, or enlarged abdomen',
        description: 'Abdomen visibly bloated directly under stomach/vent area.',
        severityWeight: 3,
        associatedConditions: ['swim-bladder', 'dropsy']
      }
    ]
  },
  {
    stepNumber: 2,
    title: 'Behavior & Swimming Locomotion',
    prompt: 'How is your Betta swimming and behaving in the water column?',
    helpText: 'Observe for 2 to 3 minutes without disturbing the aquarium.',
    options: [
      {
        id: 'floating-uncontrollably',
        label: 'Floating involuntarily at surface or stuck at bottom',
        description: 'Cannot regulate buoyancy; tilts sideways or struggles to stay upright.',
        severityWeight: 3,
        associatedConditions: ['swim-bladder']
      },
      {
        id: 'scratching-flashing',
        label: 'Flashing: Darting and rubbing against substrate or decor',
        description: 'Violent scratching motions attempting to dislodge skin irritants.',
        severityWeight: 3,
        associatedConditions: ['ich', 'velvet']
      },
      {
        id: 'gasping-at-surface',
        label: 'Continuous surface gasping or rapid gill pumping',
        description: 'Operculum moving rapidly; hovering near air-water interface.',
        severityWeight: 4,
        associatedConditions: ['velvet', 'columnaris']
      },
      {
        id: 'severe-lethargy',
        label: 'Lethargic: Laying motionless on bottom or wedged in decor',
        description: 'Refuses to swim or explore; clamped fins tucked tight against body.',
        severityWeight: 3,
        associatedConditions: ['fin-rot', 'dropsy', 'velvet', 'columnaris']
      },
      {
        id: 'normal-swimming',
        label: 'Swimming normally with curiosity and upright posture',
        description: 'No apparent buoyancy issues or agitation.',
        severityWeight: 0,
        associatedConditions: []
      }
    ]
  },
  {
    stepNumber: 3,
    title: 'Feeding & Digestive Health',
    prompt: 'What is your Betta’s appetite and digestive response?',
    helpText: 'Consider recent feedings over the past 24–48 hours.',
    options: [
      {
        id: 'refusing-all-food',
        label: 'Completely refusing all food for >24 hours',
        description: 'Ignores pellets, frozen bloodworms, or live food.',
        severityWeight: 3,
        associatedConditions: ['dropsy', 'columnaris', 'velvet']
      },
      {
        id: 'spitting-out-food',
        label: 'Tasting food then repeatedly spitting it back out',
        description: 'Shows interest but cannot chew or swallow comfortably.',
        severityWeight: 2,
        associatedConditions: ['columnaris', 'swim-bladder']
      },
      {
        id: 'pale-stringy-feces',
        label: 'Long, pale, white or clear stringy feces trailing',
        description: 'Indicates intestinal inflammation or internal flagellate burden.',
        severityWeight: 3,
        associatedConditions: ['dropsy']
      },
      {
        id: 'normal-appetite',
        label: 'Eager appetite; swims to front glass expecting food',
        description: 'Consumes food within 15 seconds.',
        severityWeight: 0,
        associatedConditions: []
      }
    ]
  },
  {
    stepNumber: 4,
    title: 'Aquarium Environment & Water Quality',
    prompt: 'Tell us about the aquarium environment and water parameters.',
    helpText: 'Water quality is responsible for over 80% of freshwater ornamental fish illnesses.',
    options: [
      {
        id: 'tank-under-5-gal',
        label: 'Tank size is under 5 gallons (bowl, vase, or micro-tank)',
        description: 'Higher susceptibility to rapid toxic ammonia spikes and temperature instability.',
        severityWeight: 3,
        associatedConditions: ['fin-rot', 'dropsy']
      },
      {
        id: 'unheated-tank',
        label: 'Water temperature is below 76°F (24.4°C) or unheated',
        description: 'Cold water halts digestion and severely impairs teleost immune response.',
        severityWeight: 4,
        associatedConditions: ['swim-bladder', 'fin-rot', 'ich']
      },
      {
        id: 'uncycled-or-ammonia-present',
        label: 'Aquarium is not fully cycled, or Ammonia / Nitrite > 0 ppm',
        description: 'Toxic nitrogen compounds burning gill membranes and fin tissue.',
        severityWeight: 4,
        associatedConditions: ['fin-rot', 'dropsy', 'popeye']
      },
      {
        id: 'recent-addition-no-quarantine',
        label: 'New fish, live plant, or snail added recently without quarantine',
        description: 'High risk of introduced viral, bacterial, or protozoan pathogens.',
        severityWeight: 3,
        associatedConditions: ['ich', 'velvet', 'columnaris']
      },
      {
        id: 'stable-cycled-tank',
        label: 'Fully cycled 5+ gallon tank with heater (78–80°F) and 0 Ammonia/Nitrite',
        description: 'Optimal baseline environmental parameters.',
        severityWeight: 0,
        associatedConditions: []
      }
    ]
  }
];

export interface TriageResult {
  urgency: 'Critical Emergency' | 'High Urgency' | 'Moderate Attention' | 'Preventive / Low Concern';
  urgencyDescription: string;
  matchedConditions: {
    conditionId: string;
    conditionName: string;
    confidenceScore: number; // 0 to 100%
    category: string;
    keyMatchReasons: string[];
  }[];
  immediateActions: string[];
  criticalWarnings: string[];
  vetReferralCriteria: string[];
}

export function evaluateSymptoms(selectedOptionIds: string[]): TriageResult {
  // Score tally by condition
  const conditionHits: Record<string, { count: number; weight: number; reasons: string[] }> = {
    'fin-rot': { count: 0, weight: 0, reasons: [] },
    'ich': { count: 0, weight: 0, reasons: [] },
    'velvet': { count: 0, weight: 0, reasons: [] },
    'swim-bladder': { count: 0, weight: 0, reasons: [] },
    'dropsy': { count: 0, weight: 0, reasons: [] },
    'columnaris': { count: 0, weight: 0, reasons: [] },
    'popeye': { count: 0, weight: 0, reasons: [] }
  };

  let maxSeverityWeight = 0;
  let totalWeight = 0;

  // Scan questionnaire steps
  for (const step of QUESTIONNAIRE_STEPS) {
    for (const opt of step.options) {
      if (selectedOptionIds.includes(opt.id)) {
        totalWeight += opt.severityWeight;
        if (opt.severityWeight > maxSeverityWeight) {
          maxSeverityWeight = opt.severityWeight;
        }

        for (const condId of opt.associatedConditions) {
          if (conditionHits[condId]) {
            conditionHits[condId].count += 1;
            conditionHits[condId].weight += opt.severityWeight;
            conditionHits[condId].reasons.push(opt.label);
          }
        }
      }
    }
  }

  // Determine Urgency
  let urgency: TriageResult['urgency'] = 'Preventive / Low Concern';
  let urgencyDescription = 'Symptoms appear mild or localized. Immediate attention to pristine water quality and close observation is recommended.';

  if (selectedOptionIds.includes('pineconing-scales') || selectedOptionIds.includes('cotton-mouth-tufts') || maxSeverityWeight >= 5) {
    urgency = 'Critical Emergency';
    urgencyDescription = 'Immediate intervention required. The reported symptoms (such as pineconing or acute saddleback lesions) indicate life-threatening infection or severe osmoregulatory distress.';
  } else if (maxSeverityWeight >= 4 || totalWeight >= 9) {
    urgency = 'High Urgency';
    urgencyDescription = 'High risk condition detected. Pathogen progression or environmental stress requires prompt quarantine and targeted supportive care within 12–24 hours.';
  } else if (maxSeverityWeight >= 2 || totalWeight >= 4) {
    urgency = 'Moderate Attention';
    urgencyDescription = 'Notable distress symptoms detected. Water parameter corrections and supportive botanical care are warranted today.';
  }

  const nameMap: Record<string, { name: string; category: string }> = {
    'fin-rot': { name: 'Fin & Tail Rot', category: 'Bacterial / Environmental' },
    'ich': { name: 'Ich (White Spot Disease)', category: 'Parasitic' },
    'velvet': { name: 'Velvet (Gold Dust Disease)', category: 'Parasitic' },
    'swim-bladder': { name: 'Swim Bladder Disorder', category: 'Digestive / Hydrostatic' },
    'dropsy': { name: 'Dropsy (Fluid Retention / Ascites)', category: 'Systemic / Renal' },
    'columnaris': { name: 'Columnaris (Cotton Mouth / Saddleback)', category: 'Bacterial' },
    'popeye': { name: 'Popeye (Exophthalmia)', category: 'Bacterial / Trauma' }
  };

  // Calculate percentage confidence
  const matched = Object.entries(conditionHits)
    .filter(([_, data]) => data.count > 0)
    .map(([id, data]) => {
      // Calculate normalized score based on match count and weight
      const score = Math.min(95, Math.round((data.weight * 18) + (data.count * 12)));
      return {
        conditionId: id,
        conditionName: nameMap[id]?.name || id,
        confidenceScore: score,
        category: nameMap[id]?.category || 'General',
        keyMatchReasons: data.reasons
      };
    })
    .sort((a, b) => b.confidenceScore - a.confidenceScore);

  // Generate immediate actions
  const immediateActions: string[] = [
    'Test water immediately using a liquid reagent test kit for Ammonia, Nitrite, Nitrate, and pH.',
    'Perform a 25% – 30% temperature-matched, dechlorinated water change to reduce pathogens and toxins.'
  ];

  if (selectedOptionIds.includes('unheated-tank')) {
    immediateActions.push('Gradually stabilize water temperature between 78°F – 80°F (raise no faster than 1°F every 2–3 hours).');
  }

  if (selectedOptionIds.includes('pineconing-scales') || selectedOptionIds.includes('distended-belly')) {
    immediateActions.push('Prepare a dedicated bare-bottom hospital tank with gentle aeration and pure Epsom salt (1 tsp/gal) to ease fluid pressure.');
  }

  if (selectedOptionIds.includes('white-salt-spots')) {
    immediateActions.push('Siphon the substrate thoroughly to remove encysted parasites before they hatch into free-swimming theronts.');
  }

  if (selectedOptionIds.includes('gold-velvet-dust')) {
    immediateActions.push('Black out the aquarium: turn off tank lighting and cover with a dark cloth, as velvet parasites rely partly on photosynthesis.');
  }

  if (selectedOptionIds.includes('frayed-fins')) {
    immediateActions.push('Add rinsed Indian Almond Leaves (Catappa) to gently release protective tannins and humic acids.');
  }

  // Warnings
  const criticalWarnings: string[] = [
    'DO NOT use commercial "Fix" products containing tea tree oil (Melaleuca / Bettafix); volatile oils coat the labyrinth organ and impair atmospheric breathing.',
    'DO NOT dose antibiotics directly into the main established aquarium; it wipes out beneficial nitrifying filter bacteria and causes lethal ammonia spikes.'
  ];

  if (selectedOptionIds.includes('cotton-mouth-tufts')) {
    criticalWarnings.push('CRITICAL: DO NOT raise water temperature if Columnaris is suspected; heat dramatically accelerates Flavobacterium reproduction.');
  }

  if (selectedOptionIds.includes('pineconing-scales')) {
    criticalWarnings.push('DO NOT use standard sodium chloride (Aquarium Salt) for Dropsy; sodium ions promote fluid retention in failing kidneys. Use Epsom Salt (Magnesium Sulfate).');
  }

  // Vet triggers
  const vetReferralCriteria: string[] = [
    'Outward scale protrusion (pineconing) visible from above.',
    'Rapidly spreading whitish/gray lesions across mouth or dorsal saddle within 24 hours.',
    'Complete inability to surface for air, severe spinal curvature, or unresponsiveness.',
    'Lack of clinical improvement after 5–7 days of proper water remediation and supportive care.'
  ];

  return {
    urgency,
    urgencyDescription,
    matchedConditions: matched,
    immediateActions,
    criticalWarnings,
    vetReferralCriteria
  };
}
