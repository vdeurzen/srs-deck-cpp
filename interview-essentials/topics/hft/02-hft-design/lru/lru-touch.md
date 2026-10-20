---
id: lru-touch
kind: code
version: 2
level: 4
tags: [hft, lru, caching, intrusive, implement-it]
input: chips
choices:
  c1:
    - "p[n[0]] = s;"
    - "p[0] = s;"
    - "n[p[0]] = s;"
    - "p[s] = n[0];"
compile:
  harness: |
    constexpr int walk(const std::array<int, 5>& link) {   // slots as digits, bounded
      int r = 0;
      for (int s = link[0], k = 0; s != 0 && k < 6; s = link[s], ++k) r = r * 10 + s;
      return r;
    }
    constexpr Lru filled() {                     // most recent first: 1 2 3 4
      Lru c;  int ring[] = {0, 1, 2, 3, 4, 0};
      for (int i = 0; i < 5; ++i) { c.n[ring[i]] = ring[i + 1]; c.p[ring[i + 1]] = ring[i]; }
      return c;
    }
    constexpr bool test() {
      Lru c = filled();
      c.touch(4);                                // the next victim becomes the newest
      bool ok = walk(c.n) == 4123 && walk(c.p) == 3214;
      c.touch(4);                                // already the newest: no change
      ok = ok && walk(c.n) == 4123 && walk(c.p) == 3214;
      c.touch(2);
      return ok && walk(c.n) == 2413 && walk(c.p) == 3142;   // eviction order: 3, 1, 4, 2
    }
    static_assert(test());
    int main() {}
requires:
  - lru-sentinel-ring
refs:
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
  - https://en.cppreference.com/w/cpp/container/list/splice
elaborate: Which `splice` call in the `std::list` LRU does this body replace, and what does that version allocate that this one doesn't?
---

The interviewer: "Write the LRU's hit path with no pointers and no
allocation." Cache entries live in slots 1–4 of fixed arrays; `n[i]`
and `p[i]` hold the next and previous slot of slot `i`. Slot 0 is a
sentinel that closes the recency list into a ring. The key map has
already found the hit's slot `s`. Complete the missing line of the
insert.

```cpp
#include <array>
struct Lru {                                  // slot 0: sentinel
  std::array<int, 5> n{}, p{};                // n[0]: most recent slot, p[0]: next victim
  constexpr void touch(int s) {               // a hit on slot s; pre: s != 0, s is linked
    n[p[s]] = n[s];  p[n[s]] = p[s];          // unlink s
    n[s] = n[0];  p[s] = 0;                   // insert s after the sentinel
    {{c1::p[n[0]] = s;}}
    n[0] = s;
  }
};
```

---

**`p[n[0]] = s;`: the old head, still `n[0]`, must point back at `s`.**
It runs before `n[0] = s`, which would make it patch `s` itself. `p[0]`
is the victim end, so writing it makes the hit the next victim;
`n[p[0]]` links `s` after the victim too. `p[s] = n[0]` points `s`
back at the head instead of the sentinel.
