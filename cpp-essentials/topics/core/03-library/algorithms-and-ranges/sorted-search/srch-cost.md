---
id: srch-cost
kind: basic
version: 1
level: 3
tags: [algorithms, searching, cost]
requires:
  - srch-lower-bound-worked
elaborate: Say when sorting the data first costs more than the searches it speeds up.
refs:
  - https://eel.is/c++draft/lower.bound
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

## A sorted `std::vector<int>` holds 10⁶ values. `std::find` may compare all 10⁶ of them. About how many comparisons does `std::lower_bound` make?

---

**About 20: each comparison halves the candidates, and 2²⁰ ≈ 10⁶.**

After k probes about n / 2ᵏ candidates remain, so it stops after about
log₂ n comparisons; the standard caps it there, plus a constant.
Doubling the vector adds just one comparison.
