---
id: linear-explain-stack-two-ways
kind: explain
version: 1
level: 2
tags: [foundations, stacks, arrays, linked-lists, capstone]
requires:
  - linear-stack-array-code
  - linear-stack-list-code
  - linear-dynamic-array-growth
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1–10.2
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---
You need a stack of ints. Explain how you would build it on an array,
and how on a singly linked list, then compare the two.
---
- [ ] Array: the top is the last used slot `a[n-1]`; push writes `a[n]` then increments `n`, pop decrements `n` and reads `a[n]`, so nothing shifts
- [ ] Array push is amortised O(1): when full it copies into a block a constant factor larger, so one push can cost O(n) but n pushes cost O(n) in total
- [ ] List: the top is the head node; push points the new node at the old head and makes it the head, pop advances `head`: O(1) each, even in the worst case
- [ ] The list pays one allocation and one `next` pointer per element, with nodes scattered in memory; the array's elements are contiguous
- [ ] Popping an empty stack is a precondition violation in both: the array reads `a[-1]`, the list dereferences a null `head`
