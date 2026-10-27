import { ContractAnalysis } from '@/types/contract';

export const SAMPLE_RENTAL_CONTRACT_TEXT = `RESIDENTIAL LEASE AGREEMENT (FICTIONAL DEMO)

This Residential Lease Agreement ("Agreement") is executed on 1st November 2024 at Bengaluru, Karnataka, India by and between:

LESSOR / LANDLORD:
Mrs. Sunita Verma, residing at No. 42, 10th Main, HAL 2nd Stage, Indiranagar, Bengaluru - 560038, Karnataka (hereinafter referred to as the "LESSOR", which expression shall include her legal heirs, executors, and assigns) of the ONE PART;

AND

LESSEE / TENANT:
Mr. Rahul Sen, son of Amit Sen, currently residing at Flat 302, Green Glen Layout, Bellandur, Bengaluru - 560103, Karnataka (hereinafter referred to as the "LESSEE", which expression shall include his successors) of the OTHER PART.

WHEREAS the Lessor is the absolute owner of the residential flat bearing Unit No. 402, 4th Floor, "Silver Oak Apartments", 80 Feet Road, Indiranagar, Bengaluru - 560038, comprising 2 Bedrooms, Hall, Kitchen, measuring approximately 1,200 sq. ft. (hereinafter referred to as the "Scheduled Premises").

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. TERM AND TENURE
The lease shall be for an initial period of 11 (Eleven) months commencing from 1st November 2024 to 30th September 2025. Any renewal shall be solely at the Lessor's discretion, subject to a mandatory minimum rent escalation of 12% (twelve percent) per annum over the prevailing monthly rent.

2. MONTHLY RENT AND UTILITY CHARGES
The Lessee shall pay a monthly rent of INR 35,000/- (Rupees Thirty-Five Thousand only), payable in advance on or before the 5th day of every English calendar month via electronic bank transfer. Delay in rent payment shall attract penal interest at 18% per annum calculated on a daily pro-rata basis. Maintenance charges of INR 4,500/- per month shall be paid directly by the Lessee to the Apartment Owners Association.

3. INTEREST-FREE SECURITY DEPOSIT & MANDATORY DEDUCTION
The Lessee has deposited a sum of INR 3,50,000/- (Rupees Three Lakhs Fifty Thousand only), equivalent to ten months' rent, as interest-free refundable security deposit with the Lessor upon signing of this Agreement.
Upon termination or expiry of the lease, the Lessor shall refund the deposit within 45 days after the Lessee delivers vacant possession.
PROVIDED ALWAYS that the Lessor shall automatically deduct one full month's rent (INR 35,000/-) from the security deposit towards professional deep cleaning and painting charges, irrespective of the actual condition of the walls or duration of stay, and without any obligation to provide receipts or vendor invoices.

4. LOCK-IN PERIOD AND FORFEITURE
Both parties agree to a strict Lock-in Period of 6 (six) months from the commencement date. If the Lessee vacates or terminates this Agreement before the expiry of the Lock-in Period for any reason whatsoever:
(a) The Lessee shall remain liable to pay the rent for the entire remaining unexpired duration of the Lock-in Period; and
(b) The entire security deposit of INR 3,50,000/- shall stand forfeited by the Lessor as liquidated damages.

5. TERMINATION AND NOTICE PERIOD
After the expiry of the Lock-in Period:
(a) The Lessee may terminate this Agreement only by providing 3 (three) calendar months' advance written notice, or 3 months' rent in lieu thereof.
(b) The Lessor may terminate this Agreement by providing 15 (fifteen) calendar days' written notice to the Lessee for any reason or without assigning any reason.

6. MAINTENANCE, STRUCTURAL REPAIRS & RESTORATION
The Lessee shall maintain the Scheduled Premises in good order. The Lessee shall be solely responsible for all repairs, whether minor fixtures or major structural defects, plumbing, seepage, electrical wiring, and building facade damages occurring during the tenancy, regardless of whether caused by normal wear and tear, age of the building, or force majeure events.

7. LESSOR'S UNRESTRICTED RIGHT OF INSPECTION AND ENTRY
The Lessor, her family members, agents, or prospective buyers/tenants shall have the unfettered right to enter, inspect, and show the Scheduled Premises at any time of day or night without prior notice or appointment, and the Lessee shall ensure immediate access.

8. INDEMNITY AND LEGAL EXPENSES
The Lessee shall fully indemnify and hold harmless the Lessor against all claims, liabilities, losses, costs, and attorney's fees incurred by the Lessor arising out of any dispute relating to the tenancy, including disputes initiated by the Lessee challenging any terms of this Agreement.

9. GOVERNING LAW AND EXCLUSIVE JURISDICTION
This Agreement shall be governed by the laws of India. Any disputes arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka only.

IN WITNESS WHEREOF the parties hereto have set their hands on the day, month, and year first above written.

Lessor: [Signed] Sunita Verma
Lessee: [Signed] Rahul Sen
Witness 1: [Signed] Vikram Rao, Bengaluru
Witness 2: [Signed] Anita Nair, Bengaluru`;

