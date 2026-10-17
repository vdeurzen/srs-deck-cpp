---
id: lru-evict-map
kind: code
version: 1
level: 4
tags: [hft, lru, caching, implement-it]
input: chips
choices:
  c1:
    - "slot[key[s]] = 0; key[s] = k;"
    - "key[s] = k; slot[key[s]] = 0;"
    - "key[s] = k;"
    - "slot[key[s]] = 0;"
compile:
  harness: |
    constexpr bool consistent(const Lru& c) {    // exactly 3 keys cached, each where it says
      int cached = 0;
      for (int k = 0; k < 10; ++k)
        if (c.slot[k] != 0) { ++cached; if (c.key[c.slot[k]] != k) return false; }
      return cached == 3;
    }
    constexpr bool test() {
      Lru c;  int ring[] = {0, 1, 2, 3, 0};       // slots 1 2 3 hold keys 7 8 9, 7 newest
      for (int i = 0; i < 4; ++i) { c.n[ring[i]] = ring[i + 1]; c.p[ring[i + 1]] = ring[i]; }
      for (int s = 1; s <= 3; ++s) { c.key[s] = 6 + s; c.slot[6 + s] = s; }
      bool ok = true;
      for (int k : {5, 4, 6, 2, 1}) {             // five misses: evict 9, 8, 7, 5, 4
        c.miss(k);
        ok = ok && consistent(c) && c.n[0] == c.slot[k];
      }
      return ok && c.slot[2] && c.slot[1] && c.slot[6] && !c.slot[5] && !c.slot[4];
    }
    static_assert(test());
    int main() {}
requires:
  - lru-touch
refs:
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
  - https://en.cppreference.com/w/cpp/container/unordered_map/erase
elaborate: In the `std::list` + `unordered_map` LRU, which line makes the same choice, and what breaks if you pop the list first?
---

The interviewer: "Now the miss path, with the cache full." A
three-entry LRU keeps its recency ring in fixed arrays and stores each
slot's key; a key → slot table stands in for the hash map. The miss reuses the
least recently used slot in place. Complete `miss`.

```cpp
#include <array>
struct Lru {                                  // slot 0: sentinel; slots 1-3 hold entries
  std::array<int, 4> n{}, p{}, key{};         // links, and the key cached in each slot
  std::array<int, 10> slot{};                 // key -> its slot; 0 = not cached
  constexpr void touch(int s) { n[p[s]] = n[s]; p[n[s]] = p[s];
                                n[s] = n[0]; p[s] = 0; p[n[0]] = s; n[0] = s; }
  constexpr void miss(int k) {                // pre: slot[k] == 0, slots 1-3 in use
    const int s = p[0];                       // the least recently used slot
    {{c1::slot[key[s]] = 0; key[s] = k;}}
    slot[k] = s;  touch(s);
  }
};
```

---

**Erase the victim's map entry, found through the key its slot still
holds, then overwrite that key.** Overwriting first loses the victim's
key, so its entry survives and a later lookup "hits" another key's
slot. The invariant to keep: every mapped key sits in the slot it maps
to. No allocation either way: the victim's slot is the new entry's slot.
With an open-addressed map, this erase leaves a tombstone.
