---
id: hash-trace-robin-hood
kind: trace
version: 3
level: 4
tags: [hashing, open-addressing, tracing]
requires:
  - hash-robin-hood-worked
  - hash-robin-hood
  - interview-essentials/sort-std-swap
probes:
  1: { "key[2]": "5", "key[3]": "2" }
refs:
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
elaborate: A lookup for a missing key can stop early in a Robin Hood table. At which slot, and what tells it to stop?
---

A 4-slot Robin Hood table; a key's home slot is `k % 4`, and `psl`
holds each key's distance from home. Empty slots hold `-1`. Keys 1 and
2 already sit in their home slots.

```cpp
int key[4] = {-1, 1, 2, -1}, psl[4] = {};
void insert(int k) {
  int i = k % 4, d = 0;                    // d: PSL of the key carried
  while (key[i] != -1) {
    if (psl[i] < d) { std::swap(k, key[i]); std::swap(d, psl[i]); }
    i = (i + 1) % 4; ++d;
  }
  key[i] = k; psl[i] = d;
}
int main() { insert(5); }   // @1
```

---

5's home is slot 1, held by 1 at PSL 0, not less than 5's 0: walk on.
At slot 2, 5 has PSL 1 and meets 2 at PSL 0: **2 is closer to home, so
5 takes the slot** and 2 is carried on, to slot 3 with PSL 1. Both keys
end one step from home, where plain linear probing would leave 5 two
steps away in slot 3.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
