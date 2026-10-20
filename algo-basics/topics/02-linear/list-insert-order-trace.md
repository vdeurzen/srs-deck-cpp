---
id: linear-list-insert-order-trace
kind: trace
version: 2
level: 2
tags: [foundations, linked-lists, tracing, misconception]
requires:
  - linear-list-insert-held
probes:
  1: { "n.next->value": "20", "30 reachable from a": "false" }
elaborate: Where in your own code do two writes share a location, so that the second reads what the first just overwrote?
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
  - https://en.cppreference.com/w/cpp/container/forward_list/insert_after
---

Many expect the order of the two pointer writes in a list insertion not
to matter. Node `n` (value 20) is inserted between node `a` (10) and node
`c` (30) with these two writes.

```cpp
struct Node { int value; Node* next; };

int main() {
  Node c{30, nullptr}, a{10, &c};   // list: 10 -> 30
  Node n{20, nullptr};
  Node* p = &a;                     // insert n after p

  p->next = &n;
  n.next = p->next;
  // @1
}
```

---

The second write reads `p->next` **after** the first overwrote it, so
`n` points to itself: 10 → 20 → 20 → … and the 30 is unreachable.

The order matters: save the successor first (`n.next = p->next`), then
link `p->next = &n`. Both writes are O(1) either way; only one order is
correct.

(Values from running it under GCC 16.2.)
