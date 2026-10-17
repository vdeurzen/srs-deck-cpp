---
id: linear-list-delete-after-code
kind: code
version: 1
level: 2
tags: [foundations, linked-lists]
requires:
  - interview-essentials/linear-list-node
input: chips
choices:
  c1: ["p->next->next", "p->next", "nullptr", "p"]
compile:
  harness: |
    constexpr int walk() {               // 1 -> 2 -> 3 -> 4, then unlink the 2
      Node d{4}, c{3, &d}, b{2, &c}, a{1, &b};
      erase_after(&a);
      int digits = 0, steps = 0;
      for (Node* q = &a; q && steps < 9; q = q->next, ++steps) digits = digits * 10 + q->value;
      return digits;
    }
    static_assert(walk() == 134);
    int main() {}
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
  - https://en.cppreference.com/w/cpp/container/forward_list/erase_after
---

A singly linked list. Remove the node that follows `p` (it has one), so
the list skips over it.

```cpp
struct Node { int value; Node* next = nullptr; };

constexpr void erase_after(Node* p) {
  p->next = {{c1::p->next->next}};
}
```

---

**Point `p` past the doomed node, at that node's successor.** One
pointer write: O(1). Real code saves the old `p->next` first so it can
free it.

It removes the node *after* `p` because a singly linked node cannot
reach its predecessor. `nullptr` drops the whole tail; `p` makes a
one-node cycle.
