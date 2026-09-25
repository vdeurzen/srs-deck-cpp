export const meta = {
  name: 'cpp-foundations-rung',
  description: 'Design the missing foundation rung of cpp-core: class design, inheritance, CRTP, access control, basic types and the patterns systems code is built from',
  phases: [
    { title: 'Design', detail: 'five lanes propose the missing foundation Cards' },
    { title: 'Dedupe', detail: 'verify each proposal is genuinely absent from both Decks' },
    { title: 'Placement', detail: 'topic layout, levels and prerequisite order' },
    { title: 'Synthesis', detail: 'write the foundations plan' },
  ],
}

const CPP = 'decks/cpp-core'
const ALGO = 'decks/algo-systems'

const CONTEXT = [
  'You are designing new Cards for a spaced-repetition Deck at /workspace/' + CPP + '/ (137 Cards,',
  'modern C++). Its sibling /workspace/' + ALGO + '/ (165 Cards) teaches algorithms and systems.',
  'Cards are topics/<topic-path>/<card-id>.md with YAML front matter: `id`, `kind`, `version`,',
  '`level` (1-5), `tags`, `refs`. Kinds: basic | cloze | code | explain | chunk | parsons | trace.',
  '',
  'READ FIRST: /workspace/' + CPP + '/README.md (conventions and the per-Kind walkthrough),',
  'and the "Proposed new Cards" section of /workspace/' + CPP + '/REVIEW.md and of',
  '/workspace/decks/CURRICULUM.md. Do NOT re-propose anything already listed in either.',
  'A per-Card inventory of both Decks is at /workspace/decks/INVENTORY.tsv — read it before',
  'grepping; it lists deck, topic, id, kind, level, tags and a prompt excerpt for all 302 Cards.',
  '',
  'THE GRADING CONSTRAINT, which decides which Kinds are even possible:',
  'the compile service COMPILES but NEVER RUNS a program. So a compile-graded Card must discriminate',
  'at COMPILE TIME: `constexpr` code with a `static_assert` Harness over its computed values, or a',
  'deliberate overload-resolution / concept / access-control failure. A `code` Card whose wrong',
  'answers still compile teaches nothing. If your idea cannot be graded that way, choose a Kind that',
  'can (`basic`, `cloze`, `chunk` and `parsons` are graded by text or by ordering) and say so.',
  '',
  'THE GAP YOU ARE FILLING — verified by grep across all 137 cpp-core Cards:',
  '  `inheritance`, `protected:`, `abstract`, `enum class`  -> 0 files',
  '  `private:`, `public:`, CRTP                            -> 1 file each',
  '  `virtual`, `vtable`, `polymorph`                       -> 2 files each, all incidental mentions',
  '  fixed-width integer types / `size_t`                   -> 2 files',
  'The Deck currently opens at const/constexpr and value categories. There is NO class-design rung',
  'beneath them. A completed curriculum audit scored the two strands that sit on that missing rung',
  'lowest of all fourteen: lifetime-ownership 4/10 and generics 4/10.',
  '',
  'THE LEARNER\'S GOAL, which is the design brief and not a nicety:',
  '"a really solid foundation of associated long-term memory patterns that help me build really',
  ' complex systems and recognise complex problems quickly ... build a habit for learning and',
  ' really embed the knowledge very deeply so it is there long-term."',
  'Four consequences for every Card you propose:',
  ' - FOUNDATION MEANS SIMPLE, NOT SHALLOW. These are the first Cards a learner meets. A Card that',
  '   needs a concept taught later is a broken rung. State the prerequisite you assume, and it must',
  '   already exist in the Deck or be another proposal of yours placed earlier.',
  ' - ASSOCIATION. Say which LATER Card in either Deck each proposal supports. A foundation Card that',
  '   nothing builds on is trivia. This Deck deliberately teaches key mechanisms from several angles',
  '   across several Cards — that repetition is the design and how the memory is built, never a defect.',
  ' - RECOGNITION. Prefer a Card that forces a CHOICE or explains a SYMPTOM over one that recites a',
  '   definition. "What is a virtual function" is weak; "this call does not dispatch — why" is strong.',
  ' - PRODUCTION. A learner who can only recognise a rule cannot write it. Across your lane, at least',
  '   half the proposals should be a producing Kind (`code`, `chunk`, `parsons`) or `trace`.',
].join('\n')

