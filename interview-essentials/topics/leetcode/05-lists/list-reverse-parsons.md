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
    struct Node;
    struct Link {                    // Node* that counts how often it is read
      Node* p;  int* reads;
      constexpr operator Node*() const { ++*reads; return p; }
      constexpr Link& operator=(Node* q) { p = q; return *this; }
    };
    struct Node { int val; Link next; };
    constexpr bool three() {
      int r = 0;
      Node n[3] = {{1, {&n[1], &r}}, {2, {&n[2], &r}}, {3, {nullptr, &r}}};   // 1 -> 2 -> 3
      Node* h = reverse(&n[0]);
      const int reads = r;           // one per node: the save; an extra read is an extra line
      return reads == 3 && h == &n[2] && n[2].next == &n[1] && n[1].next == &n[0]
          && n[0].next == nullptr;
    }
    static_assert(three());
    constexpr bool one() {
      int r = 0;
      Node a{7, {nullptr, &r}};
      return reverse(&a) == &a && r == 1 && a.next == nullptr;
    }
    static_assert(one());
    struct Plain { int val; Plain* next; };   // and a plain node, as on LC
    constexpr bool two() {
      Plain n[2] = {{1, &n[1]}, {2, nullptr}};
      return reverse(&n[0]) == &n[1] && n[1].next == &n[0] && n[0].next == nullptr;
    }
    static_assert(two());
    static_assert(reverse(static_cast<Plain*>(nullptr)) == nullptr);
    int main() {}
requires:
  - linear-list-node
  - cpp-essentials/tmpl-why-template
  - cpp-essentials/constexpr-fn-static-assert
refs:
  - https://leetcode.com/problems/reverse-linked-list/
  - https://leetcode.com/problems/reverse-linked-list-ii/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 3rd ed., exercise 10.2-7
elaborate: Reverse Linked List II (LC 92) reverses only positions `left` through `right`, counted from 1. What replaces `while (cur)` so the loop flips exactly `right - left + 1` nodes, and where does `cur` point when it stops?
---

Reverse Linked List (LC 206): reverse a singly linked list in place and
return the new head. Order the lines.

```cpp
template <typename Node> constexpr Node* reverse(Node* head) {
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
`cur->next` leads backwards. On LC the node type is `ListNode`.
