---
id: mono-explain-stack
kind: explain
version: 3
level: 3
tags: [stacks, recognition, lc-739]
requires:
  - mono-stack-signal
  - mono-next-greater-chunk
  - mono-histogram-trace
  - mono-window-max-deque
refs:
  - https://leetcode.com/problems/daily-temperatures/
  - https://leetcode.com/problems/largest-rectangle-in-histogram/
  - https://leetcode.com/problems/sliding-window-maximum/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: Where in a system you know (a price feed, a log of response times) would "for each event, the next one that beats it" be a useful query?
---
An interviewer says: for each of up to 10^5 daily temperatures, report
how many days you wait until a warmer one. Talk it through as you would
in the interview. Answer aloud.
---
- [ ] Scanning forward from every day is O(n²), about 5·10⁹ steps for 10⁵ days: too slow
- [ ] Keep a stack of the indices of days still waiting; their temperatures never rise from bottom to top
- [ ] Each new day pops every colder day on top, and a popped day's answer is today's index minus its own
- [ ] Then today's index is pushed; days still on the stack at the end keep the answer 0
- [ ] That is O(n) in total, because each index is pushed once and popped at most once
