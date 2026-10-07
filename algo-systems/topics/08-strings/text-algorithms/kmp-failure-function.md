---
id: str-kmp-failure-function
kind: code
version: 1
level: 4
tags: [strings, automata, invariants]
input: chips
choices:
  c1: ["f[k - 1]", "f[k]", "k - 1", "0"]
compile:
  harness: |
    static_assert(failure_of("ababaca") ==
                  std::array<std::size_t, 7>{0, 0, 1, 2, 3, 0, 1});
    static_assert(failure_of("aaaaaaa") ==
                  std::array<std::size_t, 7>{0, 1, 2, 3, 4, 5, 6});
    static_assert(failure_of("abcdabd") ==
                  std::array<std::size_t, 7>{0, 0, 0, 0, 1, 2, 0});
    // Patterns whose border chain has two steps: the fallback has to walk
    // it, not reset and not guess.
    static_assert(failure_of("ababaab") ==
                  std::array<std::size_t, 7>{0, 0, 1, 2, 3, 1, 2});
    static_assert(failure_of("aabaaab") ==
                  std::array<std::size_t, 7>{0, 1, 0, 1, 2, 2, 3});
    int main() {}
requires:
  - str-naive-matching
refs:
  - https://epubs.siam.org/doi/10.1137/0206024
  - https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
---

`f[i]` is the length of the longest proper prefix of `p[0..i]` that is
also a suffix of it. Complete the fallback taken when the characters
disagree.

```cpp
#include <array>
#include <cstddef>
#include <string_view>

constexpr std::array<std::size_t, 7> failure_of(std::string_view p) {
  std::array<std::size_t, 7> f{};
  std::size_t k = 0;                       // length of the current border
  for (std::size_t i = 1; i < p.size(); ++i) {
    while (k > 0 && p[i] != p[k]) k = {{c1::f[k - 1]}};
    if (p[i] == p[k]) ++k;
    f[i] = k;
  }
  return f;
}
```

---

`k` is the length of the border matched so far, so the next shorter
border of that prefix is `f[k−1]`. `f[k]` is the classic off-by-one: it
describes a prefix one character longer. `k − 1` guesses instead of
walking the border chain, and `0` throws borders away; the two-step
harness patterns catch both.

The table is KMP run on the pattern against itself; the search runs the
same loop against the text, never moving the text pointer backwards,
which is what lets it scan a stream.
