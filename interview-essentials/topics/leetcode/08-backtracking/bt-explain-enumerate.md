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
- [ ] After the call returns, unmark the item and remove it from the path, so the next choice starts clean
- [ ] Any position may take any remaining item, so a used mark, not a subsets-style start index, tracks what is taken
- [ ] Only a full-length path is an ordering, so copy it out there and return
- [ ] There are n! orderings, each copied in O(n): O(n · n!), so only small n is viable