export const SAMPLE_EMPLOYMENT_CONTRACT_TEXT = `EMPLOYMENT AND TRAINING BOND AGREEMENT (FICTIONAL DEMO)

This Employment Agreement is entered into on 15th July 2024 between:
NexaTech Solutions Pvt. Ltd., a company registered under the Companies Act 2013, having its office at Cyber City, Gurugram, Haryana ("Company");
AND
Ananya Sharma, residing at Sector 45, Noida, Uttar Pradesh ("Employee").

1. DESIGNATION & PROBATION
The Employee is appointed as Associate Software Engineer. The Employee shall serve an initial probationary period of 6 months. The Company reserves the right to extend the probation at its sole discretion.

2. COMPENSATION & DEDUCTIONS
Fixed CTC: INR 6,50,000/- per annum. TDS and applicable statutory deductions shall apply. The Company reserves the right to withhold monthly salary payments if quarterly KPIs are not met.

3. EMPLOYMENT TRAINING BOND & RECOVERY
The Company will provide onboarding training. The Employee agrees to serve the Company for a minimum mandatory period of 24 (twenty-four) months from the joining date ("Bond Period").
If the Employee resigns, abandons service, or is terminated for cause prior to completing 24 months, the Employee shall unconditionally pay to the Company a fixed sum of INR 3,00,000/- (Rupees Three Lakhs) as training cost recovery, irrespective of actual training expenditure incurred. The Company shall be entitled to withhold the Employee's educational certificates and experience letter until this sum is paid in full.

4. NOTICE PERIOD
The Employee must provide 90 (ninety) calendar days' written notice to resign. Buyout of notice period is strictly at the Company's sole discretion. The Company may terminate the Employee's employment immediately without notice or cause during probation.

5. NON-COMPETE AND RESTRAINT OF TRADE
The Employee agrees that during employment and for a period of 2 (two) years following termination or resignation from the Company, the Employee shall not work for, consult with, or engage directly or indirectly with any company, client, competitor, or firm engaged in similar software development business anywhere in India.

6. INTELLECTUAL PROPERTY ASSIGNMENT
All inventions, software, code, designs, and ideas conceived, developed, or reduced to practice by the Employee, whether during working hours or on personal time, using personal equipment or Company resources, shall immediately and irrevocably belong exclusively to the Company.

7. GOVERNING LAW AND JURISDICTION
This Agreement shall be governed by the laws of India. Courts at Gurugram, Haryana shall have exclusive jurisdiction.`;


