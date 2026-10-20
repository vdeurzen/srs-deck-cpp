---
id: complexity-cost-cases
kind: basic
version: 1
level: 1
tags: [foundations, complexity, best-worst-average]
elaborate: Pick a function of yours with an early return. Which input makes it cheapest, which dearest, and is the dear one the common one?
refs:
  - https://en.wikipedia.org/wiki/Best,_worst_and_average_case
---

## A duplicate check compares each element with every earlier one and stops at the first match. It does 22 comparisons on `{4, 7, 1, 9, 2, 8, 5, 4}`; other 8-element inputs cost 1 or 28. Is 22 the best, the worst or the average case for n = 8?

---

**None of them: 22 is one input's cost.** Best and worst are the
*minimum and maximum over all inputs* of size n: 1 and 28. The average
is the mean over those inputs weighted by a *distribution*: until you say
how likely duplicates are and where they sit, "the average" is
undefined. Each case is its own function of n.
