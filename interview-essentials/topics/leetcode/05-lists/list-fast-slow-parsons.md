---
id: list-fast-slow-parsons
kind: parsons
version: 1
level: 2
tags: [linked-lists, fast-slow-pointers, cycle-detection, lc-141, lc-876]
distractors:
  - "  while (fast->next && fast) {"
  - "  while (fast) {"
compile:
  harness: |
    constexpr bool run(int len, int back_to) {   // len nodes; the last links to n[back_to], or null if -1
      Node n[6]{};
      for (int i = 0; i < len; ++i)
        n[i] = {i, i + 1 < len ? &n[i + 1] : back_to >= 0 ? &n[back_to] : nullptr};
      return has_cycle(&n[0]);
    }
    static_assert(!has_cycle(static_cast<Node*>(nullptr)));
    static_assert(!run(1, -1) && !run(2, -1) && !run(5, -1) && !run(6, -1));
    static_assert(run(1, 0) && run(2, 0) && run(5, 1) && run(4, 3) && run(6, 0));
    int main() {}
requires:
  - linear-list-traverse-chunk
  - list-fast-slow-worked
refs:
  - https://leetcode.com/problems/linked-list-cycle/
  - https://leetcode.com/problems/middle-of-the-linked-list/
  - Knuth, The Art of Computer Programming, Vol. 2, 3rd ed., §3.1, exercise 6 (Floyd's cycle-finding)
elaborate: Middle of the Linked List (LC 876) returns the middle node, the second one on an even length. The loop is the same with the `if` removed. What do you return, and do you get the second middle?
---

Linked List Cycle (LC 141): does the list contain a cycle, some node
whose `next` leads back to an earlier node? Use O(1) extra memory.
Order the lines.

```cpp
struct Node { int val; Node* next; };
constexpr bool has_cycle(Node* head) {
  Node *slow = head, *fast = head;
  while (fast && fast->next) {
    slow = slow->next;  fast = fast->next->next;
    if (slow == fast) return true;
  }
  return false;
}
```

---

**Floyd's tortoise and hare.** `slow` takes one step, `fast` two. On a
list that ends, `fast` reaches null first. On a cycle, once both are
inside, the gap closes by one node per step, so they meet within one
lap: O(n) time and O(1) space, where a visited set costs O(n) memory.

The two moves are independent, so they share one line. The comparison
comes after both: before them, `slow == fast` is
true at the head. The guard tests `fast` before `fast->next`, because
`&&` evaluates left to right and `fast` itself may be null; both hops
must exist, so `while (fast)` alone dereferences null on an even
length. `slow` needs no test: it walks nodes `fast` has already passed.
Remove the `if` and return `slow` after the loop for the middle node
(Middle of the Linked List, LC 876). On LC the node type is `ListNode`.
