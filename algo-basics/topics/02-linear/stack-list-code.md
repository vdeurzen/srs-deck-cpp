---
id: linear-stack-list-code
kind: code
version: 1
level: 2
tags: [foundations, stacks, linked-lists]
requires:
  - interview-essentials/linear-stack-adt
  - interview-essentials/linear-list-node
input: chips
choices:
  c1: ["head", "nullptr", "head->next", "n"]
compile:
  harness: |
    constexpr int run() {
      Node x{4, nullptr}, y{9, nullptr}, z{1, nullptr};
      Stack s; s.push(&x); s.push(&y);
      int r = s.pop();             // 9
      s.push(&z);
      r = r * 10 + s.pop();        // 1
      r = r * 10 + s.pop();        // 4
      return r * 10 + (s.head == nullptr);
    }
    static_assert(run() == 9141);
    int main() {}
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
---

A stack stored as a singly linked list whose first node is the top.
The caller supplies each node. Complete `push`.

```cpp
struct Node { int value; Node* next; };

struct Stack {
  Node* head = nullptr;
  constexpr void push(Node* n) { n->next = {{c1::head}}; head = n; }
  constexpr int pop() { int v = head->value; head = head->next; return v; }
};
```

---

**The new node points at the old top, then becomes the head.** Both
operations touch only the front of the list: O(1), with no capacity to
run out of.

`nullptr` cuts off everything below the new node; `head->next` skips
the old top (and dereferences null on an empty stack).
