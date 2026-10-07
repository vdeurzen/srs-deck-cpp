---
id: technique-tail-call-loop
kind: code
version: 1
level: 2
tags: [recursion]
requires:
  - technique-recursion-depth
input: chips
choices:
  c1: ["acc += n; --n;", "--n; acc += n;", "acc += n;", "acc = n; --n;"]
compile:
  harness: |
    static_assert(sum_loop(0) == sum_rec(0));
    static_assert(sum_loop(10) == sum_rec(10));
    static_assert(sum_loop(100) == sum_rec(100));
    static_assert(sum_loop(100'000) == 5'000'050'000);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Tail_call
  - https://gcc.gnu.org/onlinedocs/gcc/Optimize-Options.html
---

`sum_rec` ends in a **tail call**: nothing is left to do after the
recursive call returns. Rewrite it as a loop: complete the body so the
parameters update exactly as the call would update them.

```cpp
constexpr long sum_rec(long n, long acc = 0) {
  return n == 0 ? acc : sum_rec(n - 1, acc + n);
}
constexpr long sum_loop(long n) {
  long acc = 0;
  while (n != 0) { {{c1::acc += n; --n;}} }
  return acc;
}
```

---

A tail call passes new argument values and returns the result unchanged,
so it is a jump back to the top: the parameters become loop variables,
updated from their **old** values (`acc + n` uses the old n). GCC may do
this itself at `-O2` (`-foptimize-sibling-calls`), but C++ does not
guarantee it, so at `-O0` a deep tail recursion still overflows.