export const SAMPLE_CONTRACT_ANALYSIS: ContractAnalysis = {
  id: 'sample-rental-agreement',
  title: 'Residential Lease Agreement — Bengaluru (Fictional Sample)',
  documentType: 'rental',
  jurisdiction: 'Bengaluru, Karnataka (India)',
  analyzedAt: '2024-11-01T10:00:00.000Z',
  isSample: true,
  wordCount: 785,
  executiveSummary: {
    overview:
      'This is an 11-month residential tenancy agreement for an apartment in Indiranagar, Bengaluru. While standard in format, it contains several heavily one-sided clauses favoring the landlord, including a 10-month security deposit with an automatic painting deduction, an aggressive lock-in forfeiture clause, asymmetric termination notice periods (3 months vs. 15 days), and unrestricted landlord entry rights.',
    partiesIdentified: [
      'Lessor (Landlord): Mrs. Sunita Verma',
      'Lessee (Tenant): Mr. Rahul Sen',
    ],
    apparentPurpose: 'Residential lease of Unit No. 402, Silver Oak Apartments, Indiranagar, Bengaluru.',
    primaryObligations: [
      'Tenant must pay monthly rent of ₹35,000 on or before the 5th of each month, plus ₹4,500 maintenance.',
      'Tenant has provided ₹3,50,000 (10 months rent) as interest-free security deposit.',
      'Tenant must honor a 6-month lock-in period and provide 3 months notice to terminate thereafter.',
      'Tenant is burdened with all repairs including major structural defects and building seepage.',
    ],
    keyLimitationsOrMissingInfo: [
      'Inventory of fixtures, electrical fittings, and pre-existing wall defects is not annexed.',
      'No definition of acceptable ordinary wear-and-tear.',
      'Security deposit refund turnaround of 45 days is lengthy compared to market standard (7-15 days).',
      'No provision for force majeure / uninhabitable conditions due to monsoon flooding or municipal failure.',
    ],
  },
  keyTerms: {
    financialTerms: {
      rentOrCompensation: '₹35,000 per month (payable by the 5th)',
      securityDeposit: '₹3,50,000 (10 months rent) — interest-free',
      paymentSchedule: 'Monthly in advance; ₹4,500 monthly society maintenance extra',
      lateFeesOrPenalties: '18% per annum penal interest calculated daily for late rent payment',
    },
    durationAndDates: {
      termDuration: '11 (Eleven) months',
      startDate: '1st November 2024',
      endDate: '30th September 2025',
      lockInPeriod: '6 (six) months mandatory lock-in',
    },
    terminationAndRenewal: {
      noticePeriod: 'Asymmetric: 3 months for Tenant vs. 15 days for Landlord',
      renewalProvisions: 'At Lessor discretion with mandatory minimum 12% annual rent escalation',
      earlyTerminationTerms: 'During lock-in: Remaining rent due AND complete deposit of ₹3,50,000 forfeited',
    },
    covenantsAndLiability: {
      confidentialityObligations: 'Not specified in this agreement',
      ipOwnership: 'Not applicable for residential lease',
      liabilityAndIndemnification: 'Unilateral: Tenant indemnifies Landlord against all claims and legal expenses including disputes brought by Tenant',
      disputeResolutionAndJurisdiction: 'Exclusive jurisdiction of civil courts in Bengaluru, Karnataka',
    },
  },
  findings: [
    {
      id: 'fnd-001',
      clauseTitle: 'Automatic Non-Refundable One Month Rent Deduction for Painting',
      riskCategory: 'high',
      exactExcerpt:
        'PROVIDED ALWAYS that the Lessor shall automatically deduct one full month\'s rent (INR 35,000/-) from the security deposit towards professional deep cleaning and painting charges, irrespective of the actual condition of the walls or duration of stay, and without any obligation to provide receipts or vendor invoices.',
      location: 'Clause 3 (Security Deposit)',
      plainEnglishExplanation:
        'The landlord guarantees deducting ₹35,000 from your security deposit when you move out, even if you left the apartment spotless and lived there for only a short period.',
      whyItMatters:
        'In Indian rental practice, painting deductions are common, but mandatory fixed deductions without invoices or proof of damage unfairly penalize tenants who maintain the premises cleanly.',
      potentialPracticalConsequence:
        'You will permanently lose ₹35,000 upon vacating, even if the walls have zero scuffs and you repainted them yourself before leaving.',
      suggestedActionOrQuestion:
        'Propose changing this to: "Painting/cleaning deductions shall be based on actual quotes and invoices, only if the premises are not returned in the same condition as received (reasonable wear and tear excepted), with tenant having the first option to repaint independently."',
      suggestedAlternativeWording:
        'Upon vacating, the Lessee shall hand over the Scheduled Premises in the same painted condition as received, reasonable wear and tear excepted. If painting is mutually deemed necessary by both parties, the Lessee shall have the primary option to hire an authorized contractor, or reimburse the Lessor based on actual competitive vendor estimates with GST invoices, capped at a maximum of INR 15,000/-.',
      alternativeWordingTradeOff:
        'Landlord receives financial protection against genuine wall damage, while tenant avoids an unconditional ₹35,000 deduction windfall.',
      confidenceLevel: 'high',
    },
    {
      id: 'fnd-002',
      clauseTitle: 'Severe Double Penalty on Early Exit During Lock-in',
      riskCategory: 'high',
      exactExcerpt:
        'If the Lessee vacates or terminates this Agreement before the expiry of the Lock-in Period for any reason whatsoever: (a) The Lessee shall remain liable to pay the rent for the entire remaining unexpired duration of the Lock-in Period; and (b) The entire security deposit of INR 3,50,000/- shall stand forfeited by the Lessor as liquidated damages.',
      location: 'Clause 4 (Lock-in Period)',
      plainEnglishExplanation:
        'If you must leave within the first 6 months (e.g. job relocation, medical emergency), you lose both your entire ₹3,50,000 deposit AND must still pay rent for the remaining lock-in months.',
      whyItMatters:
        'Under Section 74 of the Indian Contract Act 1872, liquidated damages must be a reasonable estimate of actual loss, not an arbitrary double penalty. Demanding both remaining rent and full deposit forfeiture is punitive.',
      potentialPracticalConsequence:
        'If you vacate after 2 months due to a job transfer, you would lose ₹3,50,000 plus be billed ₹1,40,000 (4 months rent) — a total liability of ₹4,90,000 for a ₹35,000/month flat.',
      suggestedActionOrQuestion:
        'Negotiate an early exit carve-out for unforeseen job transfers or medical emergencies with 1 month notice, and limit liquidated damages strictly to 1 month rent if landlord is unable to find a replacement tenant.',
      suggestedAlternativeWording:
        'Both parties agree to a lock-in period of 6 months. In the event the Lessee vacates prior to the expiry of the lock-in period due to unforeseen employment relocation or personal exigency, the Lessee shall provide 1 month advance notice and the Lessor may retain an amount equivalent to 1 (one) month rent as pre-estimated liquidated damages, following which the remaining security deposit shall be refunded in full within 15 days.',
      alternativeWordingTradeOff:
        'Compensates landlord for 1 month of re-letting vacancy while eliminating punitive double-recovery liability for the tenant.',
      confidenceLevel: 'high',
    },
    {
      id: 'fnd-003',
      clauseTitle: 'Extreme Asymmetry in Termination Notice Periods',
      riskCategory: 'high',
      exactExcerpt:
        '(a) The Lessee may terminate this Agreement only by providing 3 (three) calendar months\' advance written notice, or 3 months\' rent in lieu thereof. (b) The Lessor may terminate this Agreement by providing 15 (fifteen) calendar days\' written notice to the Lessee for any reason or without assigning any reason.',
      location: 'Clause 5 (Termination)',
      plainEnglishExplanation:
        'The tenant is locked into giving 3 full months of notice (or paying 3 months rent), whereas the landlord can evict you with only 15 days notice without giving any reason.',
      whyItMatters:
        'A 15-day notice period creates acute housing insecurity. Finding a new home, arranging moving logistics, and recovering a deposit within 15 days is virtually impossible in metro cities like Bengaluru.',
      potentialPracticalConsequence:
        'You could face eviction in 15 days on arbitrary grounds, while if you need to relocate, you are forced to pay ₹1,05,000 in notice-period rent.',
      suggestedActionOrQuestion:
        'Insist on parity: 1 month (or 2 months) mutual notice period for both parties, with the landlord only permitted to terminate early for material default (such as non-payment of rent for 2 consecutive months).',
      suggestedAlternativeWording:
        'After the expiry of the lock-in period, either party may terminate this Agreement by providing 1 (one) calendar month advance written notice, or 1 month rent in lieu thereof. The Lessor may terminate with shorter notice only in the event of persistent non-payment of rent exceeding 30 days following written demand.',
      alternativeWordingTradeOff:
        'Protects tenant from sudden 15-day eviction while offering landlord a commercially standard 30-day exit window.',
      confidenceLevel: 'high',
    },
    {
      id: 'fnd-004',
      clauseTitle: 'Tenant Held Responsible for Major Structural Repairs and Building Seepage',
      riskCategory: 'medium',
      exactExcerpt:
        'The Lessee shall be solely responsible for all repairs, whether minor fixtures or major structural defects, plumbing, seepage, electrical wiring, and building facade damages occurring during the tenancy, regardless of whether caused by normal wear and tear, age of the building, or force majeure events.',
      location: 'Clause 6 (Maintenance)',
      plainEnglishExplanation:
        'You are made financially responsible for major building flaws, leaking roofs, pipe bursts, and structural cracks, even if caused by the building being old or heavy rains.',
      whyItMatters:
        'Under standard Indian tenancy principles and the Model Tenancy Act guidelines, major structural repairs, external seepage, and roof leakages are strictly the landlord\'s capital responsibility.',
      potentialPracticalConsequence:
        'If a monsoon causes wall seepage or an internal pipe bursts inside the wall, the landlord could deduct thousands from your deposit or demand payment for civil contractor work.',
      suggestedActionOrQuestion:
        'Clarify the division: "Tenant shall be responsible only for minor routine maintenance up to ₹1,500 per instance resulting from daily use (e.g. replacing bulb, tap washer). All structural repairs, concealed plumbing, electrical wiring defects, and seepage shall remain the Lessor\'s sole responsibility."',
      suggestedAlternativeWording:
        'The Lessee shall maintain the interior premises in good order and bear minor day-to-day maintenance expenses up to INR 1,500 per repair instance (such as bulb replacements, tap washers). All structural repairs, concealed plumbing defects, exterior seepage, electrical distribution panel failures, and roof repairs shall remain the sole financial obligation of the Lessor.',
      alternativeWordingTradeOff:
        'Landlord is shielded from trivial day-to-day wear claims under ₹1,500, while tenant is protected against major structural repair bills.',
      confidenceLevel: 'high',
    },
    {
      id: 'fnd-005',
      clauseTitle: 'Unfettered Landlord Entry Rights Without Prior Notice',
      riskCategory: 'medium',
      exactExcerpt:
        'The Lessor, her family members, agents, or prospective buyers/tenants shall have the unfettered right to enter, inspect, and show the Scheduled Premises at any time of day or night without prior notice or appointment, and the Lessee shall ensure immediate access.',
      location: 'Clause 7 (Inspection and Entry)',
      plainEnglishExplanation:
        'The landlord or real estate agents can walk in at any time of day or night without calling or scheduling in advance.',
      whyItMatters:
        'A lease grants legal exclusive possession and quiet enjoyment. Allowing unannounced visits at any hour violates the tenant\'s privacy and safety.',
      potentialPracticalConsequence:
        'You could experience unexpected intrusions late in the evening or on weekends without warning.',
      suggestedActionOrQuestion:
        'Amend to standard quiet enjoyment language: "Inspection or prospective buyer visits shall occur only between 10:00 AM and 6:00 PM, subject to at least 24 hours prior written notice via WhatsApp/email, and accompanied by the tenant or tenant\'s designated representative."',
      suggestedAlternativeWording:
        'The Lessor or authorized representatives may enter and inspect the Scheduled Premises upon providing at least 24 (twenty-four) hours prior written notice (via SMS, WhatsApp, or email) to the Lessee, during daytime hours between 10:00 AM and 6:00 PM, and in the presence of the Lessee or Lessee\'s representative.',
      alternativeWordingTradeOff:
        'Landlord retains the right to inspect property and show prospective buyers, while eliminating intrusive unannounced visits.',
      confidenceLevel: 'high',
    },
    {
      id: 'fnd-006',
      clauseTitle: '10 Months Security Deposit Exceeds Standard Benchmark',
      riskCategory: 'medium',
      exactExcerpt:
        'The Lessee has deposited a sum of INR 3,50,000/- (Rupees Three Lakhs Fifty Thousand only), equivalent to ten months\' rent, as interest-free refundable security deposit with the Lessor upon signing of this Agreement.',
      location: 'Clause 3 (Security Deposit)',
      plainEnglishExplanation:
        'You are handing over ₹3.5 Lakhs upfront as an interest-free loan to the landlord for 11 months.',
      whyItMatters:
        'While 10 months deposit was traditionally customary in Bengaluru, recent market standards have shifted towards 2 to 6 months. Furthermore, the Model Tenancy Act recommends a ceiling of 2 months rent for residential leases.',
      potentialPracticalConsequence:
        'Significant capital is tied up without earning interest, exposing the tenant to high recovery risk upon lease termination.',
      suggestedActionOrQuestion:
        'Negotiate reducing the deposit to 3–5 months rent (e.g. ₹1,05,000 to ₹1,75,000), or request a shorter 15-day refund timeline upon handover.',
      suggestedAlternativeWording:
        'The Lessee has deposited a sum of INR 1,75,000/- (equivalent to 5 months rent) as refundable security deposit with the Lessor upon signing of this Agreement, to be refunded in full within 15 days of vacant handover.',
      alternativeWordingTradeOff:
        'Gives landlord 5 months rent security (far above the Model Tenancy Act 2-month cap), while freeing up ₹1,75,000 liquidity for the tenant.',
      confidenceLevel: 'medium',
    },
    {
      id: 'fnd-007',
      clauseTitle: '12% Annual Rent Escalation Exceeds Current Urban Inflation Benchmarks',
      riskCategory: 'low',
      exactExcerpt:
        'Any renewal shall be solely at the Lessor\'s discretion, subject to a mandatory minimum rent escalation of 12% (twelve percent) per annum over the prevailing monthly rent.',
      location: 'Clause 1 (Term and Tenure)',
      plainEnglishExplanation:
        'If you renew after 11 months, your rent automatically jumps by at least 12% (from ₹35,000 to ₹39,200/month).',
      whyItMatters:
        'Standard residential rental escalation in Bengaluru and Mumbai typically ranges between 5% and 8%. A 12% fixed bump is above prevailing inflation and local rental yield averages.',
      potentialPracticalConsequence:
        'Year two rent will rise sharply, compounding substantially if you plan to stay for multiple years.',
      suggestedActionOrQuestion:
        'Propose capping renewal escalation at 5% to 7%, subject to mutual agreement based on prevailing market rates.',
      suggestedAlternativeWording:
        'Any renewal shall be mutually agreed upon by both parties at least 30 days prior to expiry, subject to a standard rent escalation of not more than 6% (six percent) per annum over prevailing monthly rent.',
      alternativeWordingTradeOff:
        'Guarantees landlord an inflation-aligned rent increase while keeping renewal housing costs predictable for tenant.',
      confidenceLevel: 'high',
    },
    {
      id: 'fnd-008',
      clauseTitle: '11-Month Tenancy Structure and Stamp Duty Considerations',
      riskCategory: 'informational',
      exactExcerpt:
        'The lease shall be for an initial period of 11 (Eleven) months commencing from 1st November 2024 to 30th September 2025.',
      location: 'Clause 1 (Term and Tenure)',
      plainEnglishExplanation:
        'The agreement is drafted for 11 months to avoid mandatory registration under Section 17 of the Indian Registration Act 1908.',
      whyItMatters:
        'Under Indian law, leases exceeding 11 months require compulsory registration and higher stamp duty. An 11-month agreement on non-judicial stamp paper is standard practice, but adequate stamp duty (typically 0.5% or applicable Karnataka stamp duty) must still be paid for admissibility in court.',
      potentialPracticalConsequence:
        'Ensure the agreement is executed on appropriate value non-judicial stamp paper or e-stamped under the Karnataka Stamp Act, otherwise an un-stamped document may face impounding penalties if litigated.',
      suggestedActionOrQuestion:
        'Confirm that the e-stamp certificate reflects the appropriate stamp duty for Bengaluru and that both parties receive an original executed copy with signatures across all pages.',
      confidenceLevel: 'high',
    },
  ],
  missingInformation: [
    {
      topic: 'Pre-existing Condition & Inventory Schedule',
      description:
        'There is no attached Schedule of Fixtures, list of electrical appliances, or condition report detailing existing cracks, paint blemishes, or wear.',
      whyItMatters:
        'Without an signed photographic move-in inventory, the landlord could dispute the condition of fittings upon move-out and make arbitrary deductions.',
    },
    {
      topic: 'Force Majeure and Uninhabitable Premises',
      description:
        'The contract lacks any clause addressing rent suspension if the flat becomes uninhabitable due to heavy rains, urban flooding, fire, or earthquake.',
      whyItMatters:
        'If the property is submerged or damaged by events outside your control, you might still be contractually pressured to pay rent.',
    },
    {
      topic: 'Utility Bill Settlement Mechanism',
      description:
        'No explicit method or timeline is provided for reconciling final electricity (BESCOM) and piped gas/water bills at move-out.',
      whyItMatters:
        'Landlords frequently hold back significant deposit chunks for months claiming pending electricity meter reconciliation.',
    },
  ],
  negotiationChecklist: [
    {
      item: 'Remove Automatic Painting Deduction',
      suggestedQuestionToCounterparty:
        'Can we agree that painting charges will only apply if there is damage beyond normal wear and tear, and that I will have the option to repaint or present a competitive quote before any deduction is made?',
      rationale:
        'Prevents an unconditional ₹35,000 loss from your deposit regardless of how well you care for the property.',
    },
    {
      item: 'Standardize Mutual Notice Period to 1 Month',
      suggestedQuestionToCounterparty:
        'Would you be open to aligning the notice period to 1 month (or 2 months) mutually for both of us after the lock-in period?',
      rationale:
        'Removes the 15-day sudden eviction risk and reduces your 3-month exit liability to reasonable commercial standards.',
    },
    {
      item: 'Limit Tenant Maintenance to Minor Routine Repairs',
      suggestedQuestionToCounterparty:
        'Can we clarify that the tenant is only responsible for day-to-day minor maintenance (e.g. light bulbs, faucet washers under ₹1,500), while major structural, plumbing, and building seepage repairs remain the landlord’s responsibility?',
      rationale:
        'Protects you from bearing structural and building repair costs that belong to the property owner.',
    },
    {
      item: 'Add 24-Hour Notice for Inspections',
      suggestedQuestionToCounterparty:
        'Can we specify that any visits or inspections will be scheduled with at least 24 hours prior notice at a mutually convenient daytime hour?',
      rationale: 'Guarantees your privacy and security inside your rented home.',
    },
  ],
  questionsForLawyer: [
    'Is the 6-month lock-in double-penalty clause (retaining full deposit plus claiming remaining lock-in rent) enforceable under Section 74 of the Indian Contract Act 1872?',
    'What is the required Karnataka stamp duty rate for an 11-month residential agreement with a ₹3,50,000 deposit, and does an un-registered 11-month lease offer adequate protection in case of illegal eviction?',
    'How does the Karnataka Rent Control legislation or the Model Tenancy Act apply to residential leases in Indiranagar, Bengaluru regarding deposit caps?',
    'What legal remedies exist if the landlord refuses to refund the security deposit within the 45-day window without showing valid invoices?',
  ],
  sourceNotesAndLimitations: {
    disclaimer:
      'DEMO DATA — FICTIONAL AGREEMENT — NOT A REAL LEGAL ASSESSMENT. This analysis is generated by LexGuard AI for informational demonstration purposes only. It does not constitute legal advice, does not establish an attorney-client relationship, and cannot guarantee legal enforceability in court.',
    indianLegalContextNotes: [
      'Under the Indian Contract Act 1872 (Section 74), liquidated damages for contract breach cannot be punitive and must represent genuine pre-estimated losses.',
      'Under Section 17 of the Indian Registration Act 1908, leases of immovable property exceeding 11 months require compulsory registration.',
      'Karnataka Stamp Act 1957 mandates specific stamp duty on lease deeds based on term and deposit amount.',
      'Tenants are strongly encouraged to consult a practicing advocate enrolled with the Bar Council of Karnataka for jurisdiction-specific advice.',
    ],
    unverifiedCitationsWarning:
      'All observations reflect text extracted from the document and general legal benchmarks. Specific state statutory provisions and municipal municipal bylaws must be verified with a local legal counsel.',
  },
};
