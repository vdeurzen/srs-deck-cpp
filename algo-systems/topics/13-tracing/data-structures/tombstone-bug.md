---
id: trace-tombstone-bug
kind: trace
version: 1
level: 4
tags: [tracing, hashing, open-addressing]
probes:
  1: { has: "false", "t.contains(11)": "true", "t.contains(19)": "true" }
  2: { has: "true", "t.contains(11)": "true", "t.contains(19)": "true" }
  3: { has: "true", "t.contains(11)": "false", "t.contains(19)": "false" }
  4: { has: "false", "t.contains(11)": "false", "t.contains(19)": "false" }
requires:
  - hash-tombstones
refs:
  - https://en.wikipedia.org/wiki/Lazy_deletion
  - https://abseil.io/about/design/swisstables
---

```cpp
#include <cstddef>

struct Table {                          // 8 slots, linear probing
  enum State { kEmpty, kFull, kWiped };
  int key[8]{};
  State state[8]{};

  static std::size_t home(int k) { return static_cast<std::size_t>(k) & 7u; }

  void insert(int k) {
    std::size_t i = home(k);
    while (state[i] == kFull) i = (i + 1) & 7;
    key[i] = k;
    state[i] = kFull;
  }
  bool contains(int k) const {
    std::size_t i = home(k);
    while (state[i] != kEmpty) {          // stops at the first empty slot
      if (state[i] == kFull && key[i] == k) return true;
      i = (i + 1) & 7;
    }
    return false;
  }
  void wipe(int k) {                      // "erase" = mark the slot empty
    std::size_t i = home(k);
    while (state[i] != kEmpty) {
      if (state[i] == kFull && key[i] == k) { state[i] = kEmpty; return; }
      i = (i + 1) & 7;
    }
  }
};

int main() {
  Table t;
  bool has = false;
  t.insert(3);
  t.insert(11);
  t.insert(19);                 // @1  all three hash to slot 3
  has = t.contains(19);         // @2
  t.wipe(11);                   // @3
  has = t.contains(19);         // @4
}
```

---

3, 11 and 19 all have home slot 3 (`k & 7`), so linear probing puts
them in slots 3, 4 and 5 — a **run**. `contains` terminates by
stopping at the first `kEmpty` slot, which is exactly what makes an
unsuccessful lookup O(probe length) instead of O(capacity).

`wipe(11)` marks slot 4 empty, and that silently destroys the run.
The key 19 is still sitting in slot 5, still reachable by no path the
lookup will take: the probe from slot 3 now hits an empty slot at 4
and reports "not found". No crash, no assertion — a key that is
present becomes invisible, and the bug surfaces later as mysteriously
missing data. Probe 3 makes the shape of such a bug visible: `has`
still carries the answer from before the erase, while the table has
already started lying.

The repair is the third state the enum already has: mark the slot
`kWiped` (a **tombstone**), which `contains` skips over and continues
past, and which `insert` may reuse. Then the probe from slot 3 walks
4, finds 19 at 5, and everything works. The cost is that tombstones
accumulate and must eventually be cleaned by a rehash. The alternative
repair — backward-shift deletion, moving 19 into slot 4 — keeps the
table tombstone-free but only works for linear probing.

Verified by compiling and running this program under GCC 13.3
(`g++ -std=c++23 -Wall -Wextra`) and printing the three values at each
probe.
