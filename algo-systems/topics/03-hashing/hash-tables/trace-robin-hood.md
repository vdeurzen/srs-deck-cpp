---
id: hash-trace-robin-hood
kind: trace
version: 1
level: 4
tags: [hashing, open-addressing, tracing]
requires:
  - hash-robin-hood
probes:
  1: { "key[3]": "2", "psl[3]": "1" }
  2: { "key[3]": "17", "psl[3]": "2", "key[4]": "2", "psl[4]": "2" }
refs:
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
---

An 8-slot Robin Hood table; a key's home slot is `k % 8`. Slots start
empty (`-1`).

```cpp
auto insert = [&](int k) {
  int i = k % 8, d = 0;                    // d: PSL of the key carried
  while (key[i] != -1) {
    if (psl[i] < d) { std::swap(k, key[i]); std::swap(d, psl[i]); }
    i = (i + 1) % 8; ++d;
  }
  key[i] = k; psl[i] = d;
};
insert(1); insert(9); insert(2);           // @1
insert(17);                                // @2
```

---

`1` takes slot 1; `9` (home 1) moves on to slot 2 with PSL 1; `2` (home
2) meets `9` with PSL 1 ≥ its own 0, so it goes on to slot 3, PSL 1.

`17` (home 1) reaches slot 3 with PSL 2 and meets `2` with PSL 1: richer,
so they **swap**. `17` stays at PSL 2 and `2` moves to slot 4, also PSL 2.
The longest run is 2. Plain linear probing would have put `17` in slot 4
with PSL 3.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
