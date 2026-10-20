---
id: linear-doubly-unlink-code
kind: code
version: 1
level: 2
tags: [foundations, linked-lists]
requires:
  - linear-list-node
  - cpp-essentials/constexpr-fn-static-assert
input: chips
choices:
  c1: ["x->prev->next = x->next; x->next->prev = x->prev;", "x->prev->next = x->next; x->next->prev = x;", "x->prev->next = x->next; x->prev->prev = x->next;", "x->prev = x->next; x->next = x->prev;"]
compile:
  harness: |
    constexpr int walk() {               // 1 <-> 2 <-> 3, then unlink the 2
      Node a{1, nullptr, nullptr}, b{2, nullptr, nullptr}, c{3, nullptr, nullptr};
      a.next = &b; b.prev = &a; b.next = &c; c.prev = &b;
      unlink(&b);
      int fwd = 0, back = 0, steps = 0;
      for (Node* q = &a; q && steps < 6; q = q->next, ++steps) fwd = fwd * 10 + q->value;
      steps = 0;
      for (Node* q = &c; q && steps < 6; q = q->prev, ++steps) back = back * 10 + q->value;
      return fwd * 1000 + back;
    }
    static_assert(walk() == 13031);      // forward 1 3, backward 3 1
    int main() {}
elaborate: "Why does a singly linked list need the predecessor handed to it for the same removal, and what does that cost the caller?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
  - https://en.cppreference.com/w/cpp/container/list/erase
---

In a doubly linked list every node also points back at its predecessor.
Node `x` has a neighbour on each side. Complete its removal.

```cpp
struct Node { int value; Node* prev; Node* next; };

constexpr void unlink(Node* x) {
  {{c1::x->prev->next = x->next; x->next->prev = x->prev;}}
}
```

---

**Each neighbour now points at the other: forward past `x`, and back
past `x`.** Two writes, whatever the list's length, and `x` itself is enough: the back pointer
is what lets a doubly linked list remove a node without a walk to find
its predecessor.

Fix only `next` and a backward walk still visits the removed node.
Rewiring `x`'s own pointers changes nothing its neighbours can see.
