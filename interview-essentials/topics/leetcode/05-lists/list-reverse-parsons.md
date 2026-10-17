---
id: list-reverse-parsons
kind: parsons
version: 1
level: 2
tags: [linked-lists, in-place-reversal, lc-206, lc-92]
distractors:
  - "    cur = cur->next;"
  - "  return cur;"
compile:
  harness: |
    struct Node { int val; Node* next; };
    constexpr bool three() {
      Node n[3] = {{1, &n[1]}, {2, &n[2]}, {3, nullptr}};   // 1 -> 2 -> 3
      Node* h = reverse(&n[0]);
      return h == &n[2] && n[2].next == &n[1] && n[1].next == &n[0] && n[0].next == nullptr;
    }
    static_assert(three());
    constexpr bool two() {
      Node n[2] = {{1, &n[1]}, {2, nullptr}};
      return reverse(&n[0]) == &n[1] && n[1].next == &n[0] && n[0].next == nullptr;
    }
    static_assert(two());
    constexpr bool onto() {                                 // reverse 1 -> 2 onto 9: 2 -> 1 -> 9
      Node tail{9, nullptr};
      Node n[2] = {{1, &n[1]}, {2, nullptr}};
      return reverse(&n[0], &tail) == &n[1] && n[0].next == &tail;
    }
    static_assert(onto());
    constexpr bool one() { Node a{7, nullptr}; return reverse(&a) == &a && a.next == nullptr; }
    static_assert(one());
    static_assert(reverse(static_cast<Node*>(nullptr)) == nullptr);
    int main() {}
requires:
  - linear-list-node
refs:
  - https://leetcode.com/problems/reverse-linked-list/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 3rd ed., exercise 10.2-7
elaborate: LC 92 reverses only positions left..right. Which node do you pass as `prev` so the reversed piece comes out already joined to the rest?
---

LC 206: reverse a singly linked list in place. `prev` heads the part
already reversed; it defaults to null, the end of the new list. Order
the lines.

```cpp
template <class Node> constexpr Node* reverse(Node* cur, Node* prev = nullptr) {
  while (cur) {
    Node* next = cur->next;
    cur->next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}
```

---

**In-place reversal: save, flip, advance `prev`, advance `cur`.**
Invariant: `prev` heads the reversed part, `cur` the untouched rest, and
each pass moves one node across. O(n) time, O(1) space.

`next` is saved first because the flip `cur->next = prev` overwrites the
only link to the rest. `prev = cur` must come before `cur = next`, or
the node just flipped is lost. Return `prev`: at the end `cur` is null.
The first distractor is what happens without the save: after the flip,
`cur->next` leads backwards. Passing a non-null `prev` reverses the list
*onto* it, which is the splice LC 92 and LC 25 need.
