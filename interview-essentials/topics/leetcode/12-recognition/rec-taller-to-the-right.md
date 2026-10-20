---
id: rec-taller-to-the-right
kind: basic
version: 1
level: 3
tags: [arrays, recognition, lc-496]
requires:
  - mono-stack-signal
  - arr-window-signal
elaborate: Where else does "the nearest larger value to one side" hide, such as a price chart or a stack of log timestamps?
refs:
  - https://leetcode.com/problems/next-greater-element-i/
  - https://leetcode.com/problems/daily-temperatures/
---

> Given `heights` of `n` buildings in a row, `n <= 10^5`, return for
> each building the index of the nearest taller building to its right,
> or −1 if there is none.

## Which pattern applies?

---

**A monotonic stack of buildings still waiting for a taller one.**

Each new building pops and answers every shorter one on top, then
waits itself: each index is pushed and popped once, O(n). Not a sliding
window: the answer may lie any distance away, so no window bounds it.
