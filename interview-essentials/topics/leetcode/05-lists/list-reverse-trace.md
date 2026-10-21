---
id: list-reverse-trace
kind: trace
version: 1
level: 3
tags: [linked-lists, tracing]
probes:
  1: { h: "7" }
  2: { second: "4" }
  3: { tail: "null" }
requires:
  - list-reverse-worked
refs:
  - https://leetcode.com/problems/reverse-linked-list/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 3rd ed., exercise 10.2-7
elaborate: Say in one sentence, as to an interviewer, why the reversal needs O(1) extra memory however long the list is.
---

Reversing the two-node list `4 → 7`. A pointer used as a condition is
true when it is not null. Write each pointer as the value of the node it
points at, or null.

```cpp
struct Node { int val; Node* next; };
Node* reverse(Node* head) {
  Node *prev = nullptr, *cur = head;
  while (cur) {
    Node* next = cur->next;
    cur->next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}
// a holds 4 and b holds 7; a.next is &b, b.next is null
Node* h = reverse(&a);    // @1
Node* second = h->next;   // @2
Node* tail = a.next;      // @3
```

---

Pass 1 flips 4 to point at null, since `prev` starts null; pass 2 flips
7 to point at 4. `cur` then falls off the end, so the new head is
`prev`, the node holding 7. The old head 4 is now the tail, and its
`next` is null: the reversed list is `7 → 4`.

Values from running it under GCC 16.2.