const PROPOSAL_SCHEMA = {
  type: 'object',
  properties: {
    laneAssessment: { type: 'string' },
    proposals: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          topic: { type: 'string' },
          kind: { type: 'string', enum: ['basic', 'cloze', 'code', 'explain', 'chunk', 'parsons', 'trace'] },
          level: { type: 'number' },
          title: { type: 'string' },
          front: { type: 'string' },
          teaches: { type: 'string' },
          gradedHow: { type: 'string' },
          assumes: { type: 'string' },
          supports: { type: 'string' },
          patternType: { type: 'string', enum: ['definition', 'discrimination', 'diagnosis', 'production', 'trace', 'capstone'] },
          searchTerms: { type: 'array', items: { type: 'string' } },
          priority: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['id', 'topic', 'kind', 'level', 'title', 'front', 'teaches', 'gradedHow', 'assumes', 'supports', 'patternType', 'searchTerms', 'priority'],
      },
    },
  },
  required: ['laneAssessment', 'proposals'],
}

const DEDUPE_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          verdict: { type: 'string', enum: ['novel', 'already-covered', 'overlaps-partially'] },
          evidence: { type: 'string' },
          existingCard: { type: 'string' },
        },
        required: ['id', 'verdict', 'evidence'],
      },
    },
  },
  required: ['results'],
}

