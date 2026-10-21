---
id: mono-explain-stack
kind: explain
version: 2
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
- [ ] Cue: for every element, the next or previous element that is greater, or smaller
- [ ] Pattern: each new element pops and answers every waiting index on the stack that it beats
- [ ] Example: Largest Rectangle in Histogram uses the same stack to find each bar's nearest shorter bars
- [ ] Cost: O(n), because each index is pushed once and popped at most once
- [ ] Look-alike: the maximum of every k-element window also expires old indices from the front, so it needs a deque
