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

`k` is the length of the border matched so far, so the character to
compare against is `p[k]` and the *next shorter* border of that prefix
is `f[k−1]` — the classic off-by-one, and the reason `f[k]` (which is
about a prefix one character longer) is wrong. Falling back repeatedly
enumerates all borders of the prefix, longest first, which is exactly
what the loop does.

The whole algorithm is here, twice over. The table is built by running
KMP **on the pattern against itself**, and the search does the same
thing against the text: on a mismatch, slide the pattern so its longest
border lines up, never moving the text pointer backwards. That gives
O(n + m) with no backtracking in the input — the property that matters
for a streaming matcher, which cannot re-read what it has already
consumed.

The amortisation argument is worth being able to state: `k` increases
by at most one per character of input, so the total number of times the
`while` loop decreases it is bounded by the number of increments. The
inner loop can run many times at one position, but its total over the
whole run is at most the number of characters.

Read the table as an **automaton** and you have the bridge to the rest
of this topic: state `k` means "k characters matched", the failure link
is the transition for every character that does not extend the match,
and generalising it from one pattern to a set of patterns — a trie plus
failure links — is Aho–Corasick.
