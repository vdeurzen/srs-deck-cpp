---
id: hashing-probe-lookup-stop
kind: code
version: 1
level: 2
tags: [hashing, open-addressing]
input: chips
choices:
  c1: ["t[i] != 0", "t[i] != 0 && t[i] != key", "i < N", "t[i] == 0"]
compile:
  harness: |
    constexpr std::array<int, N> kT = {0, 0, 0, 3, 11, 19, 0, 7};
    static_assert(contains(kT, 19));     // home 3, found two steps on
    static_assert(contains(kT, 7));
    static_assert(contains(kT, 3));      // in its home slot
    static_assert(!contains(kT, 27));    // home 3, stops at slot 6
    static_assert(!contains(kT, 2));     // home 2 is empty
    int main() {}
elaborate: "Why must insert and lookup follow exactly the same probe sequence? Say what breaks if they differ."
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
requires:
  - hashing-probe-lookup-worked
  - cpp-essentials/iter-array-fixed-size
  - cpp-essentials/constexpr-fn-static-assert
---

A linear-probing table has 8 slots; `0` marks an empty slot. Insert and
lookup both start at the home slot `key % N` and step to the next slot,
wrapping. Complete the lookup's loop condition.

```cpp
#include <array>

constexpr int N = 8;
constexpr bool contains(std::array<int, N> t, int key) {
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
Insert takes the first empty slot on the same sequence, so a present
key always sits before the first gap of its run.

`i < N` is always true because `i` is wrapped, so a missing key loops
forever. `t[i] != 0 && t[i] != key` leaves the loop on a match before
the `if` can report it. The stop rule is also why deletion cannot
simply empty a slot.
