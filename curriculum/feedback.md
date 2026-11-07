# Learner feedback log

Appended by `/card-feedback`, newest last. One line per Card:

    <date> | <qid> | <what the learner said, ≤ 15 words> | <cause> | <fix> | v<old>→v<new> or "no bump"

Causes: `too-long` (over its time budget), `bookkeeping` (trace or count with too much
state), `unknown-term` (a term its `requires` didn't teach), `too-many-ideas`
(3+ new ideas at once), `ambiguous` (more than one defensible answer),
`leaks` (the answer is given away), `wrong` (a factual or value error),
`too-easy` (no retrieval effort), `missing-rung` (no worked example or
simpler Card beneath it).

2026-11-07 | cpp-essentials/atomics-explain-publish-with-flag | export: Hard 5/5; stale-load answer ticked 0/5 | too-many-ideas | removed the answer the question doesn't ask for | no bump
2026-11-07 | cpp-essentials/ptr-explain-dangling | export: returning a local 0/4; const-ref extension 1/4 | ambiguous | front asks for everyday causes; dropped extension answer and its requires | v2→v3
2026-11-07 | cpp-essentials/qry-explain-extremes | export: never Easy in 5; no-copy answer ticked 2/5 | too-many-ideas | kept the three strongest reasons | no bump
2026-11-07 | cpp-essentials/srch-count-at-most-code | export: Again 2/4 on upper_bound versus lower_bound | missing-rung | requires srch-upper-vs-lower, the existing contrast Card | no bump
2026-11-07 | cpp-essentials/ptr-arrow-member | export: median 69 s over 3 reviews, syntax Card | too-long | cut an unused code line and a redundant clause | no bump
2026-11-07 | cpp-essentials/threads-cv-wait-needs-predicate | export: median 64 s over 3 reviews | too-long | cut a sentence its prerequisite already teaches | no bump
2026-11-07 | cpp-essentials/tmpl-definition-in-header | export: median 79 s over 3 reviews | too-long | no change: the three files are the question | no bump
2026-11-07 | cpp-essentials/atomics-memory-order-intro | export: median 79 s over 2 reviews, all Easy | too-long | no change: first acquire/release Card, too little data | no bump
2026-11-07 | cpp-essentials/exceptions-strong-vs-basic | export: median 65 s over 3 reviews, one outlier | too-long | no change: already short, the time is recall | no bump
2026-11-07 | cpp-essentials/types-mixed-which-changes-value | export: median 64 s over 2 reviews, all Easy | too-long | no change: compares three conversions by design, too little data | no bump
