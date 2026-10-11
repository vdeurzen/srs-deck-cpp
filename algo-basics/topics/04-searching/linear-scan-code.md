---
id: search-linear-scan-code
kind: code
version: 1
level: 1
tags: [foundations, linear-search]
input: chips
choices:
  c1:
    - "if (a[i] == key) return i;"
    - "if (a[i] == key) return i; else return -1;"
    - "if (a[i] != key) return -1;"
    - "if (a[i] == key) break;"
compile:
  harness: |
    inline constexpr int kA[] = {7, 3, 9, 3, 5};
    static_assert(find_index(kA, 7) == 0);
    static_assert(find_index(kA, 9) == 2);
    static_assert(find_index(kA, 3) == 1);   // first of two
    static_assert(find_index(kA, 5) == 4);
    static_assert(find_index(kA, 4) == -1);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Linear_search
  - https://en.cppreference.com/w/cpp/algorithm/find
---

Return the index of the first element equal to `key`, or -1 when no
element is. The array is in no particular order. Complete the loop body.

```cpp
#include <span>

constexpr int find_index(std::span<const int> a, int key) {
  for (int i = 0; i < (int)a.size(); ++i) {
    {{c1::if (a[i] == key) return i;}}
  }
  return -1;
}
```

---

**Return on the first match; only after the loop is "absent" proven.**
One unequal element says nothing about the others, so `else return -1`
gives up after looking at `a[0]`. `break` leaves the loop but then falls
through to `return -1` even when the key was found.
