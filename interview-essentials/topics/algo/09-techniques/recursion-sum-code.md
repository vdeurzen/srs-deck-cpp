---
id: technique-recursion-sum-code
kind: code
version: 1
level: 1
tags: [foundations, recursion]
requires:
  - technique-call-stack-trace
  - cpp-essentials/constexpr-fn-static-assert
  - cpp-essentials/std-names-and-headers
elaborate: Say in one sentence, as to an interviewer, what makes a recursive step safe to call, and what breaks if it is not.
input: chips
choices:
  c1:
    - "a[n - 1] + sum(a, n - 1)"
    - "a[n] + sum(a, n - 1)"
    - "a[n - 1] + sum(a, n)"
    - "a[0] + sum(a, n - 1)"
compile:
  harness: |
    inline constexpr int kA[] = {4, 1, 7, 2};
    static_assert(sum(kA, 0) == 0);
    static_assert(sum(kA, 1) == 4);
    static_assert(sum(kA, 4) == 14);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Recursion_(computer_science)
---

`sum(a, n)` adds up the first `n` elements of `a` (`std::span<const int>`
is a read-only view of an int array: a pointer plus a length). Complete
the line for every other `n`.

```cpp
#include <span>

constexpr int sum(std::span<const int> a, int n) {
  if (n == 0) return 0;
  return {{c1::a[n - 1] + sum(a, n - 1)}};
}
```

---

**Take the last element of the prefix, add the sum of the rest.** A
recursive function is a **base case** answered without recursion plus a
**step** whose call is on a smaller input. `sum(a, n)` inside the step
never shrinks and never stops; `a[n]` reads one past the prefix;
`a[0]` adds the first element n times.
