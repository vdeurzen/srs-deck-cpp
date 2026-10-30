---
id: linear-explain-stack-two-ways
kind: explain
version: 1
level: 2
tags: [foundations, stacks, arrays, linked-lists, capstone]
requires:
  - linear-stack-array-code
  - linear-stack-list-code
  - interview-essentials/linear-dynamic-array-growth
elaborate: Which of the two would you choose for a stack that a real-time thread pushes to, where no single push may be slow, and why?
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1–10.2
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---
An interviewer asks how you would build a stack of ints on an array and
on a singly linked list, and how the two compare. Answer aloud.
---
- [ ] On an array the top is `a[n-1]`: push writes `a[n]` and increments `n`, pop decrements `n`; nothing shifts
- [ ] Array push is amortised O(1): when full it copies into a block a constant factor larger
- [ ] On a list the top is the head: push links a new node before it, pop advances `head`; O(1) always
- [ ] The list pays an allocation and a `next` pointer per element, scattered; the array's elements are contiguous
- [ ] Popping an empty stack violates the precondition in both: the array reads `a[-1]`, the list dereferences null
