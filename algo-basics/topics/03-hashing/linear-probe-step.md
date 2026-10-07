---
id: hashing-linear-probe-step
kind: code
version: 1
level: 2
tags: [hashing, open-addressing]
requires:
  - hashing-open-addressing
input: chips
choices:
  c1: ["(i + 1) % N", "i + 1", "(key + 1) % N", "(i * 2) % N"]
compile:
  harness: |
    constexpr std::array<int, 5> slots() {
      std::array<int, N> t{};
      std::array<int, 5> where{};
      const int keys[] = {3, 11, 19, 7, 15};
      for (int j = 0; j < 5; ++j) where[j] = insert(t, keys[j]);
      return where;
    }
    static_assert(slots()[0] == 3);
    static_assert(slots()[1] == 4);   // 11 % 8 == 3, taken
    static_assert(slots()[2] == 5);   // 19 % 8 == 3, taken twice
    static_assert(slots()[3] == 7);
    static_assert(slots()[4] == 0);   // 15 % 8 == 7, wraps round
    int main() {}
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
  - https://abseil.io/about/design/swisstables
---

An open-addressing table of 8 slots, where `0` marks an empty slot and
a key's home slot is `key % N`. Complete the step taken when a slot is
already occupied.

```cpp
#include <array>

constexpr int N = 8;
constexpr int insert(std::array<int, N>& t, int key) {   // returns the slot
  int i = key % N;
  while (t[i] != 0) i = {{c1::(i + 1) % N}};
  t[i] = key;
  return i;
}
```

---

**Linear probing: try the next slot, wrapping at the end.** Keys 3, 11
and 19 share home slot 3 and land in 3, 4, 5; key 15's home slot 7 is
taken, so it wraps to 0.

Without the `% N`, the probe walks off the end of the array. And the
table must never be completely full, or the loop never ends.
