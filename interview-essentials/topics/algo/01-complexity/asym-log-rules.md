---
id: complexity-asym-log-rules
kind: cloze
version: 1
level: 1
tags: [foundations, complexity, logarithms]
requires:
  - complexity-asym-big-o-definition
elaborate: "Where else does a log with a base other than 2 appear, such as a tree whose nodes have 16 children or a count of decimal digits, and why does O not care?"
refs:
  - https://en.wikipedia.org/wiki/Logarithm#Logarithmic_identities
---

Three log rules, applied: log₂(8n) = {{c1::3 + log₂ n::a product becomes…}},
log₂(n⁵) = {{c2::5 · log₂ n::a power becomes…}}, and
log₁₆ n = {{c3::log₂ n / 4::change of base}}.

---

log(a·b) = log a + log b, log(nᵏ) = k·log n, and
log_b n = log₂ n / log₂ b. For growth rates each rule says "a constant":
a constant factor inside the log adds a constant (8n → +3), a power
multiplies by a constant (n⁵ → ×5), and a different base divides by one
(log₂ 16 = 4). All three vanish inside O, which is why "O(log n)" never
names a base.
