---
id: technique-permutations-count
kind: code
version: 1
level: 2
tags: [backtracking, recursion]
requires:
  - technique-backtracking-undo
input: chips
choices:
  c1: ["used[i] = false;", "used[i] = true;", "used[placed] = false;", "used[0] = false;"]
compile:
  harness: |
    static_assert(perms(1) == 1);
    static_assert(perms(3) == 6);
    static_assert(perms(4) == 24);
    static_assert(perms(5) == 120);
    int main() {}
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Backtracking
---

`count` tries every unused item in the next position and counts the
complete arrangements. Complete the line after the recursive call.

```cpp
#include <array>
constexpr int count(int n, int placed, std::array<bool, 8>& used) {
  if (placed == n) return 1;
  int total = 0;
  for (int i = 0; i < n; ++i) {
    if (used[i]) continue;
    used[i] = true;
    total += count(n, placed + 1, used);
    {{c1::used[i] = false;}}
  }
  return total;
}
constexpr int perms(int n) { std::array<bool, 8> used{}; return count(n, 0, used); }
```

---

The recursion leaves `used[i]` set; clearing it returns the array to the
state the loop expects for the next `i`. n choices, then n − 1, … gives
n! leaves, which is why exhaustive backtracking is only for small n.
