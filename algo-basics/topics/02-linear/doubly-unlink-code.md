---
id: linear-doubly-unlink-code
kind: code
version: 1
level: 2
tags: [foundations, linked-lists]
requires:
  - linear-list-node
input: chips
choices:
  c1: ["x->next->prev = x->prev;", "x->next->prev = x;", "x->prev->prev = x->next;", "x->next->next = x->prev;"]
compile:
  harness: |
    constexpr int walk() {               // 1 <-> 2 <-> 3, then unlink the 2
      Node a{1}, b{2}, c{3};
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
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
  - https://en.cppreference.com/w/cpp/container/list/erase
---

In a doubly linked list every node also points back at its predecessor.
Node `x` has a neighbour on each side. Complete its removal.

```cpp
struct Node { int value; Node* prev = nullptr; Node* next = nullptr; };

constexpr void unlink(Node* x) {
  x->prev->next = x->next;
  {{c1::x->next->prev = x->prev;}}
}
```

---

**Each neighbour now points at the other: forward past `x`, and back
past `x`.** Two writes, O(1), and `x` itself is enough: the back pointer
is what lets a doubly linked list remove a node without a walk to find
its predecessor.

Fix only `next` and a backward walk still visits the removed node.
