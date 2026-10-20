---
id: linear-stack-array-code
kind: code
version: 1
level: 2
tags: [foundations, stacks, arrays]
requires:
  - interview-essentials/linear-stack-adt
input: chips
choices:
  c1: ["--n", "n--", "n", "n - 1"]
compile:
  harness: |
    constexpr int run() {
      Stack s; s.push(4); s.push(9); s.push(1);
      int r = s.pop();             // 1
      r = r * 10 + s.pop();        // 9
      s.push(7);
      r = r * 10 + s.pop();        // 7
      r = r * 10 + s.pop();        // 4
      return r * 10 + s.n;         // 0 left
    }
    static_assert(run() == 19740);
    int main() {}
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1 (stacks and queues)
---

A stack stored in an array: the elements are `a[0..n)`, and the newest
is the last used slot. Complete `pop`.

```cpp
struct Stack {
  int a[8] = {};
  int n = 0;
  constexpr void push(int x) { a[n++] = x; }
  constexpr int pop() { return a[{{c1::--n}}]; }
};
```

---

**Shrink first, then read: the top is `a[n - 1]`, and afterwards `n`
is one smaller.** The top lives at the end, so push and pop shift
nothing: O(1).

`n--` reads `a[n]`, the free slot just past the top. `n - 1` reads the
right value but never removes it, so every pop returns the same top.
