---
id: bt-explain-enumerate
kind: explain
version: 3
level: 3
tags: [recognition, interview, lc-46, lc-78]
requires:
  - bt-subsets-chunk
  - bt-permutations-parsons
  - rec-list-vs-count
refs:
  - https://leetcode.com/problems/permutations/
  - https://leetcode.com/problems/subsets/
  - https://leetcode.com/problems/combination-sum/
  - https://doi.org/10.1145/321296.321300
elaborate: Where in your own work would you generate every candidate rather than one best one, such as every test configuration, and how large may n get before that stops being viable?
---
An interviewer says: return every ordering of these distinct integers.
Talk it through as you would in the interview. Answer aloud.
---
- [ ] Build each ordering one position at a time, depth-first: pick an unused item, mark it used, recurse
- [ ] After each recursive call returns, undo the choice: unmark the item and drop it from the partial ordering
- [ ] Once all n items are placed, copy the ordering into the results and return
- [ ] There are n! orderings, each copied in O(n): O(n · n!), so only small n is viable
- [ ] (empty: tick this)
