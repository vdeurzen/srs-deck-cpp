---
id: complexity-log-base-irrelevant
kind: basic
version: 1
level: 2
tags: [complexity, logarithms]
requires:
  - complexity-log-halvings
  - complexity-drop-terms
refs:
  - https://en.wikipedia.org/wiki/Logarithm#Change_of_base
---

## For n = 10⁶ keys a binary tree is ~20 levels deep and a fan-out-100 tree is 3. Why are both O(log n)?

---

**log_b n = log₂ n / log₂ b, so changing base multiplies by a constant.**
log₂ 100 ≈ 6.64 and 20 / 6.64 ≈ 3. Big-O drops constant factors, so it
drops the base too. The constant is still real: six times fewer levels is
why on-disk indexes use wide nodes.
