---
id: algmix-stretch-spells-potions
kind: code
version: 1
level: 5
tags: [algorithms, choosing, stretch]
input: chips
choices:
  c1:
    - "std::ranges::sort(potions);"
    - "std::ranges::sort(potions, [](long long a, long long b) { return a > b; });"
    - "std::ranges::sort(potions, {}, [](long long p) { return -p; });"
  c2:
    - "potions.end() - std::ranges::lower_bound(potions, success, {}, [s](long long p) { return s * p; })"
    - "std::ranges::lower_bound(potions, success, {}, [s](long long p) { return s * p; }) - potions.begin()"
    - "potions.end() - std::ranges::upper_bound(potions, success, {}, [s](long long p) { return s * p; })"
    - "potions.end() - std::ranges::lower_bound(potions, success / s)"
compile:
  harness: |
    static_assert(strong_pairs(3, {5, 1, 3, 4, 2}, 7) == 3);
    static_assert(strong_pairs(3, {5, 1, 3, 4, 2}, 9) == 3);
    static_assert(strong_pairs(2, {5, 1, 3, 4, 2}, 7) == 2);
    static_assert(strong_pairs(1, {5, 1, 3, 4, 2}, 6) == 0);
    static_assert(strong_pairs(5, {5, 1, 3, 4, 2}, 1) == 5);
    int main() {}
requires:
  - srch-count-at-most-code
  - rng-projection-code
elaborate: Say what changes when there are 10⁵ spells, and why the sort should then happen once rather than per spell.
refs:
  - https://leetcode.com/problems/successful-pair-of-spells-and-potions/
  - https://en.cppreference.com/w/cpp/algorithm/ranges/lower_bound
---

Successful Pairs of Spells and Potions: a spell of strength `s > 0` and
a potion `p > 0` succeed when `s * p ≥ success`. Complete
`strong_pairs` so it counts the potions that succeed with spell `s`,
first preparing `potions`, then counting.

```cpp
#include <algorithm>
#include <vector>
constexpr long strong_pairs(long long s, std::vector<long long> potions,
                            long long success) {
    {{c1::std\::ranges\::sort(potions);}}
    return {{c2::potions.end() - std\::ranges\::lower_bound(potions, success, {}, [s](long long p) { return s * p; })}};
}
```

---

**Sort ascending, then the first potion with `s * p ≥ success` starts the run that succeeds.**
Ascending potions give ascending products, so `lower_bound` on the
projection `s * p` finds that first potion, and everything from it to
`end()` counts. Descending order breaks lower_bound's precondition.
`lower_bound - begin` counts the failures; `upper_bound` misses
`s * p == success`; `success / s` rounds down (7 / 2 = 3, yet 2 · 3 < 7).
