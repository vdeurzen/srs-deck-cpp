---
id: foundations-big-o-scaling
kind: cloze
version: 1
level: 1
tags: [complexity, big-o]
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Big_O_notation
---

A routine takes 1 ms at n = 1 000. Make the input 1 000× larger
(n = 1 000 000). If the routine is O(n), it now takes about
{{c1::1 second}}; if it is O(n²), about {{c2::17 minutes}}; if it is
O(log n), about {{c3::2 ms}}. (log₂ 10³ ≈ 10, log₂ 10⁶ ≈ 20.)

---

Big-O describes how cost **grows** with n, so predict by scaling, not by
plugging in n: ×1 000 for linear, ×1 000² = ×10⁶ for quadratic (1 000 s),
and 20 / 10 = ×2 for logarithmic. The constant factor
cancels, which is exactly why big-O drops it — and why it cannot tell you
which of two O(n) routines is faster.
