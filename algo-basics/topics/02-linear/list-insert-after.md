---
id: linear-list-insert-after
kind: code
version: 1
level: 2
tags: [linked-lists, pointers]
requires:
  - linear-array-index-contiguity
input: chips
choices:
  c1: ["n->next = p->next;", "n->next = p;", "n->next = nullptr;", "p->next = n->next;"]
compile:
  harness: |
    constexpr int walk() {               // builds 1 -> 3 -> 4, inserts 2 after 1
      Node a{1}, c{3}, d{4}, b{2};
      a.next = &c; c.next = &d;
      insert_after(&a, &b);
      int digits = 0, steps = 0;
      for (Node* q = &a; q; q = q->next) { digits = digits * 10 + q->value; ++steps; }
      return steps == 4 ? digits : -1;
    }
    static_assert(walk() == 1234);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/forward_list/insert_after
---

A singly linked list. Complete the first line so node `n` ends up between
`p` and the node that used to follow `p`.

```cpp
struct Node { int value; Node* next = nullptr; };

constexpr void insert_after(Node* p, Node* n) {
  {{c1::n->next = p->next;}}
  p->next = n;
}
```

---

**Copy `p`'s old successor into `n` first, then point `p` at `n`.** Two
pointer writes and no element moves, so it is O(1) whatever the list's
length.

The order is the bug it prevents: write `p->next = n` first and the
address of the old tail is gone, so the rest of the list is lost.
`n->next = p` builds a cycle, and the walk never ends.
