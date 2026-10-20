# Teaching with Cards only: what the evidence says (2026-10-19)

The evidence behind `TEACHING.md`. PEDAGOGY.md's Sources already cover the
foundations (Wozniak, Matuschak, Hermans, Sweller, Bjork, Dunlosky); this
covers what goes beyond them: sequencing, fading, growth and recognition.
Strength of evidence is noted for each finding. Figures marked *(unverified)*
were recalled rather than read in the source during the 2026-10-19 search;
check them before citing.

## Findings and the rule each implies

**Faded worked examples; expertise reversal** (Renkl & Atkinson; Kalyuga 2007).
Worked examples beat problem solving for novices. The advantage reverses once
the skill is in place: the scaffold becomes redundant load. Reisslein et al.
2006: novices did best example → problem, while learners with prior knowledge
did best problem → example. Adaptive fading beat fixed fading on delayed tests
*(unverified, Salden et al. 2010)*. Strong, many studies.
→ PEDAGOGY §3.1's worked → faded → full trace. Expertise reversal is why
PEDAGOGY §0 lets a Card skip a rung only when it adds nothing, and why
Go-known ideas start from the C++ difference.

**Subgoal labels** (Margulieux, Morrison, Catrambone). In programming
courses: better quiz and problem-solving scores and fewer dropouts (265
students, IJ STEM Ed 2020), with no difference in exam scores. Pooled loop
studies show medium-to-large effects. Labels also help with Parsons problems
(SIGCSE '16). Labels must appear in both the instruction and the example.
Moderate to strong.
→ 3–5 named subgoals per procedure, worded identically on every Card that
uses it, plus one `cloze` that asks for the sequence (TEACHING §4).

**4C/ID** (four-component instructional design; van Merriënboer).
Meta-analyses: d = 0.79 (Costa et al. 2022), g = 0.67 for complex skills.
Whole tasks grouped in task classes from simple to complex, support fading
within each class, background information before each class, how-to details
shown just in time, and drill only for steps that must become automatic.
Strong.
→ task classes as `requires` tiers; "one change per step"; vocabulary as tiny
`cloze` Cards (TEACHING §1, §3).

**PRIMM and Parsons problems.** PRIMM: 13 schools, 493 pupils aged 11–14,
better post-test scores than the control group; quasi-experimental and with
children, so moderate evidence. Parsons problems: the same pre-to-post gains
as writing or fixing code, in significantly less time, with similar retention
after a week (Ericson, Margulieux & Rick 2017). Adaptive Parsons problems were
solved about twice as often (ICER 2018, 8,000+ users). They are no faster
when the solution is unusual.
→ predict before produce; `parsons` with no distractors before `code`;
distractors that encode a real bug only once the plain version is solid.

**Pre-questions and productive failure.** A failed guess followed by
immediate feedback beats study alone (Kornell, Hays & Bjork 2009). The
pre-question benefit is robust for the material that was pretested; transfer
to other material is contested (St. Hilaire et al. 2024). Productive failure
helps conceptual knowledge more than procedural *(unverified: g ≈ 0.36
overall, ≈ 0.87 when implemented faithfully; Sinha & Kapur 2021)*.
→ a rung-1 "meet" Card may pose the problem as a puzzle (PEDAGOGY §5,
Feynman) when every piece is in its closure: cheap, conceptual, and the back
teaches the answer fully. Not for procedures.

**Interleaving** (Brunmair & Richter 2019 meta-analysis). g = 0.42 overall,
0.34 for maths; strongest when categories look alike. It hurts for
vocabulary-style learning (g = −0.39). Rohrer et al. 2020 cluster RCT with 787
students: d = 0.83. Strong for problem-type discrimination.
→ blocked ladders first, then mixed-recognition Cards (PEDAGOGY §2 rule 14).

**Concreteness fading; contrasting cases.** Fyfe et al. 2014 is a systematic
review with no pooled effect, and the approach generalises less than first
claimed; moderate to weak. Contrasting cases prepare learners for later
explanation (Schwartz & Bransford 1998 *(unverified detail)*).
→ concrete values first (PEDAGOGY §2 rule 8); contrast pairs that differ in
one feature (PEDAGOGY §2 rule 7).

**Refutation of misconceptions.** g = 0.41 over 44 comparisons (Educational
Psychology Review 2021); a 2025 preregistered meta-analysis also found a
consistent advantage. Moderate to strong.
→ misconception Cards as PEDAGOGY §4 already defines them: state the belief,
say it is wrong, explain why, show a minimal counter-example.

**Time per Card.** Nielsen: about 8 s per review, and 4–7 minutes of total
review per Card over 20 years. He adds a Card only if it is worth about 10
minutes of future time. Anki users report 5–25 s per Card (anecdotal). FSRS's
default target retention is 0.90; the claim that ~0.85 minimises workload is
contested. Math Academy counts 1 XP as about 1 minute of focused work. Weak
(practitioner data).
→ the lifetime-cost argument and the time budgets (TEACHING §2). The budgets
are a judgement call informed by these figures, not a measured optimum.

**SRS products for programming.** Execute Program unlocks lessons only after
their prerequisites have been reviewed, so each lesson can stay short.
Math Academy splits topics into small knowledge points: a worked example,
then up to 5 problems, advancing after 2 correct in a row. Its "fractional
implicit repetition" credits the simpler topics that an advanced review
practises; this app has no such credit. Practitioner writing, with no
independent trials.
→ higher Cards genuinely use their prerequisites (TEACHING §3); expect some
redundant low-rung reviews.

## Weak or contested

Productive failure for procedures; how general concreteness fading is;
transfer from pre-questions; how efficient Parsons problems are for unusual
solutions; the 0.85 vs 0.90 retention target; Math Academy and Execute
Program claims; per-Card time norms.

## Sources

- Brunmair & Richter 2019, interleaving meta-analysis: https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf
- Rohrer et al. 2020, interleaved maths RCT: https://ies.ed.gov/ncee/wwc/Study/88770
- Margulieux et al. 2020, subgoal labels: https://doaj.org/article/9a2c85d66fd54ec9ab019e9a510bbf17
- Morrison et al. SIGCSE '16, subgoals and Parsons: https://digitalcommons.unomaha.edu/compsicfacproc/56
- Ericson, adaptive Parsons problems: https://hg.gatech.edu/node/603172
- Sentance et al. 2019, PRIMM: https://qmro.qmul.ac.uk/xmlui/handle/123456789/57800
- Costa et al. 2022, 4C/ID meta-analysis: https://ciencia.iscte-iul.pt/publications/the-four-component-instructional-design-model-4cid-a-meta-analysis-on-use-and-effect/81383
- Kalyuga 2007, expertise reversal: https://www.uky.edu/~gmswan3/EDC608/Kalyuga2007_Article_ExpertiseReversalEffectAndItsI.pdf
- Kornell, Hays & Bjork 2009, pretesting: https://pubmed.ncbi.nlm.nih.gov/19586265/
- Refutation texts meta-analysis 2021: https://link.springer.com/article/10.1007/s10648-021-09656-z
- Skycak, hierarchical spaced repetition: https://www.justinmath.com/individualized-spaced-repetition-in-hierarchical-knowledge-structures
- Math Academy, how it works: https://mathacademy.com/how-it-works
- Nielsen, Augmenting Long-term Memory: https://augmentingcognition.com/ltm.html
- Matuschak, notes on Execute Program: https://notes.andymatuschak.org/Execute_Program
- Fyfe et al. 2014, concreteness fading: https://pc.cogs.indiana.edu/?p=885
