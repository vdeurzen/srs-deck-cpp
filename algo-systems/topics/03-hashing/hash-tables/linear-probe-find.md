---
id: hash-linear-probe-find
kind: code
version: 1
level: 3
tags: [hashing, open-addressing]
input: chips
choices:
  c1:
    - "t[i].tag != Empty"
    - "t[i].tag == Full"
    - "t[i].tag != Deleted"
    - "t[i].tag == Full || t[i].key != key"
compile:
  harness: |
    // home slot = key & 7: 3, 11 and 19 share home 3; 15 has home 7.
    constexpr std::array<Slot, 8> kT{{
        {Full, 15}, {Empty, 0}, {Empty, 0}, {Full, 3},
        {Deleted, 11}, {Full, 19}, {Empty, 0}, {Full, 7}}};
    static_assert(find(kT, 19) == 5);    // past the erased 11
    static_assert(find(kT, 15) == 0);    // wraps from slot 7
    static_assert(find(kT, 11) == -1);   // erased
    static_assert(find(kT, 27) == -1);   // home 3, absent
    static_assert(find(kT, 3) == 3);
    int main() {}
requires:
  - hash-tombstone-fix
  - interview-essentials/hashing-probe-lookup-stop
refs:
  - https://abseil.io/about/design/swisstables
  - https://en.wikipedia.org/wiki/Lazy_deletion
---

A linear-probing table of 8 slots; erasing a key turns its slot into
`Deleted`. Complete the condition that keeps `find` probing, so it
returns the key's slot or `-1`.

```cpp
#include <array>
enum Tag : unsigned char { Empty, Full, Deleted };
struct Slot { Tag tag; int key; };

constexpr int find(const std::array<Slot, 8>& t, int key) {
  const unsigned mask = t.size() - 1;               // size is a power of two
  for (unsigned i = key & mask; {{c1::t[i].tag != Empty}}; i = (i + 1) & mask)
    if (t[i].tag == Full && t[i].key == key) return static_cast<int>(i);
  return -1;
}
```

---

**Stop only at `Empty`: a tombstone still belongs to someone's probe run.**
19 was inserted when 11 occupied slot 4, so it sits beyond it; stopping
at `Deleted` (or at "not `Full`") reports 19 missing. Probing until the
key turns up walks past `Empty` too: an absent key never stops, which is
not a constant expression.