const LANES = [
  {
    key: 'class-design',
    effort: 'high',
    brief: [
      'LANE: class design and encapsulation — the rung the Deck is missing entirely.',
      'Cover: what a class invariant IS and why the constructor establishes it; `public`/`private`/',
      '`protected` as invariant protection rather than as bureaucracy; `class` vs `struct` as a default;',
      'the special member functions as a SET and the Rule of Zero/Three/Five (the Deck has',
      '`parsons-rule-of-five` but the review found it teaches the exception as if it were the rule);',
      '`explicit` and the conversions it prevents; `const` member functions and logical vs bitwise',
      'constness; `friend` and when it is the right answer; aggregates vs classes with invariants;',
      'accessors as a smell vs behaviour-carrying types; `[[nodiscard]]`; delegating constructors;',
      'member initialiser lists and initialisation ORDER (declaration order, not list order — the',
      'curriculum audit found this rule narrated but never traced anywhere).',
      'The strongest Cards here are `code` Cards graded by a DELIBERATE ACCESS OR OVERLOAD FAILURE,',
      'and `trace` Cards on construction/destruction order. Propose 7-10.',
    ].join('\n'),
  },
  {
    key: 'inheritance',
    effort: 'high',
    brief: [
      'LANE: inheritance and runtime polymorphism — zero hits for `inheritance`, `protected:` and',
      '`abstract` across 137 Cards.',
      'Cover: the vtable as a mechanism (one pointer per object, one table per class) rather than as',
      'magic; pure virtual and abstract interfaces; WHY a base with virtual functions needs a virtual',
      'destructor and what exactly leaks without one; object slicing on copy-by-value; `override` and',
      '`final` and the silent bug `override` catches; name hiding in a derived class; calling a virtual',
      'function from a constructor or destructor (and why it dispatches to the base); the cost of',
      'dispatch versus a branch versus a direct call; multiple inheritance and the diamond only as far',
      'as a systems engineer needs; composition versus inheritance as a DESIGN CHOICE with a deciding',
      'property, not a slogan; the non-virtual interface idiom.',
      'Several of these are ideal `trace` Cards (constructor/destructor dispatch order) and ideal',
      '`code` Cards graded by a `static_assert` on `sizeof`, on `std::is_polymorphic_v`, or on a',
      'value computed through a base pointer. Propose 7-10.',
    ].join('\n'),
  },
  {
    key: 'static-polymorphism',
    effort: 'high',
    brief: [
      'LANE: compile-time polymorphism and the patterns systems code is actually built from.',
      'Cover: CRTP — what it is, why the base can call into the derived, and what it buys over a',
      'virtual call (the Deck mentions it in exactly ONE file); static vs dynamic dispatch as a',
      'DISCRIMINATION Card with a deciding property; the empty base optimisation and why CRTP bases',
      'cost nothing; policy-based design and mixins; type erasure as the inverse trade (`std::function`,',
      '`any`, a hand-rolled vtable) and when to pay for it; tag dispatch and its replacement by',
      '`if constexpr` and concepts; PIMPL and the compile-firewall trade; RAII as THE pattern the',
      'language is organised around, connected to the ownership Cards that already exist.',
      'This lane is where "patterns important to build from" lives, so favour Cards that make the',
      'learner PRODUCE the skeleton (`chunk`) or CHOOSE between two mechanisms under a stated',
      'constraint, over Cards that name a pattern. Propose 7-10.',
    ].join('\n'),
  },
  {
    key: 'basic-types',
    effort: 'medium',
    brief: [
      'LANE: the type system at the bottom — fundamental types and their representation.',
      'Cover: fundamental types and what the standard actually guarantees about their sizes; the',
      'fixed-width aliases and when to use them versus `int`; `size_t` vs `ptrdiff_t` vs `int` for',
      'indices, and the signed/unsigned comparison trap (a real source of bugs in every loop); integral',
      'promotion and the usual arithmetic conversions; signed overflow as UB versus unsigned wraparound',
      'as defined, and what the optimiser does with that; narrowing conversions and why braces reject',
      'them; `enum class` versus a plain enum (ZERO hits in the Deck) and why scoped enums do not',
      'convert; `struct` layout, padding and `sizeof`; `alignof`/`alignas` (which appear 9 times in the',
      'ALGORITHMS Deck and 0 times in this one — a sealed seam worth opening); `char` signedness;',
      '`auto` deduction on the basics and when it drops const/reference; string literals and `char*`',
      'versus `std::string` versus `string_view` at the beginner level.',
      'Almost everything here is gradeable with `static_assert` on `sizeof`, `alignof`, numeric limits',
      'or a conversion, which makes this the strongest lane for `code` Cards. Propose 7-10.',
    ].join('\n'),
  },
  {
    key: 'habit-and-recall',
    effort: 'high',
    brief: [
      'LANE: the learning system itself. You are not proposing subject Cards; you are proposing the',
      'structure that turns this Deck into a HABIT and makes the knowledge stick for years.',
      '',
      'The learner asked to "build a habit for learning and really embed the knowledge very deeply so',
      'it is there long-term". Assess and design for that specifically:',
      ' - ENTRY POINTS. If a learner starts today, which Card do they meet first, and does the Deck',
      '   have an on-ramp at all? A 137-Card Deck whose easiest Topic is const/constexpr has no door.',
      ' - INTERLEAVING. Which foundation Cards should deliberately resurface inside later Topics so the',
      '   pattern is met in a new context rather than re-read in the old one?',
      ' - DISCRIMINATION PAIRS. For the foundation material specifically: which pairs does a beginner',
      '   genuinely confuse (`class` vs `struct`, `virtual` vs CRTP, `enum` vs `enum class`, a reference',
      '   vs a pointer, copy vs move, stack vs heap)? Each deserves a Card whose answer names the',
      '   DECIDING PROPERTY.',
      ' - CAPSTONES. The Deck has 11 `explain` Cards. Which foundation strand should end with one that',
      '   forces a whole design to be reconstructed from memory — e.g. "design a value type that owns a',
      '   buffer" — since that is the strongest integration exercise the format offers.',
      ' - SEQUENCING FOR RECALL. What order should these foundation Cards be INTRODUCED in so each new',
      '   Card is answerable from the previous ones, and what `level` values encode that order?',
      'Propose 6-10 Cards, and put your structural findings in `laneAssessment`.',
    ].join('\n'),
  },
]

