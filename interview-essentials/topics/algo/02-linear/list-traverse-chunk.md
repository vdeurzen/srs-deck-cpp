---
id: linear-list-traverse-chunk
kind: chunk
version: 1
level: 1
tags: [foundations, linked-lists]
requires:
  - linear-list-node
  - cpp-essentials/const-pointer-read-rule
  - cpp-essentials/constexpr-fn-static-assert
expose_ms: 12000
compile:
  harness: |
    constexpr int three() { Node c{2, nullptr}, b{8, &c}, a{5, &b}; return sum(&a); }
    static_assert(three() == 15);
    static_assert(sum(nullptr) == 0);
    int main() {}
elaborate: "Which loop in your own code walks a chain of pointers like this, and what would a null in the middle do to it?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
---

```cpp
struct Node { int value; Node* next; };

constexpr int sum(const Node* head) {
  int s = 0;
  for (const Node* p = head; p != nullptr; p = p->next)
    s += p->value;
  return s;
}
```

---

The **list walk**: start at `head`, stop at null, step through `next`.
It visits every node once.

The condition tests `p`, not `p->next`: stopping when `p->next` is null
skips the last node's value, and dereferences null on an empty list.
