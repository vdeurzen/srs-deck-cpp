---
id: list-reverse-parsons
kind: parsons
version: 1
level: 2
tags: [linked-lists, in-place-reversal, lc-206, lc-92]
distractors:
  - "    cur = cur->next;"
  - "  return cur;"
compile: null # graded by line order: every line has one right place
requires:
  - list-reverse-trace
refs:
  - https://leetcode.com/problems/reverse-linked-list/
  - https://leetcode.com/problems/reverse-linked-list-ii/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 3rd ed., exercise 10.2-7
elaborate: Reverse Linked List II (LC 92) reverses only positions `left` through `right`, counted from 1. What replaces `while (cur)` so the loop flips exactly `right - left + 1` nodes, and where does `cur` point when it stops?
---

Reverse Linked List (LC 206): reverse a singly linked list in place and
return the new head. A node is `struct Node { int val; Node* next; };`,
and a pointer used as a condition is true when it is not null. Order the
lines.

```cpp
Node* reverse(Node* head) {
  Node *prev = nullptr, *cur = head;
  while (cur) {
    Node* next = cur->next;
    cur->next = prev;
    prev = cur;
    cur = next;
  }
  return prev;  }
```

---

**In-place reversal: save, flip, advance `prev`, advance `cur`.**
Invariant: `prev` heads the reversed part, `cur` the untouched rest, and
each pass moves one node across. O(n) time, O(1) space.

`next` is saved first because the flip `cur->next = prev` overwrites the
only link to the rest. `prev = cur` must come before `cur = next`, or
the node just flipped is lost. Return `prev`: at the end `cur` is null.
The first distractor is what happens without the save: after the flip,
`cur->next` leads backwards.
