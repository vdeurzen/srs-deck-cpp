---
id: technique-recursion-base-case
kind: code
version: 1
level: 1
tags: [recursion]
input: chips
choices:
  c1: ["n < 10", "n == 0", "n <= 10", "n < 1"]
compile:
  harness: |
    static_assert(digits(0) == 1);
    static_assert(digits(7) == 1);
    static_assert(digits(10) == 2);
    static_assert(digits(12'345) == 5);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Recursion_(computer_science)#Base_case
---

`digits(n)` counts the decimal digits of a non-negative `n` by dropping
one digit per call. Complete the base case.

```cpp
constexpr int digits(int n) {
  if ({{c1::n < 10}}) return 1;
  return 1 + digits(n / 10);
}
```

---

A recursion needs two things: a **base case** answered directly, and a
**step** that moves every input closer to it. Here `n / 10` drops a digit
and every one-digit number (0 included) is the base. `n == 0` looks
natural but recurses one call past the last digit: `digits(7)` becomes 2.
