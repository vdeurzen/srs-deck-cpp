---
id: hashing-probe-lookup-stop
kind: code
version: 1
level: 2
tags: [hashing, open-addressing]
requires:
  - hashing-linear-probe-step
input: chips
choices:
  c1: ["t[i] != 0", "t[i] != key", "i < N", "t[i] == 0"]
compile:
  harness: |
    constexpr std::array<int, N> kT = {0, 0, 0, 3, 11, 19, 0, 7};
    static_assert(contains(kT, 19));     // home 3, found two steps on
    static_assert(contains(kT, 7));
    static_assert(!contains(kT, 27));    // home 3, stops at slot 6
    static_assert(!contains(kT, 2));     // home 2 is empty
    int main() {}
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
---

Look a key up in the linear-probing table from the insert Card (`0` is
an empty slot, home slot `key % N`, 8 slots). Complete the loop
condition.

```cpp
#include <array>

constexpr int N = 8;
constexpr bool contains(const std::array<int, N>& t, int key) {
  int i = key % N;
  while ({{c1::t[i] != 0}}) {
    if (t[i] == key) return true;
    i = (i + 1) % N;
  }
  return false;
}
```

---

**Probe until an empty slot: reaching one proves the key is absent.**
Insert walks the same sequence and takes the first empty slot, so a
present key always sits before the first gap of its run.

`i < N` never fails once `i` wraps, so a missing key loops forever. The
stop rule is also why deletion cannot simply empty a slot.
