---
id: list-explain-cycle
kind: explain
version: 2
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
- [ ] Start two pointers at the head: each step, slow moves one node and fast moves two
- [ ] With no loop, the fast pointer reaches null, so the answer is no
- [ ] Once both pointers are inside a loop, fast gains one node per step, so the gap closes and they meet
- [ ] Two pointers take O(n) time and O(1) space, where a set of visited nodes costs O(n) memory
- [ ] (empty: tick this)
