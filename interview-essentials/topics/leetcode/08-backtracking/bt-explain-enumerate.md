---
id: bt-explain-enumerate
kind: explain
version: 1
level: 3
tags: [recognition, lc-78, lc-39]
requires:
  - bt-subsets-chunk
  - rec-list-vs-count
refs:
  - https://leetcode.com/problems/subsets/
  - https://leetcode.com/problems/combination-sum/
  - https://doi.org/10.1145/321296.321300
elaborate: Where in your own work would you generate every candidate rather than one best one, such as every test configuration, and how large may n get before that stops being viable?
---
An interviewer asks how you recognise, from the statement, a problem
whose answer must be produced by trying choices and undoing them, and
what that costs. Answer aloud.
---
- [ ] Cue: the output is every subset, combination or ordering, not one best answer or a count
- [ ] Pattern: depth-first over a decision tree: choose an item, recurse on the rest, then undo the choice
- [ ] Example: Subsets, every subset of an array of distinct integers
- [ ] Cost: exponential: 2ⁿ subsets, O(n · 2ⁿ) with copying each one out
- [ ] Look-alike: counting the combinations instead shares subproblems, so a DP table answers in polynomial time
