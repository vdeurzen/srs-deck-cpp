---
id: list-explain-cycle
kind: explain
version: 1
level: 4
tags: [linked-lists, interview, lc-141]
requires:
  - list-fast-slow-intro
  - list-fast-slow-worked
  - list-fast-slow-parsons
refs:
  - https://leetcode.com/problems/linked-list-cycle/
  - Knuth, The Art of Computer Programming, Vol. 2, 3rd ed., §3.1, exercise 6
elaborate: Where else does "follow next until you repeat" appear, such as a function iterated on its own output or a chain of redirects, and would the same two pointers work there?
---
An interviewer hands you the head of a singly linked list and asks
whether following `next` ever comes back to a node already seen. Then
they ask you to do it without memory that grows with the list. Talk it
through. Answer aloud.
---
- [ ] Cue: following `next` from a start might revisit a node, and memory must stay constant
- [ ] Pattern: slow moves one node, fast two; they meet inside a loop, fast reaches null otherwise
- [ ] Example: on 1 → 2 → 3 → 4 with 4 linking back to 2, they meet at 4 after three steps
- [ ] Cost: O(n) time, O(1) space: inside the loop the gap shrinks by one per step
- [ ] Look-alike: a visited set of nodes also finds the loop, but costs O(n) memory