const designed = await pipeline(
  LANES,
  (l) => agent([CONTEXT, '', l.brief].join('\n'), {
    label: 'design:' + l.key,
    phase: 'Design',
    schema: PROPOSAL_SCHEMA,
    effort: l.effort,
  }),
  (res, l) => {
    if (!res || !res.proposals || res.proposals.length === 0) {
      return Promise.resolve({ lane: l.key, res: res, dedupe: { results: [] } })
    }
    return agent([
      'You are checking whether proposed new Cards are ALREADY COVERED by two existing Decks at',
      '/workspace/' + CPP + '/ and /workspace/' + ALGO + '/.',
      '',
      'For each proposal below, run its `searchTerms` across BOTH Decks\' topics/ directories with',
      'grep -ril (case-insensitive, over Card bodies, not just filenames), plus the obvious synonyms',
      'the proposer did not list. Then open any Card that looks close and read it.',
      '',
      'Rule the proposal:',
      '  `already-covered`   — an existing Card teaches the same thing at the same depth. Name it.',
      '  `overlaps-partially` — an existing Card touches it but does not teach it (e.g. one sentence',
      '                         inside another Card\'s explanation). Name the Card and say what is',
      '                         actually missing. This is the most common answer — look for it.',
      '  `novel`             — genuinely absent from both Decks.',
      'Quote the commands you ran and their counts in `evidence`. Do not rule `novel` without searching.',
      '',
      'NOTE: this author DELIBERATELY teaches a mechanism from several angles across several Cards.',
      'A proposal that re-angles an existing Card as a different Kind, or asks the inverse question,',
      'is NOT `already-covered` — it is `overlaps-partially`, and the overlap is the point. Only rule',
      '`already-covered` when the new Card would ask the same question the same way.',
      '',
      'PROPOSALS:',
      JSON.stringify(res.proposals.map((p) => ({ id: p.id, title: p.title, teaches: p.teaches, kind: p.kind, searchTerms: p.searchTerms })), null, 1),
    ].join('\n'), {
      label: 'dedupe:' + l.key,
      phase: 'Dedupe',
      schema: DEDUPE_SCHEMA,
      model: 'sonnet',
      effort: 'medium',
    }).then((d) => ({ lane: l.key, res: res, dedupe: d }))
  }
)

const liveLanes = designed.filter(Boolean).filter((x) => x.res)
const kept = []
const dropped = []
for (const l of liveLanes) {
  const rs = (l.dedupe && l.dedupe.results) || []
  for (const p of l.res.proposals) {
    const v = rs.find((x) => x.id === p.id)
    const verdict = v ? v.verdict : 'novel'
    const row = Object.assign({ lane: l.lane, verdict: verdict, dedupeEvidence: v ? v.evidence : 'not checked', existingCard: v ? v.existingCard : '' }, p)
    if (verdict === 'already-covered') dropped.push(row)
    else kept.push(row)
  }
}
const laneAssessments = liveLanes.map((l) => l.lane + ': ' + l.res.laneAssessment).join('\n\n')
log('Design: ' + (kept.length + dropped.length) + ' proposed, ' + dropped.length + ' dropped as already covered, ' + kept.length + ' kept.')

const PLACEMENT_SCHEMA = {
  type: 'object',
  properties: {
    topicPlan: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          topicPath: { type: 'string' },
          isNew: { type: 'boolean' },
          cards: { type: 'array', items: { type: 'string' } },
          rationale: { type: 'string' },
        },
        required: ['topicPath', 'isNew', 'cards', 'rationale'],
      },
    },
    introductionOrder: { type: 'array', items: { type: 'string' } },
    levelCorrections: {
      type: 'array',
      items: {
        type: 'object',
        properties: { id: { type: 'string' }, proposed: { type: 'number' }, corrected: { type: 'number' }, why: { type: 'string' } },
        required: ['id', 'proposed', 'corrected', 'why'],
      },
    },
    renumbering: { type: 'string' },
    risks: { type: 'array', items: { type: 'string' } },
  },
  required: ['topicPlan', 'introductionOrder', 'levelCorrections', 'renumbering', 'risks'],
}

const placement = await agent([
  CONTEXT,
  '',
  'You are the curriculum architect. ' + kept.length + ' foundation Cards have been designed and',
  'checked for duplication. Decide WHERE they live and IN WHAT ORDER they are introduced.',
  '',
  'The Deck\'s existing Topic layout is numbered: 01-basics/{const-constexpr-consteval, initialization,',
  'value-categories}, 02-types/*, 03-library/*, 04-language/*, 05-interview/*, 06-idioms/*, 07-tracing/*,',
  '08-transfer/*, 09-execution/*. Read the actual directory listing before deciding.',
  '',
  'Produce:',
  ' 1. TOPIC PLAN. Which Topic directory each Card goes in. Propose NEW Topic directories where the',
  '    material genuinely does not belong in an existing one — class design and inheritance almost',
  '    certainly need their own. Numbering must keep the Deck readable: these are the FIRST things a',
  '    learner should meet, and the current 01-basics opens at const/constexpr. Say plainly whether',
  '    existing Topics should be renumbered, what that costs (Card ids are stable, Topic paths are',
  '    directory names — say which references break), and whether it is worth it. A defensible',
  '    alternative is to add a 00- prefixed Topic and leave everything else alone; argue the choice.',
  ' 2. INTRODUCTION ORDER. The exact sequence a learner meets these Cards in, such that every Card is',
  '    answerable from Cards already met. This is the deliverable the learner asked for most directly.',
  ' 3. LEVEL CORRECTIONS. The proposers set `level` themselves and will have inflated it. Foundation',
  '    Cards should mostly be 1-2. A level that lies makes the scheduler introduce material in the',
  '    wrong order, and the curriculum audit already found 45 mislevelled Cards in the existing Decks.',
  ' 4. RISKS. What could go wrong in authoring these — Cards that cannot be graded as claimed, Cards',
  '    that duplicate each other across lanes, Topics that become too large to review.',
  '',
  'KEPT PROPOSALS:',
  JSON.stringify(kept, null, 1),
].join('\n'), { label: 'placement', phase: 'Placement', schema: PLACEMENT_SCHEMA, effort: 'high' })

