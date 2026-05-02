# MedWise Legacy Logic — Knowledge Base for LLM Rebuild

## Bot Identity
- Name: MedWise
- Purpose: Symptom-based medicine recommendation
- Treatment tracks: Allopathic, Homeopathic, Ayurvedic

## Core Conversation Flow (how the old bot worked)
1. User greets or asks about medicines
2. Bot asks: what condition? (cold, cough, diarrhea, headache, etc.)
3. Bot asks: which treatment track? (allopathic / homeopathic / ayurvedic)
4. For Allopathic Cold specifically: bot asks duration (recently / few days / last month)
5. For duration-based: bot asks weight bracket
6. Bot returns specific medicine + dosage + duration

## NEW FLOW (LLM version — collect upfront via intake form)
- Collect at start: Age, Weight (kg), Treatment Preference
- Then ask about symptoms naturally
- Use age + weight + preference + symptom + duration to recommend

---

## ALLOPATHIC MEDICINES

### Cold — Recent onset
- Weight under 30kg: Cetzine Cold Tablet, twice daily after meal, 2-3 days
- Weight under 60kg: Coldant Tablet, twice daily after meal, 4-6 days
- Weight under 100kg: Dolo Cold Tablet, twice daily after meal, 4-10 days

### Cold — Since few days
- Weight till 40kg: Safexim Tablet, twice daily after meal, 5 days
- Weight till 70kg: Addelo Cold Tablet, twice daily after meal, 7 days
- Weight till 100kg: Ciplenza Tablet, twice daily after meal, 7 days

### Cold — Since last month
- Do NOT recommend medicine. Tell user to visit a doctor immediately.

### Cough (Allopathic)
- Home remedies first: Honey (2 tsp in warm water), Ginger tea, fluids
- Medicine: Koflet Cough Syrup
- If persists beyond 5 days: refer to doctor

### Diarrhea
- Hydrate with electrolytes (sodium, chloride)
- Avoid dairy products
- Medicine: Loperamide (Imodium) or Bismuth subsalicylate (Pepto-Bismol / Kaopectate)
- If lasts more than 2 days: seek medical advice immediately

### Headache (mild only)
- Ibuprofen (Advil, Motrin) or Acetaminophen (Tylenol) or Aspirin
- WARNING: No ibuprofen/NSAIDs for heart failure or kidney failure patients
- WARNING: No aspirin for children under 18

### Fever (mild only)
- Drink plenty of fluids, lightweight clothing
- Acetaminophen (Tylenol) or Ibuprofen (Advil, Motrin IB)
- If fever lasts more than 5 days: seek medical help immediately

### Sore Throat
- Rest and fluids
- Steam inhalation (5-10 mins, several times daily)
- Warm tea with honey (not for children under 12 months)
- Chicken broth

### Heat Stroke
- EMERGENCY — recommend calling emergency services first
- Cool body with cold water sponging/spraying
- Fan the person
- Watch for seizure, unconsciousness, breathing difficulty
- ORSL Rehydrate once person is conscious

### Abrasions
- Wash hands, clean wound with cool water and mild soap
- Remove particles with sterilized tweezers
- Apply Bacitracin or Aquaphor ointment
- Cover with bandage, change daily
- Watch for infection signs — see doctor if infected

### Stings
- Remove stinger immediately (credit card scrape method)
- Ice pack: 20 mins per hour
- Antihistamine: Diphenhydramine (Benadryl) or Loratadine (Claritin)
- Pain relief: Acetaminophen (Tylenol) or Ibuprofen (Motrin)
- Wash site with soap and water
- Hydrocortisone cream for redness/itch/swelling

### Eye Injury
- DO NOT rub the eye
- Blink several times to flush with tears
- Lift upper eyelid over lower lashes to brush particle
- Flush with eyewash, saline, or running tap water
- See doctor if pain persists

### Insect Bites
- Wash with soap and water
- Cold compress or ice pack for 10+ minutes
- Elevate affected area to reduce swelling

### Fainting
- Lie down or sit down immediately
- Place head between knees if sitting
- Lay person on back, raise legs 12 inches above heart level
- Loosen tight clothing (belts, collars)
- Do NOT get up too quickly after recovery

---

## HOMEOPATHIC MEDICINES

### Cold — Started today (recent)
- Boiron Pulsatilla Pellets (weight-independent)
- Dosage: 1 pellet after 30 mins of meal, minimum 4 days, continue until relief

### Cold — Since long time
- Dr. Reckeweg Pulsatilla Dilution
- Dosage: 6ml after 30-40 mins of meal, twice daily

### Cold (general options from CPE file)
- Allium cepa, Arsenicum album, Belladonna, Euphrasia, Natrum muriaticum

### Cough
- Bryonia, Phosphorus, Pulsatilla, Rumex crispus
- Many options available — recommend consulting a homeopathic practitioner

---

## AYURVEDIC MEDICINES

### Cold
- Astragalus: activates immune cells, follow bottle dosage
- Ginger and Tulsi tea: relieves blocked nose, heals internally
- Also: Tulsi, Honey, Mulethi, Pippali, Cinnamon

### Cough
- Honey: 2 tsp in warm water or herbal tea, once or twice daily until recovery
- Ginger tea: 20-40g fresh ginger in hot water, steep few minutes, add honey/lemon
- Koflet Cough Syrup (also works for ayurvedic track)
- Also: Tulsi, Mulethi, Giloy, Sonth

---

## EMERGENCY CONDITIONS — NEVER RECOMMEND MEDICINE
Always tell user to call emergency services or go to hospital immediately for:
- Heat stroke with seizure or unconsciousness
- Chest pain
- Difficulty breathing (severe)
- Stroke symptoms
- Any condition lasting significantly beyond normal duration

## CONDITIONS NOT COVERED
For anything not listed above, tell the user:
"This is beyond what I can safely recommend. Please consult a doctor."

## DISCLAIMER (always show)
"These recommendations are for informational purposes only and are not a 
substitute for professional medical advice, diagnosis, or treatment. 
Always consult a qualified healthcare provider before taking any medicine."
