---
id: bt-explain-enumerate
kind: explain
version: 2
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
- [ ] Cue: the output is every subset, combination or ordering, not one best answer or a count
- [ ] Pattern: depth-first over a decision tree: choose an item, recurse on the rest, then undo the choice
- [ ] Example: Subsets, every subset of distinct integers: the same template with a start index instead of a used mark
- [ ] Cost: exponential output: n! orderings or 2ⁿ subsets, times n to copy each one out
- [ ] Look-alike: counting the combinations instead shares subproblems, so a DP table answers in polynomial time
