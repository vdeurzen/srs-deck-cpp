---
id: list-fast-slow-trace
kind: trace
version: 1
level: 3
tags: [linked-lists, tracing]
probes:
  1: { slow: "3", fast: "5" }
  2: { slow: "4", fast: "3" }
  3: { slow: "5", fast: "5" }
requires:
  - list-fast-slow-worked
refs:
  - https://leetcode.com/problems/linked-list-cycle/
  - Knuth, The Art of Computer Programming, Vol. 2, 3rd ed., §3.1, exercise 6
elaborate: Say in one sentence, as to an interviewer, why `fast` is allowed to fall behind `slow` in the loop without breaking the method.
---

`1 → 2 → 3 → 4 → 5`, and 5's `next` is 2. Each probe is read after its
`step()` returns. Write each pointer as the value of the node it points at.

```cpp
struct Node { int val; Node* next; };
Node* slow = one;   // one points at the node holding 1
Node* fast = one;
void step() { slow = slow->next; fast = fast->next->next; }
int main() {
  step();
  step();   // @1
  step();   // @2
  step();   // @3
}
```

---

After two steps `fast` is at 5 and `slow` at 3, both inside the loop
2 → 3 → 4 → 5. Step 3 wraps `fast` from 5 through 2 to 3, one node behind
`slow` at 4. Fast gains one node per step, so step 4 closes that gap:
both land on 5, and `slow == fast` reports the loop.

Values from running it under GCC 16.2.