const briefing = await agent([
  CONTEXT,
  '',
  'You are the curriculum lead. Write the foundations plan to /workspace/decks/FOUNDATIONS.md',
  '(gitignored). Overwrite if it exists. It must be directly usable as authoring instructions.',
  '',
  'Structure:',
  '  # Foundation rung: cpp-core',
  '  ## Why this rung is missing and what it costs — state the verified gap (the grep counts above)',
  '     and connect it to the curriculum audit scoring lifetime-ownership 4/10 and generics 4/10.',
  '  ## Topic layout — the decision on new Topics and renumbering, with the trade stated plainly.',
  '  ## The Cards — grouped by Topic, in INTRODUCTION ORDER. For each: id, kind, level, the front of',
  '     the Card, what it teaches, how it is graded, what it assumes, and which later Card it supports.',
  '     Mark each `definition`/`discrimination`/`diagnosis`/`production`/`trace`/`capstone`.',
  '  ## Partial overlaps — Cards ruled `overlaps-partially`, with the existing Card they extend and',
  '     what is genuinely new. These are deliberate re-angles, which is this author\'s design; say so.',
  '  ## Dropped — proposals ruled already-covered, with the Card that covers them.',
  '  ## Habit and recall — the structural findings: the on-ramp, interleaving, discrimination pairs,',
  '     capstones, and the level scheme that encodes the introduction order.',
  '  ## Authoring order — the sequence to write them in, batched so each batch is independently',
  '     validatable with `dart run tools/validate.dart decks/cpp-core --strict`.',
  '',
  'Rules: do not invent Cards beyond the data. Never recommend removing an existing Card because a new',
  'one covers the same mechanism — deliberate repetition from several angles is this author\'s design',
  'and the mechanism by which long-term memory is built. Every `code`/`parsons` Card you list must',
  'state a Harness that discriminates at COMPILE TIME, since programs are never run.',
  '',
  'DATA — kept proposals (with dedupe verdicts):',
  JSON.stringify(kept, null, 1),
  '',
  'DATA — dropped as already covered:',
  JSON.stringify(dropped, null, 1),
  '',
  'DATA — placement and introduction order:',
  JSON.stringify(placement, null, 1),
  '',
  'DATA — lane assessments (the habit-and-recall lane matters most here):',
  laneAssessments,
  '',
  'After writing the file, return a briefing: how many Cards, how they split by Kind and by',
  'pattern type, the Topic-layout decision in one sentence with its cost, the first eight Cards in',
  'introduction order with one clause each, the on-ramp recommendation, and the path you wrote.',
].join('\n'), { label: 'synthesis:foundations', phase: 'Synthesis', effort: 'high' })

return {
  proposed: kept.length + dropped.length,
  kept: kept.length,
  droppedAsCovered: dropped.length,
  byKind: kept.reduce((a, p) => { a[p.kind] = (a[p.kind] || 0) + 1; return a }, {}),
  byPattern: kept.reduce((a, p) => { a[p.patternType] = (a[p.patternType] || 0) + 1; return a }, {}),
  novel: kept.filter((p) => p.verdict === 'novel').length,
  partialOverlap: kept.filter((p) => p.verdict === 'overlaps-partially').length,
  introductionOrder: placement ? placement.introductionOrder : [],
  briefing: briefing,
}
