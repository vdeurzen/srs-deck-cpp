---
id: foundations-cache-cost-model
kind: cloze
version: 1
level: 3
tags: [memory-hierarchy, cost-model, low-latency]
requires:
  - foundations-latency-scale
elaborate: Say in one sentence, as to an interviewer, why counting comparisons can rank two data structures the wrong way round.
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://ieeexplore.ieee.org/document/814600
---

On modern hardware the unit of cost that matters for a data structure is
rarely the instruction — it is the {{c1::cache miss::a hardware event}}.

---

Memory moves between levels in fixed blocks (cache lines), so touching
one byte pays for the whole line, and a structure that packs eight useful
values into one line does eight times the work per line loaded as one
that packs one.
