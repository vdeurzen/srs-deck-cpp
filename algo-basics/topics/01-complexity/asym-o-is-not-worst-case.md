---
id: complexity-asym-o-is-not-worst-case
kind: basic
version: 1
level: 1
tags: [foundations, complexity, best-worst-average, misconception]
requires:
  - complexity-asym-theta-sandwich
elaborate: Take a routine you own whose cost depends on the data, not just its size. Write its best case and its worst case each as a Θ bound.
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Best,_worst_and_average_case
---

## "O is the worst case, Ω the best case." Insertion sort runs Θ(n) on sorted input, its best case. Compare the bound that reading gives the best case with the bound the definitions give it.

---

**The reading says Ω(n); the definitions say Θ(n), hence O(n) as well.**
The letters bound *a function*; best and worst *choose* the function.
Each case has its own Θ: best Θ(n), worst (reversed input) Θ(n²), hence
also Ω(n²). The belief is tempting because O is usually quoted for the
worst case, but the definitions never mention inputs.
